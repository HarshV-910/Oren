"use client";

// ═══════════════════════════════════════════════════════
// OREN — Premium Footer
// ═══════════════════════════════════════════════════════

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  MapPin,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  Video,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Gem,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "Rings", href: "/products?category=Rings" },
    { name: "Necklaces", href: "/products?category=Necklaces" },
    { name: "Earrings", href: "/products?category=Earrings" },
    { name: "Bracelets", href: "/products?category=Bracelets" },
    { name: "Pendants", href: "/products?category=Pendants" },
    { name: "Bangles", href: "/products?category=Bangles" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Care Guide", href: "/care-guide" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const trustBadges = [
  { icon: Shield, label: "Secure Payments" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Gem, label: "Certified Jewellery" },
];

export default function Footer() {
  return (
    <footer className="relative bg-luxury-dark border-t border-gold/10">
      {/* Trust Badges */}
      <div className="border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="w-10 h-10 rounded-full glass-gold flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm font-medium text-foreground/70">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-gold" />
              <span className="text-2xl font-display font-bold gradient-gold-text tracking-wider">
                OREN
              </span>
            </Link>
            <p className="text-foreground/50 text-sm leading-relaxed mb-6">
              Crafting timeless elegance since the beginning. Every piece tells a story of heritage,
              artistry, and uncompromising quality. Experience luxury redefined.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, href: "#" },
                { icon: Heart, href: "#" },
                { icon: Share2, href: "#" },
                { icon: Video, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/30 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-gold/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-display font-semibold gradient-gold-text mb-2">
              Join the Oren Circle
            </h3>
            <p className="text-sm text-foreground/50 mb-4">
              Be the first to discover new collections, exclusive offers, and luxury insights.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border-gold/20 focus:border-gold/40 text-foreground placeholder:text-foreground/30"
              />
              <Button className="btn-luxury px-6 shrink-0">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> Mumbai, India
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} /> hello@oren.com
            </span>
          </div>
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Oren Luxury Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
