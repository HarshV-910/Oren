"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Dashboard Content
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Users,
  Eye,
  Plus,
  ArrowUpRight,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { sampleProducts, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useVisitorStore } from "@/store/useVisitorStore";

export default function AdminDashboard() {
  const orders = useOrderStore((s) => s.orders);
  const { totalVisits, registeredUsers } = useVisitorStore();
  const [viewType, setViewType] = useState<"weekly" | "monthly" | "yearly">("weekly");

  // Compute dynamic stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const activeProductsCount = sampleProducts.length;

  const visitorGrowth = registeredUsers.length > 3 
    ? `+${Math.round(((registeredUsers.length - 3) / 3) * 100)}%` 
    : "0%";

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      change: totalRevenue > 0 ? "+100%" : "0%",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      change: totalOrders > 0 ? `+${totalOrders}` : "0",
      icon: ShoppingCart,
      color: "text-blue-400",
    },
    {
      label: "Active Products",
      value: activeProductsCount.toString(),
      change: "+0",
      icon: Package,
      color: "text-gold",
    },
    {
      label: "Total Visitors",
      value: totalVisits.toString(),
      change: visitorGrowth,
      icon: Eye,
      color: "text-purple-400",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  // Compute chart labels and values based on viewType
  let chartLabels: string[] = [];
  let chartValues: number[] = [];

  if (viewType === "weekly") {
    chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    chartValues = [0, 0, 0, 0, 0, 0, 0];
    orders.forEach((order) => {
      try {
        const date = new Date(order.date);
        const day = date.getDay(); // 0 is Sunday, 1 is Monday...
        const index = day === 0 ? 6 : day - 1; // Map Sunday to 6, Monday to 0...
        if (index >= 0 && index < 7) {
          chartValues[index] += order.total;
        }
      } catch (e) {}
    });
  } else if (viewType === "monthly") {
    chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    chartValues = Array(12).fill(0);
    orders.forEach((order) => {
      try {
        const date = new Date(order.date);
        const month = date.getMonth();
        if (month >= 0 && month < 12) {
          chartValues[month] += order.total;
        }
      } catch (e) {}
    });
  } else {
    chartLabels = ["2024", "2025", "2026", "2027"];
    chartValues = Array(4).fill(0);
    orders.forEach((order) => {
      try {
        const date = new Date(order.date);
        const year = date.getFullYear().toString();
        const index = chartLabels.indexOf(year);
        if (index !== -1) {
          chartValues[index] += order.total;
        }
      } catch (e) {}
    });
  }

  // Fallback visual data if there is no revenue recorded yet
  const hasRealRevenue = orders.some((o) => o.total > 0);
  const sampleWeekly = [45000, 80000, 35000, 95000, 60000, 120000, 50000];
  const sampleMonthly = [120000, 150000, 180000, 220000, 310000, 450000, 280000, 350000, 420000, 380000, 490000, 600000];
  const sampleYearly = [850000, 1400000, 2800000, 0];

  const displayValues = hasRealRevenue
    ? chartValues
    : (viewType === "weekly" ? sampleWeekly : (viewType === "monthly" ? sampleMonthly : sampleYearly));

  const maxVal = Math.max(...displayValues, 1);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold gradient-gold-text">
            Dashboard
          </h1>
          <p className="text-sm text-foreground/40 mt-1">Welcome back, Admin</p>
        </div>
        <Link href="/admin/products">
          <Button className="btn-luxury">
            <Plus size={16} className="mr-2" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight size={12} />
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[11px] text-foreground/40 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Revenue Overview
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewType("weekly")}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                viewType === "weekly" ? "bg-gold/10 text-gold" : "text-foreground/40 hover:bg-gold/5"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewType("monthly")}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                viewType === "monthly" ? "bg-gold/10 text-gold" : "text-foreground/40 hover:bg-gold/5"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewType("yearly")}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                viewType === "yearly" ? "bg-gold/10 text-gold" : "text-foreground/40 hover:bg-gold/5"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Dynamic Bar Chart with Tooltips */}
        <div className="flex items-end justify-between gap-2 h-48 pt-6">
          {chartLabels.map((label, i) => {
            const val = displayValues[i];
            const heightPercent = (val / maxVal) * 100;
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="relative group w-full flex justify-center items-end h-[calc(100%-20px)]">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-stone-900 border border-gold/30 text-gold text-[10px] font-mono py-1.5 px-3 rounded-lg whitespace-nowrap shadow-2xl z-10 transition-all">
                    {formatPrice(val)}
                  </div>
                  {/* Interactive Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(heightPercent, 3)}%` }} // Minimum height so it is visible
                    transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                    className="w-4 sm:w-8 md:w-12 rounded-t-lg bg-gradient-to-t from-gold/10 to-gold/60 hover:from-gold/25 hover:to-gold/80 transition-all cursor-pointer shadow-lg shadow-gold/5"
                  />
                </div>
                <span className="text-[10px] text-foreground/30 font-medium tracking-wide mt-1">{label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Recent Orders
          </h2>
          <Link href="/admin/orders" className="text-xs text-gold hover:underline">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/5">
                <th className="text-left px-6 py-3 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-[10px] text-foreground/30 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-foreground/40">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const firstItem = order.items[0];
                  const displayTitle = firstItem
                    ? order.items.length > 1
                      ? `${firstItem.product.name} + ${order.items.length - 1} more`
                      : firstItem.product.name
                    : "Luxury Pieces";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                    >
                      <td className="px-6 py-4 text-sm text-gold font-mono font-medium">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70">
                        {order.address.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/50 truncate max-w-[200px]">
                        {displayTitle}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wider uppercase ${
                            order.status === "Delivered"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
