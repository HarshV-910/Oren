"use client";

// ═══════════════════════════════════════════════════════
// OREN — Search Overlay
// ═══════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { sampleProducts } from "@/lib/data";
import Fuse from "fuse.js";

const fuse = new Fuse(sampleProducts, {
  keys: ["name", "category", "material", "tags", "description"],
  threshold: 0.4,
});

const trendingSearches = ["Diamond Ring", "Gold Necklace", "Bridal Set", "Earrings", "Bracelet"];

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof sampleProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query).map((r) => r.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (slug: string) => {
    setSearchOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto pt-24 px-4"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gold/60" size={22} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for jewellery..."
                className="w-full pl-14 pr-14 py-5 bg-white/5 border border-gold/20 rounded-2xl text-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold/40 transition-all"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-gold transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 glass-card rounded-2xl overflow-hidden max-h-96 overflow-y-auto"
              >
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.slug)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gold/5 transition-colors text-left"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-luxury-gray shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-foreground/50">{product.category} • {product.material}</p>
                    </div>
                    <p className="text-sm font-semibold text-gold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </button>
                ))}
              </motion.div>
            ) : query.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="flex items-center gap-2 text-foreground/40 mb-3">
                  <TrendingUp size={16} />
                  <span className="text-xs uppercase tracking-wider">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 glass rounded-full text-sm text-foreground/60 hover:text-gold hover:border-gold/30 transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
