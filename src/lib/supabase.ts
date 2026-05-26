// ═══════════════════════════════════════════════════════
// OREN — Supabase Client
// ═══════════════════════════════════════════════════════

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

// Helper: Get all products
export async function getProducts(options?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from("products").select("*", { count: "exact" });

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.search) {
    query = query.ilike("name", `%${options.search}%`);
  }
  if (options?.minPrice) {
    query = query.gte("price", options.minPrice);
  }
  if (options?.maxPrice) {
    query = query.lte("price", options.maxPrice);
  }
  if (options?.sortBy) {
    const [column, order] = options.sortBy.split(":");
    query = query.order(column, { ascending: order === "asc" });
  } else {
    query = query.order("created_at", { ascending: false });
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
  }

  return query;
}

// Helper: Get single product
export async function getProduct(id: string) {
  return supabase.from("products").select("*").eq("id", id).single();
}

// Helper: Get categories
export async function getCategories() {
  return supabase.from("categories").select("*").order("name");
}

// Helper: Get reviews for a product
export async function getReviews(productId: string) {
  return supabase
    .from("reviews")
    .select("*, profiles(full_name, avatar_url)")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
}

// Helper: Get orders for a user
export async function getOrders(userId: string) {
  return supabase
    .from("orders")
    .select("*, order_items(*, products(name, images, price))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

// Helper: Get wishlist
export async function getWishlist(userId: string) {
  return supabase
    .from("wishlist")
    .select("*, products(*)")
    .eq("user_id", userId);
}

// Helper: Get cart items
export async function getCartItems(userId: string) {
  return supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", userId);
}
