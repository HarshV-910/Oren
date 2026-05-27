"use client";

// ═══════════════════════════════════════════════════════
// OREN — Maintenance Guard Component
// ═══════════════════════════════════════════════════════

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Crown } from "lucide-react";
import { auth, onAuthStateChanged } from "@/lib/firebase";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const maintenance = useSettingsStore((s) => s.maintenance);
  const { user, setUser, isLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "harshvekariya910@gmail.com";
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          full_name: firebaseUser.displayName || "Valued Client",
          phone: firebaseUser.phoneNumber || undefined,
          avatar_url: firebaseUser.photoURL || undefined,
          role: firebaseUser.email === adminEmail ? "admin" : "user",
          language: "en",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (!mounted || isLoading) return;

    // Check if the current user is a site administrator
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@oren.com";
    const isAdmin = user?.role === "admin" || user?.email === adminEmail;

    // Exclude auth routes from redirection to allow admin to log in
    const isAuthRoute = pathname.startsWith("/auth");
    const isMaintenanceRoute = pathname === "/maintenance";

    if (maintenance) {
      if (!isAdmin && !isMaintenanceRoute && !isAuthRoute) {
        router.replace("/maintenance");
      } else if (isAdmin && isMaintenanceRoute) {
        router.replace("/admin/settings");
      }
    } else {
      if (isMaintenanceRoute) {
        router.replace("/");
      }
    }
  }, [mounted, maintenance, user, pathname, router, isLoading]);

  // While checking or loading on a blocked route, show a minimal luxury loading screen
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <Crown className="w-10 h-10 text-gold animate-pulse" />
      </div>
    );
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@oren.com";
  const isAdmin = user?.role === "admin" || user?.email === adminEmail;
  const isAuthRoute = pathname.startsWith("/auth");
  const isMaintenanceRoute = pathname === "/maintenance";
  const isAdminRoute = pathname.startsWith("/admin");

  if (maintenance && !isAdmin && !isMaintenanceRoute && !isAuthRoute) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <Crown className="w-10 h-10 text-gold animate-pulse" />
      </div>
    );
  }

  // Render without Navbar/Footer for admin panel, auth pages, and maintenance screen
  if (isAdminRoute || isMaintenanceRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <SearchOverlay />
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
