// 🌿 Product Types
export interface Product {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price: number;
  sale_price?: number;
  images: string[]; // public URLs fetched from Supabase Storage
  category_id: string;
  subcategory?: string; // optional future field
  in_stock: boolean;
  stock_quantity: number;
  unit: string; // e.g., kg, piece, pack
  featured?: boolean;
  new?: boolean;
  attributes?: Record<string, string>;
}

// 🌿 Category Types
export interface Category {
  id: string;
  name: string;
  name_ar?: string;
  image_path: string;  // Supabase Storage path
  subcategories?: string[];
}

// 👤 User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  default_address_id?: string;
}

// 🏠 Address Type
export interface Address {
  id: string;
  label: string; // e.g., Home, Work
  full_address: string;
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

// 🛒 Order Types
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface OrderItem {
  product_id: string;
  name: string;
  name_ar?: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  payment_method: string;
  payment_status: PaymentStatus;
  address: Address;
  created_at: string;
  estimated_delivery?: string;
  notes?: string;
}

// 🛒 Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
}

// 💖 Wishlist Types
export interface WishlistItem {
  product: Product;
  added_at: string;
}
