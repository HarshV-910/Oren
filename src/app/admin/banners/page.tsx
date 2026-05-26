"use client";

// ═══════════════════════════════════════════════════════
// OREN — Admin Banners Management
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { Image as ImageIcon, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  active: boolean;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "ban-1",
      title: "Celestial Majesty",
      subtitle: "Experience luxury in diamonds & fine gold",
      imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
      linkUrl: "/products",
      active: true,
    },
    {
      id: "ban-2",
      title: "Aurora Radiance",
      subtitle: "Introducing our new drop earring collection",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      linkUrl: "/products?category=Earrings",
      active: true,
    },
  ]);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("/products");

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !imageUrl) {
      toast.error("Please fill in title, subtitle, and image URL");
      return;
    }

    const newBanner: Banner = {
      id: `ban-${Date.now()}`,
      title,
      subtitle,
      imageUrl,
      linkUrl,
      active: true,
    };

    setBanners([...banners, newBanner]);
    setTitle("");
    setSubtitle("");
    setImageUrl("");
    setLinkUrl("/products");
    toast.success("Promotional banner added successfully! 📸");
  };

  const handleToggleActive = (id: string) => {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
    toast.success("Banner visibility status updated");
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id));
    toast.success("Banner deleted successfully");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold gradient-gold-text">
          Banners & Promos
        </h1>
        <p className="text-sm text-foreground/40 mt-1">
          Configure homepage hero sliders and advertising graphics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Add Banner */}
        <div>
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-base font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <ImageIcon size={16} className="text-gold" /> Create Banner
            </h2>
            <form onSubmit={handleAddBanner} className="space-y-4">
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Banner Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. Royal Solitaire"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Subtitle</label>
                <Input
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="e.g. Handcrafted premium diamonds"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Image Unsplash/URL</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>
              <div>
                <label className="text-xs text-foreground/50 uppercase tracking-wider">Link Destination</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="mt-1.5 bg-white/5 border-gold/15 focus:border-gold/40"
                  placeholder="/products"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-luxury py-5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Plus size={16} /> Publish Banner
              </Button>
            </form>
          </div>
        </div>

        {/* Right List: Banners Cards */}
        <div className="lg:col-span-2 space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`glass-card rounded-2xl overflow-hidden border transition-all flex flex-col md:flex-row ${
                banner.active ? "border-gold/30" : "border-gold/5"
              }`}
            >
              <div className="w-full md:w-48 h-32 md:h-full bg-luxury-charcoal shrink-0 border-r border-gold/5">
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                      {banner.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(banner.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          banner.active ? "text-emerald-400 hover:text-emerald-500" : "text-foreground/30 hover:text-foreground"
                        }`}
                        title={banner.active ? "Set Inactive" : "Set Active"}
                      >
                        {banner.active ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="p-1 text-foreground/30 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/50 mt-1 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <p className="text-[10px] text-gold/60 font-mono mt-3">
                    Destination: {banner.linkUrl}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
