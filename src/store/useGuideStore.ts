// ═══════════════════════════════════════════════════════
// OREN — Size & Care Guides Store (Zustand)
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuideState {
  sizeGuide: string;
  careGuide: string;
  setSizeGuide: (content: string) => void;
  setCareGuide: (content: string) => void;
}

const defaultSizeGuide = `### Ring Sizing
Our rings use standard US/Indian sizing. To find your size, measure the inner diameter of a ring that fits you:
• Size 5 (15.7mm diameter) — Inside Circumference: 49.3mm
• Size 6 (16.5mm diameter) — Inside Circumference: 51.8mm
• Size 7 (17.3mm diameter) — Inside Circumference: 54.4mm
• Size 8 (18.2mm diameter) — Inside Circumference: 56.9mm
• Size 9 (19.0mm diameter) — Inside Circumference: 59.5mm
• Size 10 (19.8mm diameter) — Inside Circumference: 62.1mm

### Necklace Sizing
Choose the length that best complements your style:
• 14" (35 cm) — Fits tightly around the neck (Choker style)
• 16" (40 cm) — Sits right at the base of the neck
• 18" (45 cm) — Sits on the collarbone (Most popular length)
• 20" (50 cm) — Sits a few inches below the collarbone
• 22" (55 cm) — Falls near the top of the bust line

### Bangles & Bracelets
Measure your wrist circumference snugly with a flexible tape:
• Small (2-2 Bangle / 6.5" Bracelet) — Wrist Size: 5.5" to 6.0"
• Medium (2-4 Bangle / 7.0" Bracelet) — Wrist Size: 6.0" to 6.5"
• Large (2-6 Bangle / 7.5" Bracelet) — Wrist Size: 6.5" to 7.0"
• X-Large (2-8 Bangle / 8.0" Bracelet) — Wrist Size: 7.0" to 7.5"`;

const defaultCareGuide = `### Daily Maintenance
• **Last On, First Off**: Always put your jewellery on last after applying perfume, makeup, hairspray, and lotions, and take it off first.
• **Avoid Chemicals**: Never wear jewellery in swimming pools, hot tubs, or while cleaning with household detergents.
• **Remove Before Activity**: Remove rings and bracelets before working out, cooking, or gardening to avoid scratches.

### Cleaning Different Materials
• **Fine Gold & Platinum**: Soak in warm water with a few drops of mild dish soap. Use a soft-bristled toothbrush to clean hard-to-reach areas. Rinse and dry thoroughly with a lint-free cloth.
• **Diamonds & Precious Stones**: Clean gently with a warm water and soap solution. Avoid steam or ultrasonic cleaners for emeralds, opals, and tanzanites as they are fragile.
• **Cultured Pearls**: Wipe gently with a soft, damp cloth after wearing. Never soak pearls in water as it can weaken the silk thread.

### Safe Storage
• **Individual Pouches**: Store each piece of jewellery in its own soft pouch or separate compartment of a jewellery box to prevent scratching.
• **Anti-Tarnish Strips**: Keep silver jewellery in airtight zip bags with anti-tarnish strips to slow down oxidation.`;

export const useGuideStore = create<GuideState>()(
  persist(
    (set) => ({
      sizeGuide: defaultSizeGuide,
      careGuide: defaultCareGuide,
      setSizeGuide: (sizeGuide) => set({ sizeGuide }),
      setCareGuide: (careGuide) => set({ careGuide }),
    }),
    {
      name: "oren-guides-store",
    }
  )
);
