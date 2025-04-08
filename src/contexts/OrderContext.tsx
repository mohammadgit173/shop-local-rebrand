import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "./UserContext";
import { useAddresses } from "./AddressContext";

export type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "preparing" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export interface OrderItem {
  id: string;
  product_id: string;
  order_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  address_id: string;
  address_details: any;
  payment_method: "cash_on_delivery" | "card" | "wallet";
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  cartItems: OrderItem[];
  isLoading: boolean;
  addToCart: (item: Omit<OrderItem, "id" | "order_id">) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => Promise<Order | null>;
  fetchOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<Order | null>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const { selectedAddress } = useAddresses();
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart:", error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: Omit<OrderItem, "id" | "order_id">) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.product_id === item.product_id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { ...item, id: crypto.randomUUID(), order_id: '' }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product_id !== productId)
    );
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product_id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Place order
  const placeOrder = async (): Promise<Order | null> => {
    if (!user) {
      console.error("User not authenticated");
      return null;
    }

    if (!selectedAddress) {
      console.error("No delivery address selected");
      return null;
    }

    if (cartItems.length === 0) {
      console.error("Cart is empty");
      return null;
    }

    setIsLoading(true);

    try {
      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      );

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total,
          address_id: selectedAddress.id,
          address_details: selectedAddress,
          payment_method: 'cash_on_delivery'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        product_id: item.product_id,
        order_id: orderData.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Get complete order with items
      const order = {
        ...orderData,
        items: cartItems.map(item => ({
          ...item,
          order_id: orderData.id
        }))
      };

      // Update orders list
      setOrders(prev => [order, ...prev]);
      setCurrentOrder(order);

      // Clear cart after successful order
      clearCart();

      return order;
    } catch (error) {
      console.error("Error placing order:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      // Fetch order items for all orders
      const orderIds = ordersData.map(order => order.id);
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);

      if (itemsError) throw itemsError;

      // Combine orders with their items
      const ordersWithItems = ordersData.map(order => ({
        ...order,
        items: itemsData?.filter(item => item.order_id === order.id) || []
      }));

      setOrders(ordersWithItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get order by ID
  const getOrderById = async (id: string): Promise<Order | null> => {
    setIsLoading(true);
    try {
      // Check if order is already in state
      const existingOrder = orders.find(order => order.id === id);
      if (existingOrder) {
        return existingOrder;
      }

      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id);

      if (itemsError) throw itemsError;

      // Combine order with items
      const order = {
        ...orderData,
        items: itemsData || []
      };

      return order;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Load orders when user changes
  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
      setCurrentOrder(null);
    }
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        placeOrder,
        fetchOrders,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
