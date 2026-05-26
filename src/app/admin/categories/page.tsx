"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Categories Management
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { FolderOpen, Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sampleProducts } from "@/lib/data";

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "cat-1", name: "Rings", slug: "rings", productCount: sampleProducts.filter(p => p.category === "Rings").length },
    { id: "cat-2", name: "Necklaces", slug: "necklaces", productCount: sampleProducts.filter(p => p.category === "Necklaces").length },
    { id: "cat-3", name: "Earrings", slug: "earrings", productCount: sampleProducts.filter(p => p.category === "Earrings").length },
    { id: "cat-4", name: "Bracelets", slug: "bracelets", productCount: sampleProducts.filter(p => p.category === "Bracelets").length },
    { id: "cat-5", name: "Pendants", slug: "pendants", productCount: sampleProducts.filter(p => p.category === "Pendants").length },
  ]);

  const [newCatName, setNewCatName] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const slug = newCatName.toLowerCase().replace(/\s+/g, "-");
    if (categories.find((c) => c.slug === slug)) {
      toast.error("Category already exists");
      return;
    }

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug,
      productCount: 0,
    };

    setCategories([...categories, newCat]);
    setNewCatName("");
    toast.success("Category added successfully! 🎉");
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success("Category removed successfully");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Product Categories
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Organize and classify luxury products in collections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Add Category */}
        <div>
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <FolderOpen size={16} className="text-gold" /> Add New Category
            </h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Category Name</label>
                <Input
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. Bangles"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-luxury py-5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Plus size={16} /> Create Category
              </Button>
            </form>
          </div>
        </div>

        {/* Right Table: Categories List */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      URL Slug
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Product Count
                    </th>
                    <th className="text-right px-6 py-4 text-[10px] text-foreground/30 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gold/5 last:border-0 hover:bg-gold/5 transition-all"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/40 font-mono">
                        /{category.slug}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        {category.productCount} items
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-1.5 text-foreground/30 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
