"use client";

// ═══════════════════════════════════════════════════════
// OREN — Shopping Cart Page
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { translate } from "@/lib/translations";
import { useState } from "react";
import { useCouponStore } from "@/store/useCouponStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { appliedCoupon, applyCoupon, removeCoupon } = useCouponStore();
  const [couponInput, setCouponInput] = useState("");

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 500;

  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = Math.round(subtotal * (appliedCoupon.value / 100));
    } else {
      discount = appliedCoupon.value;
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = Math.round(discountedSubtotal * 0.03);
  const finalTotal = discountedSubtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gold/40" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            {translate("cart.empty", "Your cart is empty")}
          </h1>
          <p className="text-foreground/40 mb-8">
            Discover our exquisite collection and add something beautiful
          </p>
          <Link href="/products" className="btn-luxury px-8 py-4 rounded-xl inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            Browse Collection
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-display font-bold gradient-gold-text mb-10"
        >
          {translate("cart.title", "Shopping Cart")}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-4 lg:p-6 flex gap-4 lg:gap-6"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-luxury-charcoal shrink-0 img-zoom"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] text-gold/70 uppercase tracking-widest">
                        {item.product.category}
                      </p>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm lg:text-base font-medium text-foreground hover:text-gold transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-foreground/40 mt-0.5">
                        {item.product.material}
                        {item.size && ` • Size: ${item.size}`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.product.id);
                        toast.success("Removed from cart");
                      }}
                      className="p-2 text-foreground/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/30 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/30 transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-lg font-bold gradient-gold-text">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
              className="text-xs text-foreground/30 hover:text-red-400 transition-colors"
            >
              Clear entire cart
            </button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 lg:p-8 sticky top-32">
              <h2 className="text-lg font-display font-semibold text-foreground mb-6">
                {translate("cart.summary", "Order Summary")}
              </h2>

               {/* Coupon */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-gold/10 border border-gold/20 rounded-xl p-3 mb-6">
                  <div className="text-xs">
                    <span className="font-bold text-gold font-mono">{appliedCoupon.code}</span> Applied
                    <p className="text-[10px] text-foreground/40 mt-0.5">
                      {appliedCoupon.type === "percentage" ? `${appliedCoupon.value}%` : `₹${appliedCoupon.value}`} discount
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      toast.success("Coupon code removed");
                    }}
                    className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder={translate("cart.coupon_placeholder", "Coupon code")}
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-white/5 border-gold/15 focus:border-gold/40 text-sm"
                  />
                  <Button
                    onClick={() => {
                      const res = applyCoupon(couponInput, subtotal);
                      if (res.success) {
                        toast.success(res.message);
                        setCouponInput("");
                      } else {
                        toast.error(res.message);
                      }
                    }}
                    variant="outline"
                    className="border-gold/20 text-gold hover:bg-gold/10 shrink-0 px-4"
                  >
                    <Tag size={14} />
                  </Button>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-foreground/50">
                  <span>{translate("cart.subtotal", "Subtotal")}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold font-medium">
                    <span>{translate("cart.discount", "Discount")}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground/50">
                  <span>{translate("cart.shipping", "Shipping")}</span>
                  <span className={shipping === 0 ? "text-emerald-400" : ""}>
                    {shipping === 0 ? translate("cart.free", "FREE") : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-foreground/50">
                  <span>{translate("cart.tax", "Tax (GST 3%)")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <Separator className="bg-gold/10" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">{translate("cart.total", "Total")}</span>
                  <span className="gradient-gold-text">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full btn-luxury py-4 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 mt-6 group"
              >
                {translate("cart.checkout_btn", "Proceed to Checkout")}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-1 text-[10px] text-foreground/30">
                  <ShieldCheck size={14} className="text-gold/40" />
                  Secure
                </div>
                <div className="flex items-center gap-1 text-[10px] text-foreground/30">
                  <Truck size={14} className="text-gold/40" />
                  Insured
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
