"use client";

// ═══════════════════════════════════════════════════════
// OREN — User Account Dashboard
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Package,
  Crown,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { auth, signOut } from "@/lib/firebase";
import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/data";

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", href: "/account/orders", count: orders.length },
    { icon: Heart, label: "Wishlist", href: "/account/wishlist", count: wishlistCount },
    { icon: MapPin, label: "Addresses", href: "/account/addresses" },
    { icon: Settings, label: "Settings", href: "/account/settings" },
  ];

  const recentOrders = orders.slice(0, 2);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/auth/login?redirect=/account";
    }
  }, [isLoading, isAuthenticated]);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center text-luxury-black font-semibold text-2xl uppercase">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.full_name.charAt(0)
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-display font-bold text-foreground">{user.full_name}</h1>
              <p className="text-foreground/40 text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <Crown className="w-4 h-4 text-gold" />
                <span className="text-xs text-gold">
                  {user.role === "admin" ? "Admin Access" : "Gold Member"}
                </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-foreground/40 hover:text-gold transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gold/5 transition-all group border-b border-gold/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-gold/60 group-hover:text-gold transition-colors" />
                    <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={14} className="text-foreground/20" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center border border-gold/5">
                  <Package className="w-10 h-10 text-gold/40 mx-auto mb-4" />
                  <p className="text-sm text-foreground/50">No recent orders found</p>
                  <p className="text-xs text-foreground/30 mt-1">
                    Your luxury collection order history will appear here.
                  </p>
                </div>
              ) : (
                recentOrders.map((order) => {
                  const firstItem = order.items[0];
                  const displayTitle = firstItem
                    ? order.items.length > 1
                      ? `${firstItem.product.name} + ${order.items.length - 1} more`
                      : firstItem.product.name
                    : "Luxury Order";
                  const displayImage = firstItem?.product.images[0] || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80";

                  return (
                    <div key={order.id} className="glass-card rounded-2xl p-5 flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-luxury-charcoal shrink-0 border border-gold/5">
                        <img
                          src={displayImage}
                          alt={displayTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground truncate">
                              {displayTitle}
                            </p>
                            <p className="text-xs text-foreground/40 mt-0.5 font-mono">
                              {order.order_number} • {order.date}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wider uppercase ${
                              order.status === "Delivered"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-gold/15 text-gold"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold gradient-gold-text mt-2">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <Link
              href="/account/orders"
              className="inline-flex items-center gap-1 text-sm text-gold/80 hover:text-gold mt-4 transition-colors"
            >
              View all orders <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
