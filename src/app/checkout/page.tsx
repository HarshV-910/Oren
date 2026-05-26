"use client";

// ═══════════════════════════════════════════════════════
// OREN — Checkout Page
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Lock,
  ChevronRight,
  MapPin,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "razorpay">("stripe");
  const { isAuthenticated, isLoading } = useAuthStore();

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! 🎉", {
      description: `Order total: ${formatPrice(total)}`,
    });
    clearCart();
  };

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8 text-center rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gold/10">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Secure Checkout
          </h2>
          <p className="text-sm text-foreground/50 mb-8 leading-relaxed">
            To proceed with your luxury purchase, please sign in or register an account.
          </p>
          <Link href="/auth/login?redirect=/checkout">
            <Button className="w-full btn-luxury py-6 text-sm font-semibold uppercase tracking-wider">
              Sign In to Continue
            </Button>
          </Link>
          <div className="mt-6">
            <Link href="/products" className="text-xs text-foreground/40 hover:text-gold hover:underline">
              ← Return to Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-display text-foreground mb-4">No items to checkout</h1>
        <Link href="/products" className="text-gold hover:underline">
          Browse collection →
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display font-bold gradient-gold-text mb-3"
        >
          Checkout
        </motion.h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10 text-xs">
          {["Shipping", "Payment", "Review"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step > i + 1
                    ? "bg-emerald-500 text-white"
                    : step === i + 1
                    ? "bg-gold text-luxury-black"
                    : "glass text-foreground/30"
                }`}
              >
                {i + 1}
              </span>
              <span className={step === i + 1 ? "text-gold" : "text-foreground/30"}>
                {s}
              </span>
              {i < 2 && <ChevronRight size={14} className="text-foreground/20" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-gold" size={20} />
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">Full Name</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">Phone</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">Address</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="Street address" />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">City</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="City" />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">State</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="State" />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">Postal Code</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="400001" />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">Country</Label>
                    <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="India" />
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="btn-luxury mt-6 px-8 py-5 text-sm font-semibold uppercase tracking-wider"
                >
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-gold" size={20} />
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      paymentMethod === "stripe"
                        ? "glass-gold border-gold/30"
                        : "glass hover:border-gold/20"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Stripe</p>
                      <p className="text-[10px] text-foreground/40">
                        International cards, UPI, wallets
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      paymentMethod === "razorpay"
                        ? "glass-gold border-gold/30"
                        : "glass hover:border-gold/20"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#072654] flex items-center justify-center text-white font-bold text-sm">
                      R
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">Razorpay</p>
                      <p className="text-[10px] text-foreground/40">
                        UPI, Net Banking, Cards (India)
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-foreground/30 mb-6">
                  <Lock size={12} className="text-gold/40" />
                  Your payment information is encrypted and secure
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-gold/20 text-foreground/50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider"
                  >
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 lg:p-8"
              >
                <h2 className="text-lg font-display font-semibold text-foreground mb-6">
                  Review Your Order
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-luxury-charcoal shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.product.name}</p>
                        <p className="text-[10px] text-foreground/40">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-gold/20 text-foreground/50"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider flex-1"
                  >
                    <Shield size={16} className="mr-2" />
                    Place Order — {formatPrice(total)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-32">
              <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground/50">
                  <span>Items ({items.length})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-foreground/50">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-400" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-foreground/50">
                  <span>Tax (3%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator className="bg-gold/10 my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="gradient-gold-text">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-foreground/30">
                <Truck size={14} className="text-gold/40" />
                {shipping === 0
                  ? "Free insured shipping included"
                  : "Free shipping on orders above ₹50,000"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
