import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchOverlay from "@/components/layout/SearchOverlay";
// import ChatBot from "@/components/ai/ChatBot"; // Disabled: Gemini API quota exceeded
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oren — Luxury Gold & Diamond Jewellery",
    template: "%s | Oren Jewellery",
  },
  description:
    "Discover world-class handcrafted gold and diamond jewellery at Oren. Premium rings, necklaces, earrings, bracelets & more. GIA certified diamonds. Free worldwide shipping.",
  keywords: [
    "luxury jewellery",
    "gold jewellery",
    "diamond jewellery",
    "engagement rings",
    "bridal jewellery",
    "24K gold",
    "GIA certified diamonds",
    "online jewellery store",
  ],
  openGraph: {
    title: "Oren — Luxury Gold & Diamond Jewellery",
    description:
      "Discover world-class handcrafted gold and diamond jewellery. Premium quality, GIA certified diamonds, free worldwide shipping.",
    type: "website",
    locale: "en_US",
    siteName: "Oren Jewellery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oren — Luxury Gold & Diamond Jewellery",
    description:
      "Discover world-class handcrafted gold and diamond jewellery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <TooltipProvider>
          <Navbar />
          <SearchOverlay />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* <ChatBot /> */}{/* Disabled: Gemini API quota exceeded — re-enable when you have a working API key */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(17, 17, 17, 0.95)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                color: "#FAFAF9",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </TooltipProvider>
      </body>
    </html>
  );
}
