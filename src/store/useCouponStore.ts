import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  minSpend: number;
  expiry: string;
}

interface CouponState {
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  applyCoupon: (code: string, currentCartTotal: number) => { success: boolean; message: string };
  removeCoupon: () => void;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      coupons: [
        {
          id: "cpn-oren10",
          code: "OREN10",
          type: "percentage",
          value: 10,
          minSpend: 1,
          expiry: "2026-12-31",
        },
      ],
      appliedCoupon: null,
      addCoupon: (coupon) =>
        set((state) => ({
          coupons: [...state.coupons, coupon],
        })),
      deleteCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
          appliedCoupon: state.appliedCoupon?.id === id ? null : state.appliedCoupon,
        })),
      applyCoupon: (code, currentCartTotal) => {
        const cleanedCode = code.toUpperCase().trim();
        const coupon = get().coupons.find((c) => c.code === cleanedCode);

        if (!coupon) {
          return { success: false, message: "Invalid coupon code." };
        }

        // Check expiry date
        const today = new Date();
        const expiryDate = new Date(coupon.expiry);
        if (expiryDate < today && coupon.expiry) {
          return { success: false, message: "This coupon code has expired." };
        }

        // Check minimum spend
        if (currentCartTotal < coupon.minSpend) {
          return {
            success: false,
            message: `Minimum spend of ₹${coupon.minSpend.toLocaleString()} required.`,
          };
        }

        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon ${cleanedCode} applied successfully!` };
      },
      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    {
      name: "oren-coupon-store",
    }
  )
);
