// ═══════════════════════════════════════════════════════
// OREN — Order Store (Zustand)
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemLocal } from "./useCartStore";

export interface OrderLocal {
  id: string;
  order_number: string;
  items: CartItemLocal[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  date: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: string;
  address: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface OrderState {
  orders: OrderLocal[];
  addOrder: (order: Omit<OrderLocal, "id" | "order_number" | "date" | "status">) => OrderLocal;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const orderNumber = `ORN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder: OrderLocal = {
          ...orderData,
          id: Math.random().toString(36).substr(2, 9),
          order_number: orderNumber,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          status: "Confirmed",
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "oren-orders",
    }
  )
);
