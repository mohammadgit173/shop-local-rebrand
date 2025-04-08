
import React, { createContext, useContext, useState, useEffect } from "react";
import { Cart, CartItem, Product, WishlistItem } from "@/types";
import { storeConfig } from "@/config/storeConfig";
import { useToast } from "@/components/ui/use-toast";

interface AppContextType {
  cart: Cart;
  wishlist: WishlistItem[];
  isAuthenticated: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  delivery_fee: storeConfig.deliverySettings.standardDeliveryFee,
  total: 0,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Calculate cart totals
  const calculateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.sale_price || item.product.price) * item.quantity,
      0
    );

    const delivery_fee = subtotal >= storeConfig.deliverySettings.freeDeliveryThreshold
      ? 0
      : storeConfig.deliverySettings.standardDeliveryFee;

    return {
      items,
      subtotal,
      delivery_fee,
      total: subtotal + delivery_fee,
    };
  };

  // Load cart from localStorage on startup
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }

      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      }
    } catch (error) {
      console.error("Failed to parse saved data from localStorage", error);
      // Reset the cart if there's an error
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      toast({
        title: "Added to cart",
        description: `${product.name} (x${quantity}) has been added to your cart.`,
      });

      return calculateCartTotals(newItems);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product.id !== productId);
      return calculateCartTotals(newItems);
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return calculateCartTotals(newItems);
    });
  };

  const clearCart = () => {
    setCart(initialCart);
    localStorage.removeItem('cart');
  };

  // Wishlist operations
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.product.id === product.id);
      if (exists) return prevWishlist;

      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });

      return [
        ...prevWishlist,
        {
          product,
          added_at: new Date().toISOString(),
        },
      ];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
