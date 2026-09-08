import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-20 px-4 bg-[#F8F5EF] text-[#0D0D0D]">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C] font-semibold">
          PAGE NOT LOCATED
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl tracking-tight">
          404 — SILHOUETTE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
          The piece or editorial story you are looking for does not exist or has been relocated to our seasonal archive.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors"
          >
            <span>RETURN TO SHOP</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
