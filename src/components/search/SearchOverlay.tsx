"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const POPULAR_SEARCHES = [
  "Oversized",
  "T-Shirts",
  "Jeans",
  "Shirts",
  "Track Pants",
  "Black",
  "Ivory",
  "Selvedge",
];

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = p.categoryName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const fitMatch = p.fit.toLowerCase().includes(q);
      const styleMatch = p.styleTags.some((tag) => tag.toLowerCase().includes(q));
      const colorMatch = p.colors.some((c) => c.name.toLowerCase().includes(q));
      const descMatch = p.description.toLowerCase().includes(q);
      const materialMatch = p.material.toLowerCase().includes(q);
      
      // Generic aliases (e.g. "tee" -> "t-shirts", "pant" -> "track-pants", "denim" -> "jeans")
      const aliasMatch =
        (q === "tee" || q === "tees") && p.category === "t-shirts" ||
        (q === "denim") && p.category === "jeans" ||
        (q === "pant" || q === "pants" || q === "track") && p.category === "track-pants";

      return nameMatch || catMatch || fitMatch || styleMatch || colorMatch || descMatch || materialMatch || aliasMatch;
    }).slice(0, 8);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F8F5EF] animate-fade-in flex flex-col text-[#0D0D0D]">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between border-b border-[#E5DDD2]">
        <span className="text-[10px] tracking-[0.25em] text-[#8C8C8C] uppercase font-medium">
          AUREN DISCOVERY
        </span>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase hover:opacity-70 transition-opacity p-2 cursor-pointer"
          aria-label="Close search"
        >
          <span>CLOSE</span>
          <X size={18} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 overflow-y-auto space-y-8">
        {/* Search Input */}
        <div className="relative border-b-2 border-[#0D0D0D] pb-3 flex items-center gap-4">
          <Search size={26} className="text-[#8C8C8C]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="WHAT ARE YOU LOOKING FOR?"
            className="w-full bg-transparent text-xl sm:text-3xl font-editorial tracking-wide placeholder:text-[#C9B8A7] focus:outline-none text-[#0D0D0D]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#8C8C8C] hover:text-[#0D0D0D] uppercase tracking-wider cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Popular Searches when query is empty */}
        {!query.trim() && (
          <div className="space-y-4 pt-2">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#8C8C8C] uppercase">
              POPULAR SEARCHES
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider text-[#333333] hover:bg-[#E5DDD2] hover:text-[#0D0D0D] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-[#8C8C8C] tracking-wider uppercase">
              <span>{searchResults.length} RESULTS FOUND</span>
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => setIsSearchOpen(false)}
                className="text-[#0D0D0D] font-semibold hover:underline flex items-center gap-1"
              >
                VIEW ALL IN SHOP <ArrowRight size={13} />
              </Link>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="font-editorial text-xl">NO RESULTS FOUND FOR &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-[#555555]">
                  Check your spelling or search for terms like &ldquo;oversized&rdquo;, &ldquo;black&rdquo;, &ldquo;shirt&rdquo;, or &ldquo;jeans&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group flex flex-col space-y-2 text-left"
                  >
                    <div className="relative aspect-[3/4] w-full bg-[#F1ECE3] overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-[#8C8C8C] tracking-widest uppercase">
                        {product.categoryName}
                      </p>
                      <p className="text-xs font-medium text-[#0D0D0D] line-clamp-1 group-hover:underline">
                        {product.name}
                      </p>
                      <p className="text-xs font-semibold text-[#0D0D0D]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
