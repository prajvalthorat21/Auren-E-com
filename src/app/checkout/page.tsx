"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, isFreeShipping, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: "alex.morgan@example.com",
    phone: "+91 98765 43210",
    firstName: "Alex",
    lastName: "Morgan",
    address: "102 Indiranagar 100ft Road",
    apartment: "Apt 4B",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingCost = isFreeShipping ? 0 : shippingMethod === "express" ? 150 : 99;
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AUREN10" || promoCode.trim().toUpperCase() === "FIRST10") {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNo = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNo);
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F8F5EF] text-[#0D0D0D]">
        <div className="max-w-lg w-full bg-[#F1ECE3] border border-[#E5DDD2] p-8 sm:p-12 text-center space-y-6 shadow-xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#0D0D0D] text-[#F8F5EF] flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8C8C] font-semibold">
              ORDER CONFIRMED
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl tracking-tight">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs text-[#555555]">
              Order confirmation <span className="font-bold text-[#0D0D0D]">#{orderNumber}</span> has been dispatched to your email.
            </p>
          </div>

          <div className="p-4 bg-[#F8F5EF] border border-[#E5DDD2] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#555555]">Estimated Delivery:</span>
              <span className="font-semibold text-[#0D0D0D]">2-4 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555555]">Delivery Address:</span>
              <span className="font-semibold text-[#0D0D0D] text-right truncate max-w-[220px]">
                {formData.address}, {formData.city} - {formData.pincode}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-block w-full py-4 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors text-center"
            >
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 bg-[#F8F5EF] text-[#0D0D0D] text-center space-y-4">
        <h1 className="font-editorial text-3xl tracking-tight">YOUR BAG IS EMPTY</h1>
        <p className="text-xs text-[#555555]">
          Add pieces from our collection before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-2 px-8 py-3.5 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#333333] transition-colors"
        >
          EXPLORE SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 sm:py-16 bg-[#F8F5EF] text-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#555555] tracking-wider uppercase">
          <Link href="/shop" className="hover:text-[#0D0D0D] flex items-center gap-1">
            <ArrowLeft size={14} />
            <span>CONTINUE SHOPPING</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Checkout Forms */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#E5DDD2]">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D]">
                    1. CONTACT INFORMATION
                  </h2>
                  <span className="text-[10px] text-[#8C8C8C] flex items-center gap-1">
                    <Lock size={12} /> SECURE ENCRYPTED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      MOBILE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-[#E5DDD2]">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D]">
                    2. SHIPPING ADDRESS
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                    STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House number and street name"
                    className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bengaluru"
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      STATE *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium tracking-wider uppercase text-[#555555] mb-1">
                      PIN CODE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="560038"
                      className="w-full px-4 py-3 bg-[#F1ECE3] border border-[#E5DDD2] text-xs tracking-wider focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-[#E5DDD2]">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D]">
                    3. DELIVERY OPTION
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-4 bg-[#F1ECE3] border border-[#E5DDD2] cursor-pointer hover:border-[#0D0D0D] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="accent-[#0D0D0D]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase">Standard Express (2-4 Days)</p>
                        <p className="text-[11px] text-[#555555]">Complimentary on orders above ₹999</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold">
                      {isFreeShipping ? "FREE" : "₹99"}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[#F1ECE3] border border-[#E5DDD2] cursor-pointer hover:border-[#0D0D0D] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="accent-[#0D0D0D]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase">Next Day Priority Air</p>
                        <p className="text-[11px] text-[#555555]">Dispatched within 6 hours</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold">₹150</span>
                  </label>
                </div>
              </div>

              {/* Payment Method (Frontend Mock Experience) */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-[#E5DDD2]">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D]">
                    4. PAYMENT METHOD
                  </h2>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-4 bg-[#F1ECE3] border border-[#E5DDD2] cursor-pointer hover:border-[#0D0D0D] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-[#0D0D0D]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase">UPI Instant (GPay / PhonePe / Paytm / QR)</p>
                        <p className="text-[11px] text-[#555555]">Instant zero-fee checkout</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[#F1ECE3] border border-[#E5DDD2] cursor-pointer hover:border-[#0D0D0D] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="accent-[#0D0D0D]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase">Credit / Debit Cards (Visa, Mastercard, Amex)</p>
                        <p className="text-[11px] text-[#555555]">Encrypted tokenized transaction</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[#F1ECE3] border border-[#E5DDD2] cursor-pointer hover:border-[#0D0D0D] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-[#0D0D0D]"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase">Cash On Delivery (COD)</p>
                        <p className="text-[11px] text-[#555555]">Pay upon doorstep arrival</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#0D0D0D] text-[#F8F5EF] text-xs font-semibold tracking-[0.25em] uppercase hover:bg-[#333333] transition-colors shadow-lg cursor-pointer"
              >
                CONFIRM ORDER • {formatPrice(grandTotal)}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#F1ECE3] border border-[#E5DDD2] p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-editorial text-xl tracking-wide pb-3 border-b border-[#E5DDD2]">
              ORDER SUMMARY ({items.length})
            </h2>

            {/* Item Previews */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-[#E5DDD2]">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-4 items-center">
                  <div className="relative w-16 h-20 flex-shrink-0 bg-[#F8F5EF] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                    <span className="absolute top-0 right-0 bg-[#0D0D0D] text-[#F8F5EF] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h3 className="text-xs font-medium text-[#0D0D0D] line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-[11px] text-[#555555] uppercase tracking-wider">
                      {item.selectedColor.name} • {item.selectedSize}
                    </p>
                    <p className="text-xs font-semibold text-[#0D0D0D]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2 border-t border-[#E5DDD2]">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (e.g. AUREN10)"
                className="flex-1 px-3 py-2 bg-[#F8F5EF] border border-[#E5DDD2] text-xs uppercase tracking-wider focus:outline-none focus:border-[#0D0D0D]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#0D0D0D] text-[#F8F5EF] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#333333] transition-colors"
              >
                APPLY
              </button>
            </form>
            {promoApplied && (
              <p className="text-[11px] text-green-700 font-medium tracking-wide">
                ✓ Promo code AUREN10 applied (10% off)
              </p>
            )}

            {/* Financial Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#E5DDD2] text-xs">
              <div className="flex justify-between text-[#555555]">
                <span>Subtotal</span>
                <span className="text-[#0D0D0D] font-medium">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Special Drop Discount</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#555555]">
                <span>Express Shipping</span>
                <span className="text-[#0D0D0D] font-medium">
                  {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Taxes (GST Included)</span>
                <span className="text-[#0D0D0D] font-medium">₹0</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#0D0D0D] pt-3 border-t border-[#E5DDD2]">
                <span>TOTAL</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#8C8C8C] tracking-wider uppercase pt-2">
              <ShieldCheck size={14} />
              <span>AUREN 100% SATISFACTION GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
