"use client";

// ═══════════════════════════════════════════════════════
// OREN — Product Detail Page
// ═══════════════════════════════════════════════════════

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  ChevronLeft,
  Gem,
  Award,
  ZoomIn,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { sampleProducts, sampleReviews, formatPrice, getDiscountPercentage } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = sampleProducts.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const addToCart = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen">
        <h1 className="text-2xl font-display text-foreground/50">Product not found</h1>
        <Link href="/products" className="text-gold hover:underline mt-4 inline-block">
          ← Back to collections
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const reviews = sampleReviews.filter((r) => r.product_id === product.id);
  const relatedProducts = sampleProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast.success("Added to cart!", { description: `${product.name} × ${quantity}` });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    router.push("/cart");
  };

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-foreground/40 mb-8"
        >
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-gold transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground/60">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ─── Image Gallery ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image with Zoom */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-luxury-charcoal glass-card cursor-crosshair mb-4"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleZoom}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />

              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs text-foreground/50 pointer-events-none">
                <ZoomIn size={14} /> Hover to zoom
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new_arrival && (
                  <Badge className="bg-gold text-luxury-black border-0">New Arrival</Badge>
                )}
                {product.compare_price && (
                  <Badge className="bg-red-500 text-white border-0">
                    -{getDiscountPercentage(product.price, product.compare_price)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-gold shadow-lg shadow-gold/20"
                      : "border-transparent glass-card"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ─── Product Details ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Category & SKU */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gold uppercase tracking-[0.3em]">
                  {product.category}
                </span>
                <span className="text-xs text-foreground/30">SKU: {product.sku}</span>
              </div>

              {/* Name */}
              <h1 className="text-2xl lg:text-4xl font-display font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-gold fill-gold"
                          : "text-foreground/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/50">
                  {product.rating} ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold gradient-gold-text">
                  {formatPrice(product.price)}
                </span>
                {product.compare_price && (
                  <>
                    <span className="text-lg text-foreground/30 line-through">
                      {formatPrice(product.compare_price)}
                    </span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                      Save {formatPrice(product.compare_price - product.price)}
                    </Badge>
                  </>
                )}
              </div>

              <Separator className="bg-gold/10" />

              {/* Description */}
              <p className="text-sm text-foreground/60 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h3 className="text-xs text-gold uppercase tracking-wider font-semibold">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.material && (
                    <div>
                      <span className="text-[10px] text-foreground/30 uppercase">Material</span>
                      <p className="text-sm text-foreground/70">{product.material}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <span className="text-[10px] text-foreground/30 uppercase">Weight</span>
                      <p className="text-sm text-foreground/70">{product.weight}</p>
                    </div>
                  )}
                  {product.purity && (
                    <div>
                      <span className="text-[10px] text-foreground/30 uppercase">Purity</span>
                      <p className="text-sm text-foreground/70">{product.purity}</p>
                    </div>
                  )}
                  {product.diamond_type && (
                    <div>
                      <span className="text-[10px] text-foreground/30 uppercase">Diamond</span>
                      <p className="text-sm text-foreground/70">{product.diamond_type}</p>
                    </div>
                  )}
                  {product.diamond_carat && (
                    <div>
                      <span className="text-[10px] text-foreground/30 uppercase">Carat</span>
                      <p className="text-sm text-foreground/70">{product.diamond_carat}</p>
                    </div>
                  )}
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-[10px] text-foreground/30 uppercase">{key}</span>
                        <p className="text-sm text-foreground/70">{value}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-xs text-foreground/40 uppercase tracking-wider mb-3">
                    Select Size
                  </h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "bg-gold text-luxury-black"
                            : "glass hover:border-gold/30 text-foreground/60"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-xs text-foreground/40 uppercase tracking-wider mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-gold/30 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:border-gold/30 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                  <span className="text-xs text-foreground/30 ml-2">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-luxury py-6 text-sm font-semibold uppercase tracking-wider"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="flex-1 py-6 text-sm font-semibold uppercase tracking-wider border-gold/30 text-gold hover:bg-gold/10"
                >
                  Buy Now
                </Button>
                <button
                  onClick={() => {
                    toggleItem(product);
                    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    wishlisted
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "glass hover:border-gold/30"
                  }`}
                >
                  <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 p-3 glass rounded-xl"
                  >
                    <Icon size={18} className="text-gold/60" />
                    <span className="text-[10px] text-foreground/40 text-center">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Reviews Section ─── */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-bold gradient-gold-text mb-8">
            Customer Reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-luxury-black font-bold text-sm">
                        {review.profiles?.full_name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {review.profiles?.full_name}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-gold fill-gold" />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.verified_purchase && (
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px]">
                        <Award size={10} className="mr-1" /> Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1">{review.title}</h4>
                  <p className="text-sm text-foreground/50 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center">
              <p className="text-foreground/40">No reviews yet. Be the first to review this piece.</p>
            </div>
          )}
        </div>

        {/* ─── Related Products ─── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold gradient-gold-text mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
