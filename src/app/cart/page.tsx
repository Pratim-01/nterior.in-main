"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function EmptyCart() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[#e2e2e2] bg-[#fafafa]">
        <ShoppingBag size={30} strokeWidth={1.75} className="text-[#9ca3af]" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#111827] sm:text-[26px]">
        Your cart is empty
      </h1>
      <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#4b5563]">
        Add products to your cart and they&apos;ll show up here.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[rgb(170,0,5)]"
      >
        <ArrowLeft size={15} />
        Browse products
      </Link>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice, isHydrated, updateQuantity, removeItem, clearCart } =
    useCart();

  if (!isHydrated) {
    return (
      <main className="min-h-screen w-full bg-white pt-[108px]">
        <div className="mx-auto w-full max-w-[1000px] px-5 py-10 sm:px-7">
          <div className="h-8 w-40 animate-pulse rounded bg-[#f0f0f0]" />
          <div className="mt-6 h-32 w-full animate-pulse rounded-[10px] border border-[#eee] bg-[#f7f7f7]" />
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen w-full bg-white pt-[108px]">
        <EmptyCart />
      </main>
    );
  }

  function handleCheckout() {
    toast(
      "Checkout isn't connected yet — we'll be in touch to confirm this order.",
      { icon: "🛒" }
    );
  }

  return (
    <main className="min-h-screen w-full bg-white pt-[108px]">
      <div className="mx-auto w-full max-w-[1100px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-medium leading-tight text-[#111] sm:text-[26px]">
              Your cart
            </h1>
            <p className="mt-1 text-[14px] leading-5 text-[#777]">
              {totalItems} item{totalItems === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-[13px] font-medium text-[#777] transition-colors hover:text-[rgb(207,0,6)]"
          >
            Clear cart
          </button>
        </div>

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          {/* ITEMS */}
          <div className="w-full flex-1 divide-y divide-[#eee] rounded-[10px] border border-[#eee]">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 sm:p-5">
                <Link
                  href={`/products/${item.productId}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[8px] border border-[#eee] bg-[#f7f7f7] sm:h-24 sm:w-24"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || PLACEHOLDER_IMAGE}
                    alt={item.productName}
                    className="h-full w-full object-contain p-1.5"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  {item.brand && (
                    <p className="m-0 text-[10px] font-bold uppercase tracking-[0.08em] text-[rgb(207,0,6)]">
                      {item.brand}
                    </p>
                  )}
                  <Link
                    href={`/products/${item.productId}`}
                    className="mt-0.5 line-clamp-2 text-[14px] font-semibold leading-tight text-[#111827] hover:text-[rgb(207,0,6)] sm:text-[15px]"
                  >
                    {item.productName}
                  </Link>
                  {item.specLine && (
                    <p className="mt-0.5 text-[12px] text-[#777]">{item.specLine}</p>
                  )}

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center rounded-lg border border-[#dedede]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center text-[#374151] transition-colors hover:bg-[#f7f7f7]"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-[13px] font-semibold text-[#111827]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center text-[#374151] transition-colors hover:bg-[#f7f7f7]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[#111827] sm:text-[15px]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${item.productName}`}
                        onClick={() => removeItem(item.productId)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-[#fdf1f1] hover:text-[rgb(207,0,6)]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="w-full shrink-0 rounded-[10px] border border-[#eee] p-5 lg:w-[320px]">
            <h2 className="text-[15px] font-semibold text-[#111827]">Order summary</h2>
            <div className="mt-4 flex items-center justify-between text-[14px] text-[#4b5563]">
              <span>Subtotal</span>
              <span className="font-medium text-[#111827]">{formatPrice(totalPrice)}</span>
            </div>
            <p className="mt-1.5 text-[12px] text-[#9ca3af]">
              GST, delivery, and any transport charges are calculated at checkout.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 h-12 w-full rounded-lg bg-[rgb(207,0,6)] text-[15px] font-semibold text-white transition-colors hover:bg-[rgb(170,0,5)]"
            >
              Proceed to checkout
            </button>
            <Link
              href="/products"
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#dedede] text-[14px] font-medium text-[#374151] transition-colors hover:border-[#c7c7c7] hover:bg-[#fafafa]"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
