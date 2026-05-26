"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Dashboard
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderOpen,
  Image,
  Tag,
  MessageSquare,
  Settings,
  Crown,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import { sampleProducts, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/users" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: Image, label: "Banners", href: "/admin/banners" },
  { icon: Tag, label: "Coupons", href: "/admin/coupons" },
  { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const stats = [
  {
    label: "Total Revenue",
    value: "₹24,56,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-emerald-400",
  },
  {
    label: "Total Orders",
    value: "156",
    change: "+8.2%",
    icon: ShoppingCart,
    color: "text-blue-400",
  },
  {
    label: "Active Products",
    value: sampleProducts.length.toString(),
    change: "+3",
    icon: Package,
    color: "text-gold",
  },
  {
    label: "Total Visitors",
    value: "12,458",
    change: "+18.7%",
    icon: Eye,
    color: "text-purple-400",
  },
];

const recentOrders = [
  { id: "ORN-001", customer: "Priya S.", product: "Diamond Ring", amount: "₹2,85,000", status: "Delivered" },
  { id: "ORN-002", customer: "Rahul M.", product: "Gold Necklace", amount: "₹4,50,000", status: "Shipped" },
  { id: "ORN-003", customer: "Sarah W.", product: "Earrings", amount: "₹1,65,000", status: "Processing" },
  { id: "ORN-004", customer: "Amit K.", product: "Tennis Bracelet", amount: "₹3,80,000", status: "Confirmed" },
  { id: "ORN-005", customer: "Emily C.", product: "Pendant", amount: "₹5,20,000", status: "Pending" },
];

export default function AdminDashboard() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 shrink-0"
          >
            <div className="glass-card rounded-2xl overflow-hidden lg:sticky lg:top-32">
              <div className="p-5 border-b border-gold/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                    <Crown size={18} className="text-luxury-black" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Admin Panel</p>
                    <p className="text-[10px] text-foreground/40">admin@oren.com</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      item.active
                        ? "bg-gold/10 text-gold"
                        : "text-foreground/50 hover:text-foreground hover:bg-gold/5"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
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

            {/* Charts Placeholder */}
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
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-gold/10 text-gold">Weekly</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg text-foreground/40 hover:bg-gold/5">Monthly</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg text-foreground/40 hover:bg-gold/5">Yearly</button>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-48">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                  const heights = [65, 80, 45, 90, 75, 100, 55];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heights[i]}%` }}
                        transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-gold/20 to-gold/50 hover:from-gold/30 hover:to-gold/70 transition-all cursor-pointer"
                      />
                      <span className="text-[10px] text-foreground/30">{day}</span>
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
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                      >
                        <td className="px-6 py-4 text-sm text-gold font-medium">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-foreground/50">{order.product}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                              order.status === "Delivered"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : order.status === "Shipped"
                                ? "bg-blue-500/15 text-blue-400"
                                : order.status === "Processing"
                                ? "bg-amber-500/15 text-amber-400"
                                : order.status === "Confirmed"
                                ? "bg-purple-500/15 text-purple-400"
                                : "bg-foreground/10 text-foreground/50"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
