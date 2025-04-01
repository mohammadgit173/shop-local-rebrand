
// Product Types
export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  stockQuantity: number;
  unit: string; // e.g., kg, piece, pack
  featured?: boolean;
  new?: boolean;
  attributes?: { [key: string]: string };
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  icon: string;
  subcategories?: string[];
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  label: string; // e.g., Home, Work
  fullAddress: string;
  city: string;
  area?: string;
  building?: string;
  floor?: string;
  landmark?: string;
  notes?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Order Types
export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  address: Address;
  createdAt: string;
  estimatedDelivery?: string;
  notes?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

// Wishlist Types
export interface WishlistItem {
  product: Product;
  addedAt: string;
}
