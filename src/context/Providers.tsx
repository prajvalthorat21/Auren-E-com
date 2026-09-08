"use client";

import React from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { UIProvider } from "./UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </UIProvider>
  );
}
