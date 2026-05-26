// ═══════════════════════════════════════════════════════
// OREN — UI Store (Zustand)
// ═══════════════════════════════════════════════════════

import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isChatOpen: boolean;
  isCartDrawerOpen: boolean;
  language: string;
  setMobileMenu: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  setCartDrawer: (open: boolean) => void;
  setLanguage: (lang: string) => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleChat: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isChatOpen: false,
  isCartDrawerOpen: false,
  language: "en",

  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setChatOpen: (open) => set({ isChatOpen: open }),
  setCartDrawer: (open) => set({ isCartDrawerOpen: open }),
  setLanguage: (lang) => set({ language: lang }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
