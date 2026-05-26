"use client";

// ═══════════════════════════════════════════════════════
// OREN — Categories Showcase
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import { sampleCategories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs text-gold/70 uppercase tracking-[0.3em]">Browse By</span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold mt-2">
            <span className="gradient-gold-text">Collections</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold/40 mx-auto mt-4" />
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {sampleCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/products?category=${category.name}`}
                className="group block"
              >
                <div className="glass-card rounded-2xl overflow-hidden p-4 text-center transition-all duration-500 group-hover:border-gold/30">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-gold/20 group-hover:border-gold/50 transition-all">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] text-foreground/40 mt-0.5">
                    {category.product_count} pieces
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
