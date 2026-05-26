"use client";

// ═══════════════════════════════════════════════════════
// OREN — Premium Maintenance Screen
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Crown, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import Link from "next/link";

export default function MaintenancePage() {
  const { storeName, contactEmail, phone } = useSettingsStore();

  return (
    <div className="min-h-screen bg-luxury-dark flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
      {/* Background radial gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Brand Logo */}
      <div className="flex justify-center pt-6">
        <div className="flex items-center gap-2">
          <Crown className="w-8 h-8 text-gold" />
          <span className="text-2xl font-display font-bold tracking-wider gradient-gold-text uppercase">
            {storeName}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto text-center flex flex-col items-center justify-center py-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-r border-gold/40 border-b-transparent border-l-transparent"
            />
            <Crown className="w-10 h-10 text-gold animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-xs text-gold/70 uppercase tracking-[0.3em] font-semibold">Scheduled Refinement</span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mt-4 leading-tight">
            EXQUISITE ARTISTRY<br />
            <span className="gradient-gold-text">TAKES TIME</span>
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed mt-5 max-w-md mx-auto">
            Our digital boutique is temporarily paused for essential system enhancements. We are polishing our shelves to offer you an even more seamless luxury experience.
          </p>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full grid grid-cols-2 gap-4 mt-10 max-w-sm"
        >
          <div className="glass-card rounded-2xl p-4 text-center border border-gold/10">
            <Mail className="w-5 h-5 text-gold mx-auto mb-2" />
            <span className="text-[10px] text-foreground/40 uppercase block mb-1">Direct Support</span>
            <a href={`mailto:${contactEmail}`} className="text-xs font-medium text-foreground/80 hover:text-gold transition-colors truncate block">
              {contactEmail}
            </a>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center border border-gold/10">
            <Phone className="w-5 h-5 text-gold mx-auto mb-2" />
            <span className="text-[10px] text-foreground/40 uppercase block mb-1">Concierge Line</span>
            <a href={`tel:${phone}`} className="text-xs font-medium text-foreground/80 hover:text-gold transition-colors truncate block">
              {phone}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-xs text-foreground/30 flex items-center gap-1.5"
        >
          <Clock size={12} className="text-gold" />
          <span>Expected Reopening: Today, shortly.</span>
        </motion.div>
      </div>

      {/* Bottom Legal / Link for Admins */}
      <div className="text-center pt-6">
        <p className="text-[10px] text-foreground/30 mb-2">
          © {new Date().getFullYear()} {storeName} Luxury Jewellery. All rights reserved.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1 text-[10px] text-gold/45 hover:text-gold transition-colors uppercase tracking-wider font-semibold hover:underline"
        >
          Staff Administration Sign In <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}
