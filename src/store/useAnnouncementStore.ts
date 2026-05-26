// ═══════════════════════════════════════════════════════
// OREN — Announcement Store (Zustand)
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnnouncementState {
  text: string;
  setText: (text: string) => void;
}

export const useAnnouncementStore = create<AnnouncementState>()(
  persist(
    (set) => ({
      text: "✨ FREE WORLDWIDE SHIPPING ON ORDERS ABOVE ₹50,000 | USE CODE: OREN10 FOR 10% OFF ✨",
      setText: (text) => set({ text }),
    }),
    {
      name: "oren-announcement",
    }
  )
);
