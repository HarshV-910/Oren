// ═══════════════════════════════════════════════════════
// OREN — Sample Jewellery Data
// ═══════════════════════════════════════════════════════

import type { Product, Category, Banner, Review } from "@/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export const sampleCategories: Category[] = [
  {
    id: "cat-1",
    name: "Rings",
    slug: "rings",
    description: "Exquisite gold and diamond rings for every occasion",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    product_count: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Necklaces",
    slug: "necklaces",
    description: "Stunning necklaces that define elegance",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    product_count: 18,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Earrings",
    slug: "earrings",
    description: "Dazzling earrings that capture the light",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    product_count: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Bracelets",
    slug: "bracelets",
    description: "Luxurious bracelets for the discerning",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    product_count: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Pendants",
    slug: "pendants",
    description: "Elegant pendants that speak volumes",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    product_count: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-6",
    name: "Bangles",
    slug: "bangles",
    description: "Traditional and modern bangles in pure gold",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    product_count: 8,
    created_at: new Date().toISOString(),
  },
];

export const sampleProducts: Product[] = [
  {
    id: "prod-1",
    name: "Celestial Diamond Solitaire Ring",
    slug: "celestial-diamond-solitaire-ring",
    description:
      "A breathtaking solitaire ring featuring a brilliant-cut diamond set in 18K white gold. The celestial design captures the essence of starlight, with micro-pavé diamonds adorning the band for an ethereal sparkle that's impossible to ignore.",
    short_description: "Brilliant-cut diamond solitaire in 18K white gold",
    price: 285000,
    compare_price: 320000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    category: "Rings",
    material: "18K White Gold",
    purity: "18K",
    weight: "4.2g",
    diamond_type: "Natural Diamond",
    diamond_carat: "1.5ct",
    sizes: ["5", "6", "7", "8", "9"],
    stock: 5,
    sku: "OR-RNG-001",
    featured: true,
    trending: true,
    new_arrival: true,
    best_seller: true,
    rating: 4.9,
    review_count: 47,
    tags: ["diamond", "solitaire", "engagement", "white gold"],
    specifications: {
      "Diamond Shape": "Round Brilliant",
      "Diamond Color": "D-F",
      "Diamond Clarity": "VVS1",
      "Setting Type": "Prong Setting",
      Certification: "GIA Certified",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Royal Heritage Gold Necklace",
    slug: "royal-heritage-gold-necklace",
    description:
      "An opulent 22K gold necklace inspired by royal heritage designs. Features intricate filigree work with traditional motifs, finished with a stunning temple-style pendant. A masterpiece of Indian craftsmanship.",
    short_description: "22K gold necklace with intricate filigree work",
    price: 450000,
    compare_price: 520000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    ],
    category: "Necklaces",
    material: "22K Yellow Gold",
    purity: "22K",
    weight: "45g",
    stock: 3,
    sku: "OR-NCK-001",
    featured: true,
    trending: true,
    new_arrival: false,
    best_seller: true,
    rating: 4.8,
    review_count: 32,
    tags: ["gold", "heritage", "bridal", "traditional"],
    specifications: {
      Length: "18 inches",
      "Clasp Type": "Lobster Clasp",
      Style: "Temple Design",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Aurora Diamond Drop Earrings",
    slug: "aurora-diamond-drop-earrings",
    description:
      "Mesmerizing drop earrings featuring pear-shaped diamonds suspended from delicate chains of 18K rose gold. The aurora-inspired design creates a cascade of brilliance that moves with you.",
    short_description: "Pear-shaped diamond drops in 18K rose gold",
    price: 165000,
    compare_price: 195000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
    ],
    category: "Earrings",
    material: "18K Rose Gold",
    purity: "18K",
    weight: "6.8g",
    diamond_type: "Natural Diamond",
    diamond_carat: "2.0ct total",
    stock: 8,
    sku: "OR-EAR-001",
    featured: true,
    trending: false,
    new_arrival: true,
    best_seller: false,
    rating: 4.7,
    review_count: 21,
    tags: ["diamond", "drop earrings", "rose gold", "elegant"],
    specifications: {
      "Diamond Shape": "Pear",
      "Total Carat Weight": "2.0ct",
      "Back Type": "Push Back",
      Length: "35mm",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Eternity Diamond Tennis Bracelet",
    slug: "eternity-diamond-tennis-bracelet",
    description:
      "A timeless tennis bracelet featuring 40 perfectly matched round brilliant diamonds set in 18K white gold. Each diamond is hand-selected for exceptional fire and brilliance.",
    short_description: "40 round brilliant diamonds in 18K white gold",
    price: 380000,
    compare_price: 430000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    category: "Bracelets",
    material: "18K White Gold",
    purity: "18K",
    weight: "12.5g",
    diamond_type: "Natural Diamond",
    diamond_carat: "5.0ct total",
    stock: 4,
    sku: "OR-BRC-001",
    featured: true,
    trending: true,
    new_arrival: false,
    best_seller: true,
    rating: 5.0,
    review_count: 18,
    tags: ["diamond", "tennis bracelet", "eternity", "luxury"],
    specifications: {
      "Number of Diamonds": "40",
      "Average Size": "0.125ct each",
      "Clasp Type": "Box Clasp with Safety",
      Length: "7 inches",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-5",
    name: "Maharani Kundan Choker Set",
    slug: "maharani-kundan-choker-set",
    description:
      "An opulent Kundan choker set crafted in 24K gold with uncut diamonds and precious gemstones. This bridal masterpiece is inspired by Mughal-era royal jewellery, featuring intricate meenakari work on the reverse.",
    short_description: "24K gold Kundan choker with uncut diamonds",
    price: 875000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    ],
    category: "Necklaces",
    material: "24K Gold",
    purity: "24K",
    weight: "85g",
    diamond_type: "Uncut Diamond (Polki)",
    stock: 2,
    sku: "OR-NCK-002",
    featured: true,
    trending: false,
    new_arrival: false,
    best_seller: false,
    rating: 4.9,
    review_count: 11,
    tags: ["bridal", "kundan", "choker", "traditional", "24K gold"],
    specifications: {
      Style: "Kundan Meenakari",
      "Set Includes": "Choker + Earrings + Maang Tikka",
      Gemstones: "Ruby, Emerald, Polki Diamond",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "Infinity Rose Gold Band",
    slug: "infinity-rose-gold-band",
    description:
      "A minimalist infinity band in 14K rose gold, featuring a delicate crossover design with micro-pavé diamonds. Perfect for stacking or wearing alone as an everyday luxury piece.",
    short_description: "14K rose gold infinity band with micro-pavé diamonds",
    price: 42000,
    compare_price: 55000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    category: "Rings",
    material: "14K Rose Gold",
    purity: "14K",
    weight: "2.1g",
    diamond_type: "Natural Diamond",
    diamond_carat: "0.15ct total",
    sizes: ["5", "6", "7", "8"],
    stock: 15,
    sku: "OR-RNG-002",
    featured: false,
    trending: true,
    new_arrival: true,
    best_seller: true,
    rating: 4.6,
    review_count: 64,
    tags: ["rose gold", "minimalist", "everyday", "stackable"],
    specifications: {
      "Band Width": "2mm",
      "Diamond Setting": "Micro-Pavé",
      Style: "Crossover Infinity",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "Empress Emerald & Diamond Pendant",
    slug: "empress-emerald-diamond-pendant",
    description:
      "A regal pendant featuring a 3-carat Colombian emerald surrounded by a halo of brilliant-cut diamonds, suspended from an 18K yellow gold chain. A piece fit for royalty.",
    short_description: "3ct Colombian emerald with diamond halo, 18K gold",
    price: 520000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    ],
    category: "Pendants",
    material: "18K Yellow Gold",
    purity: "18K",
    weight: "8.5g",
    diamond_type: "Natural Diamond",
    diamond_carat: "1.2ct diamonds + 3ct emerald",
    stock: 3,
    sku: "OR-PND-001",
    featured: true,
    trending: false,
    new_arrival: true,
    best_seller: false,
    rating: 4.8,
    review_count: 9,
    tags: ["emerald", "pendant", "halo", "luxury"],
    specifications: {
      "Center Stone": "Colombian Emerald 3.0ct",
      "Diamond Halo": "20 round diamonds, 1.2ct total",
      Chain: "18K gold, 16-18 inch adjustable",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "prod-8",
    name: "Classic Gold Kada Bangles (Set of 4)",
    slug: "classic-gold-kada-bangles",
    description:
      "A set of four classic gold kada bangles in 22K yellow gold with a smooth, polished finish. Each bangle features subtle engraved patterns along the edges, blending tradition with modern elegance.",
    short_description: "Set of 4 classic 22K gold kada bangles",
    price: 320000,
    compare_price: 360000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    ],
    category: "Bangles",
    material: "22K Yellow Gold",
    purity: "22K",
    weight: "60g total",
    sizes: ["2.4", "2.6", "2.8"],
    stock: 6,
    sku: "OR-BNG-001",
    featured: false,
    trending: true,
    new_arrival: false,
    best_seller: true,
    rating: 4.7,
    review_count: 38,
    tags: ["bangles", "traditional", "22K gold", "set"],
    specifications: {
      "Set Contains": "4 Bangles",
      Finish: "High Polish with Engraving",
      "Width Per Bangle": "6mm",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const sampleBanners: Banner[] = [
  {
    id: "ban-1",
    title: "The Bridal Collection",
    subtitle: "Timeless elegance for your special day",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=1920&q=80",
    link: "/products?category=Necklaces",
    position: 1,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ban-2",
    title: "Diamond Essentials",
    subtitle: "Discover our curated diamond collection",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80",
    link: "/products?material=Diamond",
    position: 2,
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ban-3",
    title: "Gold Heritage",
    subtitle: "Crafted with centuries of tradition",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80",
    link: "/products?material=Gold",
    position: 3,
    active: true,
    created_at: new Date().toISOString(),
  },
];

export const sampleReviews: Review[] = [
  {
    id: "rev-1",
    user_id: "user-1",
    product_id: "prod-1",
    rating: 5,
    title: "Absolutely stunning!",
    comment:
      "The diamond sparkles beautifully in any light. The craftsmanship is impeccable and the ring arrived in a gorgeous presentation box. My fiancée was speechless!",
    verified_purchase: true,
    profiles: { full_name: "Rajesh Kumar", avatar_url: "" },
    created_at: "2024-12-15T10:30:00Z",
  },
  {
    id: "rev-2",
    user_id: "user-2",
    product_id: "prod-1",
    rating: 5,
    title: "Worth every penny",
    comment:
      "The quality of this ring exceeded my expectations. The GIA certificate gives complete confidence in the purchase. Oren's customer service was exceptional.",
    verified_purchase: true,
    profiles: { full_name: "Priya Sharma", avatar_url: "" },
    created_at: "2024-11-20T14:15:00Z",
  },
  {
    id: "rev-3",
    user_id: "user-3",
    product_id: "prod-2",
    rating: 4,
    title: "Beautiful heritage piece",
    comment:
      "The filigree work is breathtaking. It's a stunning piece for special occasions. Slightly heavier than expected but that adds to the premium feel.",
    verified_purchase: true,
    profiles: { full_name: "Anita Patel", avatar_url: "" },
    created_at: "2024-10-05T09:00:00Z",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Aishwarya Mehta",
    location: "Mumbai, India",
    rating: 5,
    text: "Oren redefined my expectations of online jewellery shopping. The Maharani set I purchased for my wedding was absolutely breathtaking. Every guest was in awe.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    name: "Sarah Williams",
    location: "London, UK",
    rating: 5,
    text: "The diamond solitaire ring is magnificent. The attention to detail and the quality of the GIA-certified diamond exceeded all my expectations. Truly world-class.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 3,
    name: "Emily Chen",
    location: "Singapore",
    rating: 5,
    text: "I've purchased luxury jewellery from many brands, but Oren stands apart. The craftsmanship, presentation, and customer service are on par with the finest jewellers in the world.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: 4,
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    rating: 5,
    text: "The gold Kundan set is a masterpiece. The meenakari work on the back is as beautiful as the front. Oren delivers true Indian heritage craftsmanship with a modern luxury touch.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
];

export function formatPrice(price: number, currency?: string): string {
  let activeCurrency = "INR";
  let activeRates: Record<string, number> = { INR: 1.0, USD: 0.012, EUR: 0.011, AED: 0.044 };

  try {
    const state = useLocaleStore.getState();
    if (state) {
      activeCurrency = currency || state.currency;
      activeRates = state.exchangeRates;
    }
  } catch (e) {
    if (currency) activeCurrency = currency;
  }

  let displayPrice = price;
  if (!currency && activeCurrency !== "INR") {
    displayPrice = Math.round(price * (activeRates[activeCurrency] || 1.0));
  }

  let locale = "en-IN";
  if (activeCurrency === "USD") locale = "en-US";
  else if (activeCurrency === "EUR") locale = "en-IE";
  else if (activeCurrency === "AED") locale = "en-AE";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: activeCurrency,
    maximumFractionDigits: 0,
  }).format(displayPrice);
}

export function getDiscountPercentage(price: number, comparePrice: number): number {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
