"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Coupons Management
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { Tag, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  minSpend: number;
  expiry: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "flat">("percentage");
  const [value, setValue] = useState(0);
  const [minSpend, setMinSpend] = useState(0);
  const [expiry, setExpiry] = useState("");

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value || !expiry) {
      toast.error("Please fill in code, value, and expiry date");
      return;
    }

    const formattedCode = code.toUpperCase().replace(/\s+/g, "");

    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: formattedCode,
      type,
      value: Number(value),
      minSpend: Number(minSpend),
      expiry,
    };

    setCoupons([...coupons, newCoupon]);
    setCode("");
    setValue(0);
    setMinSpend(0);
    setExpiry("");
    toast.success(`Coupon code ${formattedCode} created! 🏷️`);
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast.success("Coupon code deleted successfully");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Discount Coupons
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Create, manage, and distribute promotional codes for checkout discounts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Create Coupon */}
        <div>
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Tag size={16} className="text-gold" /> Create Coupon
            </h2>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Coupon Code</label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. LUXURY20"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Discount Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="mt-1.5 w-full rounded-md bg-luxury-black/90 border border-gold/15 focus:border-gold/40 p-2.5 text-sm text-foreground focus:outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Discount Value</label>
                <Input
                  type="number"
                  value={value || ""}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. 10 or 5000"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Min Spend Required (₹)</label>
                <Input
                  type="number"
                  value={minSpend || ""}
                  onChange={(e) => setMinSpend(Number(e.target.value))}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. 25000"
                />
              </div>

              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Expiry Date</label>
                <Input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="Dec 31, 2026"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-luxury py-5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Plus size={16} /> Publish Coupon
              </Button>
            </form>
          </div>
        </div>

        {/* Right Table: Coupons List */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Promo Code
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Min Purchase
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th className="text-right px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-foreground/40">
                        No discount coupons created yet.
                      </td>
                    </tr>
                  ) : (
                    coupons.map((coupon) => (
                      <tr
                        key={coupon.id}
                        className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                      >
                        <td className="px-6 py-4 text-sm font-mono font-semibold text-gold">
                          {coupon.code}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {coupon.type === "percentage" ? `${coupon.value}% Off` : `₹${coupon.value.toLocaleString()} Off`}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/50">
                          ₹{coupon.minSpend.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/40">
                          {coupon.expiry}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(coupon.id)}
                            className="p-1.5 text-foreground/30 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
