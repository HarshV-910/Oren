"use client";

// ═══════════════════════════════════════════════════════
// OREN — Checkout Page
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Lock,
  ChevronRight,
  MapPin,
  Truck,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCouponStore } from "@/store/useCouponStore";
import { translate } from "@/lib/translations";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore, type OrderLocal } from "@/store/useOrderStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "razorpay" | "cod">("stripe");
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const [placedOrder, setPlacedOrder] = useState<OrderLocal | null>(null);

  useEffect(() => {
    if (user) {
      if (user.full_name) setFullName(user.full_name);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);
  const { storeName, contactEmail, phone: storePhone } = useSettingsStore();

  // Shipping Address States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");

  const { appliedCoupon, removeCoupon } = useCouponStore();

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
  const total = discountedSubtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    const order = addOrder({
      items,
      subtotal: discountedSubtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      address: {
        fullName,
        phone,
        addressLine,
        city,
        state,
        postalCode,
        country,
      },
    });

    // Dispatch Order Details Email Confirmation asynchronously
    try {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || "harshvekariya910@gmail.com",
          orderNumber: order.order_number,
          fullName,
          items: items.map((item) => ({
            name: item.product?.name || "Premium Jeweller Item",
            quantity: item.quantity,
            price: item.product?.price || 0,
            size: item.size || "Standard",
          })),
          subtotal: discountedSubtotal,
          tax,
          shipping,
          total,
          paymentMethod,
          address: `${addressLine}, ${city}, ${state} - ${postalCode}, ${country}`,
        }),
      });
    } catch (e) {
      console.error("Failed to queue order email sending:", e);
    }

    toast.success("Order placed successfully! 🎉", {
      description: `Order ${order.order_number} total: ${formatPrice(total)}`,
    });
    setPlacedOrder(order);
    clearCart();
    removeCoupon();
    setStep(4);
  };

  const handleContinueToPayment = () => {
    if (!fullName || !phone || !addressLine || !city || !state || !postalCode || !country) {
      toast.error("Please fill in all shipping address fields");
      return;
    }
    setStep(2);
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

  if (step === 4 && placedOrder) {
    return (
      <div className="pt-32 pb-20 min-h-screen">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              background: #ffffff !important;
              color: #000000 !important;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
              color: #000000 !important;
              background: #ffffff !important;
            }
            .print-border-dark {
              border-color: #000000 !important;
            }
            .print-text-dark {
              color: #000000 !important;
            }
            .glass-card {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          }
        `}} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Visual confirmation (hidden during print) */}
          <div className="no-print text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Order Confirmed!</h1>
            <p className="text-sm text-foreground/50 mt-2">
              Your order has been recorded. You can now download or print your purchase invoice.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={() => window.print()}
                className="btn-luxury px-6 py-5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <Printer size={14} /> Print Invoice (PDF)
              </Button>
              <Link href="/products">
                <Button variant="outline" className="border-gold/20 text-foreground/50 px-6 py-5 text-xs font-semibold uppercase tracking-wider">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div id="printable-invoice" className="print-only glass-card rounded-3xl border border-gold/15 p-6 sm:p-10 bg-luxury-charcoal/50 text-foreground">
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-start gap-6 border-b border-gold/10 pb-6 print-border-dark">
              <div>
                <span className="font-display text-2xl font-bold tracking-widest text-gold print-text-dark">OREN</span>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1 print-text-dark">Luxury Jewellery Collections</p>
              </div>
              <div className="text-left md:text-right space-y-1">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground print-text-dark">Tax Invoice</h2>
                <p className="text-xs text-foreground/50 print-text-dark">Invoice ID: <span className="font-mono text-gold print-text-dark">{placedOrder.order_number}</span></p>
                <p className="text-xs text-foreground/50 print-text-dark">Date: {placedOrder.date}</p>
              </div>
            </div>

            {/* Bill / Ship to info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div>
                <h3 className="text-xs text-foreground/30 uppercase tracking-wider mb-2 print-text-dark">Billed & Shipped To:</h3>
                <p className="text-sm font-semibold text-foreground print-text-dark">{placedOrder.address.fullName}</p>
                <p className="text-xs text-foreground/60 mt-1 leading-relaxed print-text-dark">
                  {placedOrder.address.addressLine}<br />
                  {placedOrder.address.city}, {placedOrder.address.state} - {placedOrder.address.postalCode}<br />
                  {placedOrder.address.country}
                </p>
                <p className="text-xs text-foreground/50 mt-2 print-text-dark">Phone: {placedOrder.address.phone}</p>
              </div>
              <div className="md:text-right">
                <h3 className="text-xs text-foreground/30 uppercase tracking-wider mb-2 print-text-dark">Payment Details:</h3>
                <p className="text-sm font-semibold text-foreground uppercase tracking-widest print-text-dark">
                  {placedOrder.paymentMethod === "cod" ? "Cash On Delivery (COD)" : placedOrder.paymentMethod}
                </p>
                <p className="text-xs text-foreground/40 mt-1 print-text-dark">Status: Paid / Authorized Cash Collection</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border-t border-gold/10 pt-6 print-border-dark">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gold/10 text-foreground/40 uppercase tracking-wider print-border-dark print-text-dark">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {placedOrder.items.map((item) => (
                    <tr key={item.product.id} className="border-b border-gold/5 last:border-0 print-border-dark print-text-dark">
                      <td className="py-3 font-medium text-foreground print-text-dark">
                        {item.product.name}
                      </td>
                      <td className="py-3 text-right font-mono print-text-dark">
                        {formatPrice(item.product.price)}
                      </td>
                      <td className="py-3 text-center print-text-dark">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-right font-semibold text-foreground print-text-dark">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Totals */}
            <div className="border-t border-gold/10 mt-6 pt-6 flex justify-end print-border-dark">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-foreground/50 print-text-dark">
                  <span>Subtotal</span>
                  <span>{formatPrice(placedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-foreground/50 print-text-dark">
                  <span>Shipping</span>
                  <span>{placedOrder.shipping === 0 ? "FREE" : formatPrice(placedOrder.shipping)}</span>
                </div>
                <div className="flex justify-between text-foreground/50 print-text-dark">
                  <span>Tax (3%)</span>
                  <span>{formatPrice(placedOrder.tax)}</span>
                </div>
                <div className="border-t border-gold/10 pt-2 flex justify-between font-bold text-sm text-foreground print-border-dark print-text-dark">
                  <span>Total Due</span>
                  <span className="text-gold print-text-dark">{formatPrice(placedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center border-t border-gold/5 pt-6 text-[10px] text-foreground/30 leading-relaxed print-border-dark print-text-dark">
              <p>{storeName} Luxury Jewellery Collections — Handcrafted Elegance.</p>
              <p className="mt-1">For support, please contact us at {contactEmail} or call our helpline {storePhone}.</p>
            </div>
          </div>

          <div className="no-print mt-6 text-center">
            <Link href="/account/orders" className="text-xs text-gold hover:underline">
              View Order in My Account &rarr;
            </Link>
          </div>
        </div>
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
          {translate("checkout.title", "Checkout")}
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
                    {translate("checkout.shipping_address", "Shipping Address")}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.full_name", "Full Name")}</Label>
                    <Input 
                       value={fullName}
                       onChange={(e) => setFullName(e.target.value)}
                       className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                       placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.phone", "Phone")}</Label>
                    <Input 
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                       placeholder="+91 XXXXX XXXXX" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.address", "Address")}</Label>
                    <Input 
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                      placeholder="Street address" 
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.city", "City")}</Label>
                    <Input 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                      placeholder="City" 
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.state", "State")}</Label>
                    <Input 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                      placeholder="State" 
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.postal", "Postal Code")}</Label>
                    <Input 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                      placeholder="400001" 
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-foreground/50 uppercase tracking-wider">{translate("checkout.country", "Country")}</Label>
                    <Input 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" 
                      placeholder="India" 
                    />
                  </div>
                </div>

                <Button
                  onClick={handleContinueToPayment}
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
                    {translate("checkout.payment_method", "Payment Method")}
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    type="button"
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
                    type="button"
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

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      paymentMethod === "cod"
                        ? "glass-gold border-gold/30"
                        : "glass hover:border-gold/20"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
                      COD
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{translate("checkout.payment_cod", "Cash on Delivery (COD)")}</p>
                      <p className="text-[10px] text-foreground/40">
                        Pay with cash upon package delivery
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
                    {translate("checkout.place_order", "Place Order")} — {formatPrice(total)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-32">
               <h3 className="text-sm font-semibold text-foreground mb-4">{translate("cart.summary", "Order Summary")}</h3>
              <div className="space-y-2 text-sm">
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
                  <span>{translate("cart.tax", "Tax (3%)")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator className="bg-gold/10 my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>{translate("cart.total", "Total")}</span>
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
