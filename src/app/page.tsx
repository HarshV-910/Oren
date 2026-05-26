// ═══════════════════════════════════════════════════════
// OREN — Homepage
// ═══════════════════════════════════════════════════════

import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductSection from "@/components/home/ProductSection";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CategoriesSection />

      <div className="divider-gold" />

      <ProductSection
        title="Featured Collection"
        subtitle="Handpicked For You"
        filter="featured"
        viewAllLink="/products?filter=featured"
      />

      <PromoBanner />

      <ProductSection
        title="Trending Now"
        subtitle="Most Popular"
        filter="trending"
        viewAllLink="/products?filter=trending"
      />

      <div className="divider-gold" />

      <ProductSection
        title="New Arrivals"
        subtitle="Just Landed"
        filter="new_arrival"
        viewAllLink="/products?filter=new"
      />

      <div className="divider-gold" />

      <ProductSection
        title="Best Sellers"
        subtitle="Customer Favorites"
        filter="best_seller"
        viewAllLink="/products?filter=best-sellers"
      />

      <div className="divider-gold" />

      <TestimonialsSection />
    </>
  );
}
