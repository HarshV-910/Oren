"use client";

// ═══════════════════════════════════════════════════════
// OREN — Premium Glassmorphism Navbar
// ═══════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Crown,
  ChevronDown,
  Globe,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useAnnouncementStore } from "@/store/useAnnouncementStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { toast } from "sonner";
import { translate } from "@/lib/translations";


const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Collections",
    href: "/products",
    submenu: [
      { name: "Rings", href: "/products?category=Rings" },
      { name: "Necklaces", href: "/products?category=Necklaces" },
      { name: "Earrings", href: "/products?category=Earrings" },
      { name: "Bracelets", href: "/products?category=Bracelets" },
      { name: "Pendants", href: "/products?category=Pendants" },
      { name: "Bangles", href: "/products?category=Bangles" },
    ],
  },
  { name: "New Arrivals", href: "/products?filter=new" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [localeOpen, setLocaleOpen] = useState(false);
  const { language, currency, setLanguage, setCurrency } = useLocaleStore();

  const { isMobileMenuOpen, setMobileMenu, setSearchOpen, setChatOpen } = useUIStore();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { user, setUser } = useAuthStore();
  const announcementText = useAnnouncementStore((s) => s.text);
  const storeName = useSettingsStore((s) => s.storeName);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-gold/90 text-luxury-black text-center py-1.5 text-xs font-medium tracking-wider">
        {announcementText}
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-2xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground/80 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Crown className="w-8 h-8 text-gold group-hover:animate-pulse-gold transition-all" />
              <span className="text-2xl lg:text-3xl font-display font-bold gradient-gold-text tracking-wider uppercase">
                {storeName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-gold transition-colors tracking-wide uppercase"
                  >
                    {translate(
                      link.name === "Home" ? "nav.home" :
                      link.name === "Collections" ? "nav.products" :
                      link.name === "New Arrivals" ? "nav.new_arrivals" :
                      link.name === "About" ? "nav.about" :
                      link.name === "Contact" ? "nav.contact" : link.name,
                      link.name
                    )}
                    {link.submenu && (
                      <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </Link>

                  {/* Submenu */}
                  {link.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-xl overflow-hidden shadow-2xl shadow-black/50"
                        >
                          <div className="py-2">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-5 py-2.5 text-sm text-foreground/80 hover:text-gold hover:bg-gold/5 transition-all"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Active indicator */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-foreground/70 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="hidden sm:block p-2 text-foreground/70 hover:text-gold transition-colors"
                aria-label="AI Assistant"
              >
                <MessageCircle size={20} />
              </button>

              <Link
                href="/account/wishlist"
                className="p-2 text-foreground/70 hover:text-gold transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-luxury-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 text-foreground/70 hover:text-gold transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-luxury-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href={
                  user
                    ? user.role === "admin"
                      ? "/admin"
                      : "/account"
                    : "/auth/login"
                }
                className="p-2 text-foreground/70 hover:text-gold transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <div className="relative">
                <button
                  onClick={() => setLocaleOpen(!localeOpen)}
                  className="hidden md:flex p-2 text-foreground/70 hover:text-gold transition-colors"
                  aria-label="Language and Currency"
                >
                  <Globe size={18} />
                </button>
                
                <AnimatePresence>
                  {localeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 glass-strong rounded-xl p-4 shadow-2xl z-50 space-y-4 border border-gold/15"
                    >
                      <div>
                        <label className="text-[10px] text-foreground/40 uppercase tracking-wider block mb-2 font-semibold">
                          Select Currency
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { code: "INR", label: "INR (₹)" },
                            { code: "USD", label: "USD ($)" },
                            { code: "EUR", label: "EUR (€)" },
                            { code: "AED", label: "AED (د.إ)" },
                          ].map((curr) => (
                            <button
                              key={curr.code}
                              onClick={() => {
                                setCurrency(curr.code as any);
                                toast.success(`Currency switched to ${curr.code}`);
                                setLocaleOpen(false);
                              }}
                              className={`py-1.5 px-3 rounded-lg text-[11px] font-medium border text-center transition-all ${
                                currency === curr.code
                                  ? "bg-gold/10 border-gold text-gold"
                                  : "bg-white/5 border-transparent text-foreground/70 hover:bg-white/10"
                              }`}
                            >
                              {curr.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gold/10 pt-3">
                        <label className="text-[10px] text-foreground/40 uppercase tracking-wider block mb-2 font-semibold">
                          Select Language
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { code: "en", label: "English" },
                            { code: "hi", label: "Hindi" },
                            { code: "ar", label: "Arabic" },
                            { code: "es", label: "Spanish" },
                          ].map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code as any);
                                toast.success(`Language changed to ${lang.label}`);
                                setLocaleOpen(false);
                              }}
                              className={`py-1.5 px-3 rounded-lg text-[11px] font-medium border text-center transition-all ${
                                language === lang.code
                                  ? "bg-gold/10 border-gold text-gold"
                                  : "bg-white/5 border-transparent text-foreground/70 hover:bg-white/10"
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenu(false)}
            />
            <div className="relative w-80 h-full glass-strong overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenu(false)}>
                    <Crown className="w-7 h-7 text-gold" />
                    <span className="text-2xl font-display font-bold gradient-gold-text">
                      OREN
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="p-2 text-foreground/70 hover:text-gold"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenu(false)}
                        className="block py-3 px-4 text-foreground/80 hover:text-gold hover:bg-gold/5 rounded-lg transition-all text-lg"
                      >
                        {translate(
                          link.name === "Home" ? "nav.home" :
                          link.name === "Collections" ? "nav.products" :
                          link.name === "New Arrivals" ? "nav.new_arrivals" :
                          link.name === "About" ? "nav.about" :
                          link.name === "Contact" ? "nav.contact" : link.name,
                          link.name
                        )}
                      </Link>
                      {link.submenu && (
                        <div className="pl-6 space-y-1">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setMobileMenu(false)}
                              className="block py-2 px-4 text-sm text-foreground/60 hover:text-gold transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="divider-gold my-6" />

                <div className="space-y-1">
                  {!user ? (
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenu(false)}
                      className="block py-3 px-4 text-foreground/80 hover:text-gold rounded-lg transition-all"
                    >
                      Sign In / Register
                    </Link>
                  ) : (
                    <>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenu(false)}
                          className="block py-3 px-4 text-foreground/80 hover:text-gold rounded-lg transition-all"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        onClick={() => setMobileMenu(false)}
                        className="block py-3 px-4 text-foreground/80 hover:text-gold rounded-lg transition-all"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setMobileMenu(false)}
                        className="block py-3 px-4 text-foreground/80 hover:text-gold rounded-lg transition-all"
                      >
                        My Orders
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
