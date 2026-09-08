"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "NEW IN", href: "/shop?sort=newest" },
  { name: "T-SHIRTS", href: "/shop/t-shirts" },
  { name: "SHIRTS", href: "/shop/shirts" },
  { name: "JEANS", href: "/shop/jeans" },
  { name: "TRACK PANTS", href: "/shop/track-pants" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <AnnouncementBar />

      <nav
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#F8F5EF]/95 backdrop-blur-md py-3.5 border-[#E5DDD2] shadow-xs"
            : "bg-[#F8F5EF] py-5 border-[#E5DDD2]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 -ml-1.5 text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[12px] uppercase font-medium tracking-[0.2em] transition-colors py-1 relative group",
                    isActive ? "text-[#0D0D0D]" : "text-[#555555] hover:text-[#0D0D0D]"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-[1px] bg-[#0D0D0D] transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-none flex justify-center items-center">
            <Logo size={isScrolled ? "sm" : "md"} />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-[12px] uppercase font-medium tracking-[0.15em] text-[#0D0D0D] hover:opacity-70 transition-opacity p-1.5"
              aria-label="Search"
            >
              <Search size={19} strokeWidth={1.5} />
              <span className="hidden md:inline-block text-[11px] tracking-[0.2em]">SEARCH</span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-1.5 text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label={`Wishlist with ${totalWishlistItems} items`}
            >
              <Heart size={19} strokeWidth={1.5} />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0D0D0D] text-[#F8F5EF] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#0D0D0D] hover:opacity-70 transition-opacity flex items-center gap-1"
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <span className="hidden md:inline-block text-[11px] font-medium tracking-[0.15em]">
                BAG
              </span>
              {totalItems > 0 && (
                <span className="bg-[#0D0D0D] text-[#F8F5EF] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] z-30 bg-[#F8F5EF] animate-fade-in flex flex-col justify-between px-6 py-8 border-t border-[#E5DDD2] overflow-y-auto">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-medium">
              COLLECTIONS
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-editorial text-2xl tracking-wide text-[#0D0D0D] hover:opacity-70 transition-opacity"
              >
                ALL COLLECTIONS
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-editorial text-2xl tracking-wide text-[#0D0D0D] hover:opacity-70 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E5DDD2] space-y-3">
              <p className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-medium">
                DISCOVER STYLE
              </p>
              <div className="flex flex-wrap gap-2">
                {["MINIMAL", "RELAXED", "STREET", "EVERYDAY", "MONOCHROME"].map((style) => (
                  <Link
                    key={style}
                    href={`/shop?style=${style.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-1.5 bg-[#F1ECE3] text-[11px] tracking-wider text-[#333333] hover:bg-[#E5DDD2] transition-colors"
                  >
                    {style}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5DDD2] space-y-4 text-xs text-[#555555]">
            <div className="flex justify-between items-center">
              <span>CURRENCY</span>
              <span className="font-medium text-[#0D0D0D]">INR (₹)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>ASSISTANCE</span>
              <span className="font-medium text-[#0D0D0D]">CARE@AUREN.STUDIO</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
