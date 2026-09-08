import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "trending" | "sale" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-medium tracking-widest rounded-none select-none transition-colors",
        variant === "new" && "bg-[#0D0D0D] text-[#F8F5EF]",
        variant === "trending" && "bg-[#E5DDD2] text-[#0D0D0D] border border-[#C9B8A7]",
        variant === "sale" && "bg-[#333333] text-[#F8F5EF]",
        variant === "neutral" && "bg-[#F1ECE3] text-[#555555]",
        className
      )}
    >
      {children}
    </span>
  );
}
