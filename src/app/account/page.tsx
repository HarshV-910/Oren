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

const menuItems = [
  { icon: ShoppingBag, label: "My Orders", href: "/account/orders", count: 3 },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist", count: 5 },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: Settings, label: "Settings", href: "/account/settings" },
];

const recentOrders = [
  {
    id: "ORN-2024-001",
    product: "Celestial Diamond Solitaire Ring",
    date: "Dec 15, 2024",
    status: "Delivered",
    total: "₹2,85,000",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
  },
  {
    id: "ORN-2024-002",
    product: "Aurora Diamond Drop Earrings",
    date: "Dec 10, 2024",
    status: "Shipped",
    total: "₹1,65,000",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80",
  },
];

export default function AccountPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

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
              {recentOrders.map((order) => (
                <div key={order.id} className="glass-card rounded-2xl p-5 flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-luxury-charcoal shrink-0">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground truncate">
                          {order.product}
                        </p>
                        <p className="text-xs text-foreground/40 mt-0.5">
                          {order.id} • {order.date}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                          order.status === "Delivered"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-blue-500/15 text-blue-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold gradient-gold-text mt-2">{order.total}</p>
                  </div>
                </div>
              ))}
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
