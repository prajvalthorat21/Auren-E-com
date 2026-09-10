import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full bg-[#F1ECE3] border-t border-[#E5DDD2] pt-16 pb-12 text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 border-b border-[#E5DDD2]">
          {/* Brand Philosophy */}
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <Logo size="md" />
            <p className="text-xs leading-relaxed text-[#555555] max-w-sm pt-2">
              Everyday, elevated. Modern essentials designed for wherever the day takes you. Considered silhouettes, understated details, and timeless pieces made to stay in rotation.
            </p>
            <div className="pt-2 text-[11px] tracking-wider text-[#8C8C8C]">
              NEW YORK • LONDON • PARIS • TOKYO
            </div>
          </div>

          {/* SHOP */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-semibold tracking-[0.25em] text-[#0D0D0D] uppercase">
              SHOP
            </h2>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <Link href="/shop?sort=newest" className="hover:text-[#0D0D0D] transition-colors">
                  New In
                </Link>
              </li>
              <li>
                <Link href="/shop/t-shirts" className="hover:text-[#0D0D0D] transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop/shirts" className="hover:text-[#0D0D0D] transition-colors">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop/jeans" className="hover:text-[#0D0D0D] transition-colors">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="/shop/track-pants" className="hover:text-[#0D0D0D] transition-colors">
                  Track Pants
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0D0D0D] transition-colors font-medium">
                  All Collections →
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-semibold tracking-[0.25em] text-[#0D0D0D] uppercase">
              HELP
            </h2>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <a href="#contact" className="hover:text-[#0D0D0D] transition-colors">
                  Contact Client Care
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#0D0D0D] transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-[#0D0D0D] transition-colors">
                  Easy 7-Day Returns
                </a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-[#0D0D0D] transition-colors">
                  Garment Size Guide
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0D0D0D] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* ABOUT & LEGAL */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-semibold tracking-[0.25em] text-[#0D0D0D] uppercase">
              ABOUT & LEGAL
            </h2>
            <ul className="space-y-2.5 text-xs text-[#555555]">
              <li>
                <a href="#our-story" className="hover:text-[#0D0D0D] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#0D0D0D] transition-colors">
                  Editorial Journal
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-[#0D0D0D] transition-colors">
                  Fabric Sourcing
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#0D0D0D] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#0D0D0D] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Large Typographic AUREN */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] tracking-wider text-[#8C8C8C] text-center md:text-left">
            © {new Date().getFullYear()} AUREN STUDIO. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center space-x-6 text-[11px] tracking-widest text-[#555555] uppercase">
            <span>INSTAGRAM</span>
            <span>PINTEREST</span>
            <span>SPOTIFY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
