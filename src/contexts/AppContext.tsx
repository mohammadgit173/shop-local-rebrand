
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, Product, User, WishlistItem } from '../types';
import { storeConfig } from '../config/storeConfig';
import { useToast } from '@/components/ui/use-toast';

interface AppContextType {
  cart: Cart;
  wishlist: WishlistItem[];
  user: User | null;
  isAuthenticated: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  deliveryFee: storeConfig.deliverySettings.standardDeliveryFee,
  total: 0,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Calculate cart totals
  const calculateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
      0
    );
    
    // Determine delivery fee based on subtotal
    const deliveryFee = subtotal >= storeConfig.deliverySettings.freeDeliveryThreshold
      ? 0
      : storeConfig.deliverySettings.standardDeliveryFee;
    
    return {
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  };

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
      }
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item to cart
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
  };

  // Wishlist operations
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      // Check if product already exists in wishlist
      const exists = prevWishlist.some((item) => item.product.id === product.id);
      
      if (exists) {
        return prevWishlist;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
      
      return [
        ...prevWishlist,
        {
          product,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.product.id !== productId)
    );
  };

  // Auth operations
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        isAuthenticated: !!user,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
