"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Orders Management
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { ShoppingCart, Eye, Package, Calendar } from "lucide-react";
import { useOrderStore, type OrderLocal } from "@/store/useOrderStore";
import { formatPrice } from "@/lib/data";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const orders = useOrderStore((s) => s.orders);

  const handleStatusChange = (orderId: string, newStatus: any) => {
    // Update order status in zustand store
    useOrderStore.setState((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      ),
    }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Orders Management
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Monitor, update status, and manage all luxury purchases
        </p>
      </div>

      {/* Orders list table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Items Purchased
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Date Placed
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-foreground/40">
                    <div className="max-w-xs mx-auto">
                      <ShoppingCart className="w-10 h-10 text-gold/25 mx-auto mb-3" />
                      <p className="font-semibold text-foreground/60">No orders placed yet</p>
                      <p className="text-xs text-foreground/30 mt-1">
                        When clients purchase items, their orders will show up here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const firstItem = order.items[0];
                  const itemsSummary = firstItem
                    ? order.items.length > 1
                      ? `${firstItem.product.name} + ${order.items.length - 1} more`
                      : firstItem.product.name
                    : "Luxury Item";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                    >
                      <td className="px-6 py-4 text-sm font-mono font-medium text-gold">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-foreground">
                          {order.address.fullName}
                        </div>
                        <div className="text-[10px] text-foreground/40">
                          {order.address.city}, {order.address.state}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/50 max-w-[220px] truncate">
                        {itemsSummary}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/40">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="bg-luxury-black/90 border border-gold/20 text-xs rounded-lg px-2 py-1.5 focus:border-gold/50 focus:outline-none text-foreground cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
