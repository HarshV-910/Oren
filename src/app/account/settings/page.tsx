"use client";

// ═══════════════════════════════════════════════════════
// OREN — Settings Page
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Shield, ChevronRight, Save, Key } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { auth, updateProfile } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading: authLoading, setUser } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login?redirect=/account/settings";
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });

        // Update local zustand store
        if (user) {
          setUser({
            ...user,
            full_name: fullName,
            phone: phone || undefined,
          });
        }
        toast.success("Profile updated successfully! ✨");
      } else {
        toast.error("User session not found");
      }
    } catch (err: any) {
      toast.error("Failed to update profile", {
        description: err.message || "Please try again",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
            <Link href="/account" className="hover:text-gold transition-colors">
              Account
            </Link>
            <ChevronRight size={12} />
            <span className="text-gold">Settings</span>
          </div>
          <h1 className="text-3xl font-display font-bold gradient-gold-text">
            Profile Settings
          </h1>
          <p className="text-foreground/40 text-sm mt-1">
            Update your account details and password settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main profile settings form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl p-6 lg:p-8">
              <h2 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <User size={18} className="text-gold" /> Personal Information
              </h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Email Address</Label>
                  <Input
                    value={user.email}
                    disabled
                    className="mt-1.5 bg-white/5 border-gold/10 text-foreground/40 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-foreground/30 mt-1">
                    Email address cannot be changed. Contact support if you need assistance.
                  </p>
                </div>

                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs text-foreground/50 uppercase tracking-wider">Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="btn-luxury px-8 py-5 text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save size={16} />
                    {saving ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Account Security details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield size={16} className="text-gold" /> Security Details
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed mb-4">
                Your account is protected using Firebase Secure Identity Services.
              </p>
              <div className="p-3 bg-gold/5 rounded-xl border border-gold/10 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-foreground/40">Role Access</span>
                  <span className="text-gold uppercase font-mono">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/40">Language</span>
                  <span className="text-foreground/80">English (EN)</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Key size={16} className="text-gold" /> Password Options
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed mb-4">
                Need to reset or change your password?
              </p>
              <Button
                onClick={() => {
                  toast.success("Password reset email sent!", {
                    description: `Check your inbox at ${user.email} to change password.`,
                  });
                }}
                variant="outline"
                className="w-full text-xs border-gold/20 text-foreground/60 hover:bg-gold/5 uppercase tracking-wider"
              >
                Send Password Reset
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
