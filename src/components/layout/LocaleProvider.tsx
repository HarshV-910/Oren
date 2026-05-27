"use client";

import React, { useEffect, useState } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { currency, language } = useLocaleStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  // Keying on currency and language forces React to re-render the children
  // and evaluate all formatPrice and translation calls automatically.
  return <div key={`${currency}-${language}`} className="contents">{children}</div>;
}
