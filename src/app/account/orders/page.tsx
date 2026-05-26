"use client";

// ═══════════════════════════════════════════════════════
// OREN — My Orders Page
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Package, ChevronRight, Calendar, CreditCard, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/data";
import { useEffect } from "react";

export default function MyOrdersPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login?redirect=/account/orders";
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full glass-card p-8 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gold/10">
            <Package className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            No orders yet
          </h1>
          <p className="text-sm text-foreground/40 mb-8">
            You haven't placed any orders yet. Discover our collections to find your perfect pieces.
          </p>
          <Link
            href="/products"
            className="btn-luxury w-full py-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
            <Link href="/account" className="hover:text-gold transition-colors">
              Account
            </Link>
            <ChevronRight size={12} />
            <span className="text-gold">Orders</span>
          </div>
          <h1 className="text-3xl font-display font-bold gradient-gold-text">
            My Orders
          </h1>
          <p className="text-foreground/40 text-sm mt-1">
            Manage and track your luxury purchases
          </p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 bg-white/5 border-b border-gold/5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-foreground/40 font-mono tracking-wider">
                    {order.order_number}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <Calendar size={12} className="text-gold/60" />
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-medium tracking-wider uppercase ${
                      order.status === "Delivered"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-gold/15 text-gold"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-lg font-bold gradient-gold-text">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Items */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-2">
                    Items ({order.items.reduce((acc, it) => acc + it.quantity, 0)})
                  </h3>
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-luxury-charcoal shrink-0 border border-gold/5">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate hover:text-gold transition-colors">
                          <Link href={`/products/${item.product.slug || item.product.id}`}>
                            {item.product.name}
                          </Link>
                        </h4>
                        <p className="text-xs text-foreground/40 mt-0.5">
                          Quantity: {item.quantity} {item.size && `• Size: ${item.size}`}
                        </p>
                        <p className="text-xs font-semibold text-gold mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Details */}
                <div className="bg-white/5 p-4 rounded-xl space-y-4 border border-gold/5 h-fit text-xs">
                  <div>
                    <h4 className="font-semibold text-foreground/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MapPin size={12} className="text-gold" /> Shipping Address
                    </h4>
                    <p className="text-foreground/80 font-medium">{order.address.fullName}</p>
                    <p className="text-foreground/50 leading-relaxed mt-0.5">
                      {order.address.addressLine}, {order.address.city}, {order.address.state},{" "}
                      {order.address.postalCode}, {order.address.country}
                    </p>
                    <p className="text-foreground/40 mt-1">Phone: {order.address.phone}</p>
                  </div>

                  <div className="pt-2 border-t border-gold/5">
                    <h4 className="font-semibold text-foreground/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CreditCard size={12} className="text-gold" /> Payment
                    </h4>
                    <p className="text-foreground/70 uppercase font-medium">
                      {order.paymentMethod}
                    </p>
                    <p className="text-foreground/40 mt-0.5">Secure payment completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
