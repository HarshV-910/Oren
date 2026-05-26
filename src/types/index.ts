// ═══════════════════════════════════════════════════════
// OREN — TypeScript Types
// ═══════════════════════════════════════════════════════

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_price?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  material: string;
  purity?: string;
  weight?: string;
  diamond_type?: string;
  diamond_carat?: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  sku: string;
  featured: boolean;
  trending: boolean;
  new_arrival: boolean;
  best_seller: boolean;
  rating: number;
  review_count: number;
  tags: string[];
  video_url?: string;
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent_id?: string;
  product_count: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  size?: string;
  color?: string;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  total: number;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  coupon_code?: string;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_id?: string;
  shipping_address: Address;
  billing_address?: Address;
  notes?: string;
  tracking_number?: string;
  order_items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  product?: Product;
}

export interface Address {
  id?: string;
  user_id?: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: "user" | "admin";
  language: string;
  addresses?: Address[];
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified_purchase: boolean;
  profiles?: { full_name: string; avatar_url: string };
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: number;
  active: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_purchase?: number;
  max_uses?: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  active: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface FilterOptions {
  categories: string[];
  materials: string[];
  priceRange: [number, number];
  sortBy: string;
  search: string;
}
