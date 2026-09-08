"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#F1ECE3] border-t border-[#E5DDD2] text-[#0D0D0D]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C8C8C]">
            COMMUNITY & DROPS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl tracking-wide">
            STAY IN THE LOOP
          </h2>
          <p className="text-xs sm:text-sm text-[#555555]">
            New drops. New edits. Nothing unnecessary.
          </p>
        </div>

        {isSubscribed ? (
          <div className="p-4 bg-[#F8F5EF] border border-[#E5DDD2] flex items-center justify-center gap-2 text-xs font-medium tracking-wider text-[#0D0D0D] animate-fade-in">
            <Check size={16} />
            <span>WELCOME TO AUREN. CHECK YOUR INBOX SHORTLY.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              className="flex-1 px-4 py-3.5 bg-[#F8F5EF] border border-[#E5DDD2] text-xs tracking-wider placeholder:text-[#8C8C8C] focus:outline-none focus:border-[#0D0D0D] text-[#0D0D0D]"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors whitespace-nowrap"
            >
              JOIN AUREN
            </button>
          </form>
        )}

        <p className="text-[10px] tracking-wider text-[#8C8C8C]">
          BY SUBSCRIBING YOU AGREE WITH OUR PRIVACY POLICY. UNSUBSCRIBE ANYTIME.
        </p>
      </div>
    </section>
  );
}
