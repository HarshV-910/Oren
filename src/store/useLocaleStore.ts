import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SupportedLanguage = "en" | "hi" | "ar" | "es";
export type SupportedCurrency = "INR" | "USD" | "EUR" | "AED";

interface LocaleState {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  exchangeRates: Record<SupportedCurrency, number>;
  setLanguage: (lang: SupportedLanguage) => void;
  setCurrency: (curr: SupportedCurrency) => void;
  convertPrice: (priceInINR: number) => { price: number; currency: SupportedCurrency };
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      language: "en",
      currency: "INR",
      exchangeRates: {
        INR: 1.0,
        USD: 0.012,
        EUR: 0.011,
        AED: 0.044,
      },
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      convertPrice: (priceInINR) => {
        const rate = get().exchangeRates[get().currency] || 1.0;
        return {
          price: Math.round(priceInINR * rate),
          currency: get().currency,
        };
      },
    }),
    {
      name: "oren-locale-store",
    }
  )
);
