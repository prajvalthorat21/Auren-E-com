"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductColor, GarmentSize } from "@/lib/types";
import { PRODUCTS } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedColor: ProductColor, selectedSize: GarmentSize, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isFreeShipping: boolean;
  remainingForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "auren_cart_items";
const FREE_SHIPPING_THRESHOLD = 75;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        // Sync item prices with canonical USD product pricing
        const synced = parsed.map((item) => {
          const canonical = PRODUCTS.find((p) => p.id === item.productId);
          if (canonical) {
            return {
              ...item,
              price: canonical.price,
              product: canonical,
            };
          }
          return item;
        });
        setItems(synced);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart to localStorage", e);
    }
  }, [items, isLoaded]);

  const addItem = (
    product: Product,
    selectedColor: ProductColor,
    selectedSize: GarmentSize,
    quantity = 1
  ) => {
    const compositeId = `${product.id}-${selectedColor.name}-${selectedSize}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: compositeId,
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
          price: product.price,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        isFreeShipping,
        remainingForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
