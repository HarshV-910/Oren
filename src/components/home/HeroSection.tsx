"use client";

// ═══════════════════════════════════════════════════════
// OREN — Cinematic Hero Section
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=1920&q=80"
          alt="Luxury jewellery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/30" />
      </div>

      {/* Animated gold particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: typeof window !== "undefined" ? window.innerHeight + 10 : 800,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs text-gold/80 uppercase tracking-[0.3em] font-medium">
              Crafted with Perfection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Where </span>
            <span className="gradient-gold-text">Gold</span>
            <br />
            <span className="text-foreground">Meets </span>
            <span className="gradient-gold-text">Brilliance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-foreground/60 leading-relaxed mb-10 max-w-lg"
          >
            Discover our world-class collection of handcrafted gold and diamond
            jewellery. Each piece is a masterwork of artistry, designed to be
            treasured for generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/products"
              className="btn-luxury px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group"
            >
              Explore Collection
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider border border-gold/30 text-gold hover:bg-gold/10 transition-all text-center"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-8 mt-16"
          >
            {[
              { value: "500+", label: "Designs" },
              { value: "50K+", label: "Happy Customers" },
              { value: "24K", label: "Pure Gold" },
              { value: "GIA", label: "Certified" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl lg:text-2xl font-bold gradient-gold-text">
                  {stat.value}
                </div>
                <div className="text-[10px] text-foreground/40 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
