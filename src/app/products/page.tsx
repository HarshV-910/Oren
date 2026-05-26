"use client";

// ═══════════════════════════════════════════════════════
// OREN — Products Listing Page
// ═══════════════════════════════════════════════════════

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  X,
  ChevronDown,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { sampleProducts, sampleCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";

const materials = ["18K White Gold", "18K Rose Gold", "22K Yellow Gold", "24K Gold", "14K Rose Gold"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "popular", label: "Most Popular" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const filterParam = searchParams.get("filter") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts];

    // Category filter
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Material filter
    if (selectedMaterial) {
      products = products.filter((p) => p.material === selectedMaterial);
    }

    // Price filter
    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter param
    if (filterParam === "new") {
      products = products.filter((p) => p.new_arrival);
    } else if (filterParam === "trending") {
      products = products.filter((p) => p.trending);
    } else if (filterParam === "featured") {
      products = products.filter((p) => p.featured);
    } else if (filterParam === "best-sellers") {
      products = products.filter((p) => p.best_seller);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        products.sort((a, b) => b.review_count - a.review_count);
        break;
    }

    return products;
  }, [selectedCategory, selectedMaterial, priceRange, sortBy, filterParam]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedMaterial("");
    setPriceRange([0, 1000000]);
    setSortBy("newest");
  };

  const hasActiveFilters = selectedCategory || selectedMaterial || priceRange[0] > 0 || priceRange[1] < 1000000;

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-5xl font-display font-bold">
            <span className="gradient-gold-text">
              {selectedCategory || filterParam
                ? selectedCategory || filterParam.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
                : "All Collections"}
            </span>
          </h1>
          <p className="text-foreground/50 mt-3 text-sm">
            {filteredProducts.length} exquisite pieces
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm hover:border-gold/30 transition-all"
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-gold" />
            )}
          </button>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm hover:border-gold/30 transition-all">
                Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-52 glass-strong rounded-xl overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-all ${
                      sortBy === option.value
                        ? "text-gold bg-gold/10"
                        : "text-foreground/70 hover:text-gold hover:bg-gold/5"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gold">Filter By</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-foreground/50 hover:text-gold flex items-center gap-1"
                >
                  <X size={14} /> Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="text-xs text-foreground/40 uppercase tracking-wider mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {sampleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedCategory === cat.name
                          ? "bg-gold text-luxury-black font-medium"
                          : "glass hover:border-gold/30 text-foreground/60"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h4 className="text-xs text-foreground/40 uppercase tracking-wider mb-3">Material</h4>
                <div className="flex flex-wrap gap-2">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() =>
                        setSelectedMaterial(selectedMaterial === mat ? "" : mat)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        selectedMaterial === mat
                          ? "bg-gold text-luxury-black font-medium"
                          : "glass hover:border-gold/30 text-foreground/60"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs text-foreground/40 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Under ₹50K", range: [0, 50000] },
                    { label: "₹50K - ₹2L", range: [50000, 200000] },
                    { label: "₹2L - ₹5L", range: [200000, 500000] },
                    { label: "Above ₹5L", range: [500000, 10000000] },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() =>
                        setPriceRange(p.range as [number, number])
                      }
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        priceRange[0] === p.range[0] && priceRange[1] === p.range[1]
                          ? "bg-gold text-luxury-black font-medium"
                          : "glass hover:border-gold/30 text-foreground/60"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-foreground/40 font-display">No pieces found</p>
            <p className="text-sm text-foreground/30 mt-2">Try adjusting your filters</p>
            <Button onClick={clearFilters} className="btn-luxury mt-6 px-6">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-gold">Loading Collection...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
