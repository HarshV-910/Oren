"use client";

// ═══════════════════════════════════════════════════════
// OREN — Luxury Promo Banner
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Gem, Crown } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80"
              alt="Diamond collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>

          <div className="relative px-8 py-16 lg:px-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <Gem className="w-5 h-5 text-gold" />
                <span className="text-xs text-gold uppercase tracking-[0.3em]">
                  Exclusive Offer
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-5xl font-display font-bold mb-4"
              >
                <span className="text-foreground">The Diamond</span>{" "}
                <span className="gradient-gold-text">Atelier</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-foreground/50 mb-8 max-w-md"
              >
                Experience our hand-selected diamonds, each chosen for their
                exceptional fire and brilliance. Now with complimentary custom
                setting for every purchase.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/products?material=Diamond"
                  className="btn-luxury px-8 py-4 rounded-xl inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider group"
                >
                  Discover Diamonds
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="w-48 h-48 rounded-full border-2 border-gold/20 flex items-center justify-center animate-glow">
                <div className="w-36 h-36 rounded-full border border-gold/10 flex items-center justify-center">
                  <Crown className="w-16 h-16 text-gold/50 animate-float" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
