"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Product Management
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  Package,
  Eye,
  ArrowLeft,
  ImagePlus,
} from "lucide-react";
import { sampleProducts, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProducts = sampleProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 glass rounded-lg hover:border-gold/30 transition-all">
              <ArrowLeft size={18} className="text-foreground/50" />
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-gold-text">
                Products
              </h1>
              <p className="text-sm text-foreground/40">{sampleProducts.length} total products</p>
            </div>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-luxury"
          >
            <Plus size={16} className="mr-2" /> Add Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card rounded-2xl p-6 lg:p-8 mb-8"
          >
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">
              Add New Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Product Name</label>
                <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="e.g. Diamond Solitaire Ring" />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Category</label>
                <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="e.g. Rings" />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Price (₹)</label>
                <Input type="number" className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="285000" />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Compare Price (₹)</label>
                <Input type="number" className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="320000" />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Material</label>
                <Input className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="18K White Gold" />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Stock</label>
                <Input type="number" className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40" placeholder="10" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Description</label>
                <textarea
                  className="mt-1.5 w-full rounded-md bg-white/5 border border-gold/15 focus:border-gold/40 p-3 text-sm text-foreground placeholder:text-foreground/30 resize-none focus:outline-none"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Product Images</label>
                <div className="mt-1.5 border-2 border-dashed border-gold/15 rounded-xl p-8 text-center hover:border-gold/30 transition-all cursor-pointer">
                  <ImagePlus className="w-8 h-8 text-foreground/20 mx-auto mb-2" />
                  <p className="text-sm text-foreground/30">Click to upload or drag and drop</p>
                  <p className="text-[10px] text-foreground/20 mt-1">PNG, JPG up to 10MB each</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                className="btn-luxury"
                onClick={() => {
                  toast.success("Product added successfully");
                  setShowAddForm(false);
                }}
              >
                Add Product
              </Button>
              <Button
                variant="outline"
                className="border-gold/20 text-foreground/50 hover:bg-gold/5"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-11 bg-white/5 border-gold/15 focus:border-gold/40"
          />
        </div>

        {/* Products Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-luxury-charcoal shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-foreground/30">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/50">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm ${
                          product.stock > 5
                            ? "text-emerald-400"
                            : product.stock > 0
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`text-[10px] ${
                          product.featured
                            ? "bg-gold/15 text-gold border-gold/20"
                            : "bg-foreground/10 text-foreground/50 border-0"
                        }`}
                      >
                        {product.featured ? "Featured" : "Standard"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="p-2 text-foreground/30 hover:text-gold transition-colors"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          className="p-2 text-foreground/30 hover:text-gold transition-colors"
                          onClick={() => toast.info("Edit mode coming soon")}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="p-2 text-foreground/30 hover:text-red-400 transition-colors"
                          onClick={() => toast.error("Delete coming soon")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
