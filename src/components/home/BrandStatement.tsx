import React from "react";

export function BrandStatement() {
  return (
    <section className="w-full py-24 sm:py-32 bg-[#F8F5EF] text-center border-t border-[#E5DDD2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#8C8C8C]">
          OUR PHILOSOPHY
        </span>

        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#0D0D0D] leading-tight">
          CLOTHES FOR <br />
          YOUR EVERYDAY.
        </h2>

        <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl mx-auto font-light pt-2">
          AUREN creates modern essentials designed to move with you — considered silhouettes, understated details and pieces made to stay in rotation.
        </p>

        <div className="pt-4 flex items-center justify-center gap-8 text-[11px] tracking-[0.2em] uppercase text-[#8C8C8C]">
          <span>UNCOMPROMISING FABRICS</span>
          <span>•</span>
          <span>UNISEX PROPORTIONS</span>
          <span>•</span>
          <span>TIMELESS FORM</span>
        </div>
      </div>
    </section>
  );
}
