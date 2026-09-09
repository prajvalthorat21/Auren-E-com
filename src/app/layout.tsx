import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { QuickAddModal } from "@/components/product/QuickAddModal";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { Toast } from "@/components/common/Toast";

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auren.studio"),
  title: "AUREN | Everyday, Elevated. Unisex Modern Wardrobe",
  description: "Minimalist, editorial unisex clothing designed for Gen Z daily rotation. Heavyweight cotton tees, selvedge denim, fluid shirts, and architectural track pants.",
  keywords: ["Auren", "unisex fashion", "minimal clothing", "heavyweight tee", "selvedge jeans", "aesthetic fashion brand"],
  openGraph: {
    title: "AUREN | Everyday, Elevated.",
    description: "Modern essentials designed for wherever the day takes you.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#0D0D0D] font-sans-ui antialiased">
        <Providers>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <SearchOverlay />
          <QuickAddModal />
          <SizeGuideModal />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
