"use client";

// ═══════════════════════════════════════════════════════
// OREN — Wishlist Page
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gold/40" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-foreground/40 mb-8">
            Save pieces you love and come back to them later
          </p>
          <Link
            href="/products"
            className="btn-luxury px-8 py-4 rounded-xl inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            Browse Collection <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl lg:text-4xl font-display font-bold gradient-gold-text">
            My Wishlist
          </h1>
          <p className="text-foreground/40 text-sm mt-2">{items.length} pieces saved</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
