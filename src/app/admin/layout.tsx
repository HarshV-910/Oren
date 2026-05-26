"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Layout & Authentication Gate
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Lock,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/firebase";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/users" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: Image, label: "Banners", href: "/admin/banners" },
  { icon: Tag, label: "Coupons", href: "/admin/coupons" },
  { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@oren.com";
      if (isAuthenticated && user?.email === adminEmail) {
        setIsAdmin(true);
      } else if (!isAuthenticated) {
        window.location.href = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      }
    }
  }, [isLoading, isAuthenticated, user, pathname]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8 text-center rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-red-500/10">
            <Lock className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Access Restricted
          </h2>
          <p className="text-sm text-foreground/50 mb-8 leading-relaxed">
            You do not have administrative privileges to access this area.
          </p>
          <Link href="/">
            <Button className="w-full btn-luxury py-6 text-sm font-semibold uppercase tracking-wider">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Admin Sidebar */}
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
                    <p className="text-[10px] text-foreground/40">{user?.email}</p>
                  </div>
                </div>
              </div>
              <nav className="p-2 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                        isActive
                          ? "bg-gold/10 text-gold"
                          : "text-foreground/50 hover:text-foreground hover:bg-gold/5"
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-2 border-t border-gold/10">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Page Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
