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
  maintenance: boolean;
  addressState: string;
  phoneBackup: string;
  phoneTollFree: string;
  supportEmail: string;
  ordersEmail: string;
  workingHoursWeekdays: string;
  workingHoursSunday: string;
  workingHoursHolidays: string;
  setStoreName: (name: string) => void;
  setContactEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setMaintenance: (val: boolean) => void;
  setAddressState: (val: string) => void;
  setPhoneBackup: (val: string) => void;
  setPhoneTollFree: (val: string) => void;
  setSupportEmail: (val: string) => void;
  setOrdersEmail: (val: string) => void;
  setWorkingHoursWeekdays: (val: string) => void;
  setWorkingHoursSunday: (val: string) => void;
  setWorkingHoursHolidays: (val: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storeName: "Oren",
      contactEmail: "hello@oren.com",
      phone: "+91 98765 43210",
      address: "Mumbai, India",
      maintenance: false,
      addressState: "Maharashtra, India 400002",
      phoneBackup: "+91 22 2567 8901",
      phoneTollFree: "Toll Free: 1800-XXX-XXXX",
      supportEmail: "support@oren.com",
      ordersEmail: "orders@oren.com",
      workingHoursWeekdays: "Mon - Sat: 10AM - 8PM",
      workingHoursSunday: "Sunday: 11AM - 6PM",
      workingHoursHolidays: "Holidays: Closed",
      setStoreName: (storeName) => set({ storeName }),
      setContactEmail: (contactEmail) => set({ contactEmail }),
      setPhone: (phone) => set({ phone }),
      setAddress: (address) => set({ address }),
      setMaintenance: (maintenance) => set({ maintenance }),
      setAddressState: (addressState) => set({ addressState }),
      setPhoneBackup: (phoneBackup) => set({ phoneBackup }),
      setPhoneTollFree: (phoneTollFree) => set({ phoneTollFree }),
      setSupportEmail: (supportEmail) => set({ supportEmail }),
      setOrdersEmail: (ordersEmail) => set({ ordersEmail }),
      setWorkingHoursWeekdays: (workingHoursWeekdays) => set({ workingHoursWeekdays }),
      setWorkingHoursSunday: (workingHoursSunday) => set({ workingHoursSunday }),
      setWorkingHoursHolidays: (workingHoursHolidays) => set({ workingHoursHolidays }),
    }),
    {
      name: "oren-settings-store",
    }
  )
);
