// ═══════════════════════════════════════════════════════
// OREN — Settings Store (Zustand)
// ═══════════════════════════════════════════════════════

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  storeName: string;
  contactEmail: string;
  phone: string;
  address: string;
  setStoreName: (name: string) => void;
  setContactEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storeName: "Oren",
      contactEmail: "hello@oren.com",
      phone: "+91 98765 43210",
      address: "Mumbai, India",
      setStoreName: (storeName) => set({ storeName }),
      setContactEmail: (contactEmail) => set({ contactEmail }),
      setPhone: (phone) => set({ phone }),
      setAddress: (address) => set({ address }),
    }),
    {
      name: "oren-settings-store",
    }
  )
);
