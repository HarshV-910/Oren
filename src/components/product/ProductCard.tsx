"use client";

// ═══════════════════════════════════════════════════════
// OREN — Premium Product Card
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice, getDiscountPercentage } from "@/lib/data";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart", {
      description: product.name,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-gold/10">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-luxury-charcoal">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.new_arrival && (
                <span className="px-2.5 py-1 bg-gold text-luxury-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                  New
                </span>
              )}
              {product.compare_price && (
                <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                  -{getDiscountPercentage(product.price, product.compare_price)}%
                </span>
              )}
              {product.best_seller && (
                <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
              <button
                onClick={handleToggleWishlist}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-red-500 text-white"
                    : "glass hover:bg-gold/20"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={16} fill={wishlisted ? "white" : "none"} />
              </button>
              <button
                onClick={handleAddToCart}
                className="w-9 h-9 rounded-full glass hover:bg-gold/20 flex items-center justify-center transition-all"
                aria-label="Add to cart"
              >
                <ShoppingBag size={16} />
              </button>
            </div>

            {/* Quick View */}
            <div className="absolute bottom-3 left-3 right-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full py-2.5 glass rounded-xl text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-gold/20 transition-all">
                <Eye size={14} />
                Quick View
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-4">
            <p className="text-[10px] text-gold/70 uppercase tracking-[0.2em] font-medium mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors line-clamp-1 mb-1.5">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-foreground/20"}
                />
              ))}
              <span className="text-[10px] text-foreground/40 ml-1">({product.review_count})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold gradient-gold-text">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-xs text-foreground/30 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
