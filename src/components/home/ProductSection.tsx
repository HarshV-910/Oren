"use client";

// ═══════════════════════════════════════════════════════
// OREN — Featured Products Section
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { sampleProducts } from "@/lib/data";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  filter: keyof typeof sampleProducts[0];
  viewAllLink?: string;
}

export default function ProductSection({
  title,
  subtitle,
  filter,
  viewAllLink = "/products",
}: ProductSectionProps) {
  const products = sampleProducts
    .filter((p) => p[filter as keyof typeof p])
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-xs text-gold/70 uppercase tracking-[0.3em]">{subtitle}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mt-2">
              <span className="gradient-gold-text">{title}</span>
            </h2>
          </div>
          <Link
            href={viewAllLink}
            className="hidden sm:flex items-center gap-1.5 text-sm text-gold/80 hover:text-gold transition-colors group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Products Grid — 4 per row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-1.5 text-sm text-gold/80 hover:text-gold transition-colors"
          >
            View All Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
