"use client";

// ═══════════════════════════════════════════════════════
// OREN — Size Guide Page
// ═══════════════════════════════════════════════════════

import { motion } from "framer-motion";
import { Ruler, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGuideStore } from "@/store/useGuideStore";

export default function SizeGuidePage() {
  const sizeGuideContent = useGuideStore((s) => s.sizeGuide);

  function renderMarkdown(content: string) {
    return content.split("\n").map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-display font-semibold text-gold mt-8 mb-4 border-b border-gold/15 pb-2">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("• ")) {
        const rest = line.replace("• ", "");
        if (rest.includes("**")) {
          const parts = rest.split("**");
          return (
            <li key={idx} className="text-sm text-foreground/75 list-disc ml-6 mt-2 leading-relaxed">
              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-foreground font-semibold">{p}</strong> : p)}
            </li>
          );
        }
        return (
          <li key={idx} className="text-sm text-foreground/75 list-disc ml-6 mt-2 leading-relaxed">
            {rest}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-sm text-foreground/70 leading-relaxed mt-2">
          {line}
        </p>
      );
    });
  }

  return (
    <div className="pt-40 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-gold transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <Ruler className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-gold-text">Size Guide</h1>
              <p className="text-xs text-foreground/40 uppercase tracking-widest mt-1">Find your perfect luxury fit</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {renderMarkdown(sizeGuideContent)}
          </div>

          <div className="mt-12 p-5 bg-gold/5 rounded-2xl border border-gold/10 text-xs text-foreground/60 leading-relaxed flex items-start gap-3">
            <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
            <p>
              Need a custom length or diameter for rings, necklaces, or bangles? Our design specialists can create custom sizes tailored to your exact measurements. Contact us directly to configure a custom order.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
