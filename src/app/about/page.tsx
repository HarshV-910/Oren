"use client";

// ═══════════════════════════════════════════════════════
// OREN — About Page
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Crown, Gem, Heart, Globe, Award, Users } from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Every piece undergoes 47 quality checks before it reaches you. We use only GIA-certified diamonds and hallmarked gold.",
  },
  {
    icon: Heart,
    title: "Crafted with Love",
    description:
      "Our master artisans pour their hearts into every piece, combining centuries-old techniques with modern innovation.",
  },
  {
    icon: Globe,
    title: "Worldwide Presence",
    description:
      "From Mumbai to Manhattan, our jewellery adorns customers in 50+ countries. Free worldwide shipping on all orders.",
  },
  {
    icon: Award,
    title: "Award-Winning Design",
    description:
      "Recognized by the World Gold Council and International Jewellery Design Awards for excellence in craftsmanship.",
  },
];

const milestones = [
  { year: "2015", event: "Founded in Mumbai with a vision for luxury" },
  { year: "2017", event: "First international collection launch" },
  { year: "2019", event: "Reached 10,000+ happy customers" },
  { year: "2021", event: "Launched AI-powered jewellery assistance" },
  { year: "2023", event: "Expanded to 50+ countries worldwide" },
  { year: "2024", event: "Introduced blockchain authenticity certificates" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs text-gold/70 uppercase tracking-[0.3em]">Our Story</span>
          <h1 className="text-4xl lg:text-6xl font-display font-bold mt-3 mb-6">
            <span className="gradient-gold-text">Crafting Timeless</span>
            <br />
            <span className="text-foreground">Elegance</span>
          </h1>
          <p className="text-foreground/50 leading-relaxed">
            At Oren, we believe jewellery is more than adornment — it&apos;s a legacy. Born from a
            passion for perfection, every piece in our collection carries the weight of tradition
            and the sparkle of modern artistry. We source the finest materials from across the
            globe and entrust them to master artisans who transform raw beauty into wearable art.
          </p>
        </motion.div>

        {/* Image Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden mb-20"
        >
          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80"
            alt="Oren craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-center">
            <p className="text-lg lg:text-2xl font-display font-semibold text-foreground/90">
              &ldquo;Every piece tells a story of heritage, artistry, and uncompromising quality.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-gold/25 transition-all"
            >
              <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center mx-auto mb-4 group-hover:animate-glow transition-all">
                <value.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-xs text-foreground/40 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-display font-bold gradient-gold-text text-center mb-10">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <span className="text-xl font-display font-bold text-gold w-16 shrink-0">
                  {m.year}
                </span>
                <div className="w-3 h-3 rounded-full bg-gold/40 shrink-0" />
                <p className="text-sm text-foreground/60">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "500+", label: "Unique Designs" },
            { number: "50,000+", label: "Happy Customers" },
            { number: "50+", label: "Countries Served" },
            { number: "10+", label: "Years of Excellence" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold gradient-gold-text mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-foreground/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
