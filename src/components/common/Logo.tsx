import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "wordmark" | "monogram";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({
  className,
  variant = "wordmark",
  theme = "dark",
  size = "md",
}: LogoProps) {
  const textColor = theme === "light" ? "text-[#F8F5EF]" : "text-[#0D0D0D]";

  if (variant === "monogram") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center justify-center font-editorial font-bold tracking-tighter transition-opacity hover:opacity-80",
          textColor,
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl",
          size === "xl" && "text-3xl",
          className
        )}
        aria-label="AUREN Home"
      >
        <span className="border-b border-current pb-0.5">A</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center tracking-[0.25em] font-semibold transition-all duration-300 hover:opacity-80 select-none",
        textColor,
        size === "sm" && "text-sm tracking-[0.2em]",
        size === "md" && "text-xl md:text-2xl tracking-[0.28em]",
        size === "lg" && "text-2xl md:text-3xl tracking-[0.32em]",
        size === "xl" && "text-4xl md:text-5xl tracking-[0.35em]",
        className
      )}
      aria-label="AUREN"
    >
      <span className="font-editorial uppercase">AUREN</span>
    </Link>
  );
}
