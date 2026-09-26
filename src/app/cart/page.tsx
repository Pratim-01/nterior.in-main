"use client";

import Link from "next/link";
import { calculateDiscountPercent } from "@/lib/pricing";
import toast from "react-hot-toast";
import { productPath } from "@/lib/product-slug";
import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Soft, static brand gradient: warm amber top-left, faint red top-right. */
const PAGE_BG =
  "radial-gradient(900px 420px at 0% 0%, rgba(255,170,0,0.16), transparent 65%), radial-gradient(800px 420px at 100% 0%, rgba(207,0,6,0.08), transparent 65%), linear-gradient(180deg, #fffaf2 0%, #ffffff 55%)";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Counts up to the value on load and re-animates when it changes. */
function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    const controls = animate(mv, value, {
      duration: reduce ? 0 : 0.6,
      ease: "easeOut",
    });
    return () => {
      unsub();
      controls.stop();
    };
  }, [value, mv, reduce]);

  return <>{formatPrice(display)}</>;
}

/* =========================================================
   CART ITEM IMAGE — takes the exact shape of the photo
   (portrait, landscape or square), scaled to fit a fixed
   square area. No background, no padding, no cropping.
   The shape is read once the image has loaded.
========================================================= */

function CartItemImage({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState<number | null>(null);

  // Covers images already loaded before React attached onLoad (cached / server-rendered).
  const setEl = useCallback((el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth && el.naturalHeight) {
      setRatio(el.naturalWidth / el.naturalHeight);
    }
  }, []);

  // Wide/square photos fill the width, tall photos fill the height; the other side follows the ratio.
  const fit: React.CSSProperties | undefined = ratio
    ? {
        aspectRatio: String(ratio),
        ...(ratio >= 1
          ? { width: "100%", height: "auto" }
          : { height: "100%", width: "auto" }),
      }
    : undefined;

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={setEl}
        src={src}
        alt={alt}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
        style={fit}
        className={`rounded-xl bg-white object-cover shadow-[0_2px_8px_rgba(24,34,53,0.12)] ring-1 ring-black/10 ${
          ratio ? "" : "invisible h-full w-full"
        }`}
      />
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyCart() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-24 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(207,0,6,0.12)] ring-1 ring-[#f3e3d3]">
        <ShoppingBag size={30} strokeWidth={1.75} className="text-[rgb(207,0,6)]" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#111827] sm:text-[26px]">
        Your cart is empty
      </h1>
      <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#4b5563]">
        Add products to your cart and they&apos;ll show up here.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(207,0,6,0.35)]"
      >
        <ArrowLeft size={15} />
        Browse products
      </Link>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + Math.min(i, 6) * 0.07, duration: 0.45, ease: EASE },
  }),
  exit: { opacity: 0, x: -32, transition: { duration: 0.2 } },
};

export default function CartPage() {
  const { items, totalItems, totalPrice, isHydrated, updateQuantity, removeItem, clearCart } =
    useCart();
  const [promoCode, setPromoCode] = useState("");

  const shell = "min-h-screen w-full pt-[108px]";
  const shellStyle = { background: PAGE_BG };

  if (!isHydrated) {
    return (
      <div className={shell} style={shellStyle}>
        <div className="mx-auto w-full max-w-[1100px] px-3 py-10 sm:px-4">
          <div className="h-8 w-40 animate-pulse rounded bg-[#f0e8dc]" />
          <div className="mt-6 h-32 w-full animate-pulse rounded-2xl border border-[#eee] bg-white/70" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={shell} style={shellStyle}>
        <EmptyCart />
      </div>
    );
  }

  const totalMrp = items.reduce(
    (sum, item) => sum + (item.mrp ?? item.price) * item.quantity,
    0
  );
  const totalSavings = totalMrp - totalPrice;

  function handleCheckout() {
    toast("Checkout isn't connected yet — we'll be in touch to confirm this order.", {
      icon: "🛒",
    });
  }

  function handleApplyPromo() {
    if (!promoCode.trim()) return;
    toast.error("That code isn't valid right now.");
  }

  return (
    <div className={shell} style={shellStyle}>
      <div className="mx-auto w-full max-w-[1200px] px-3 pb-16 pt-6 sm:px-4 sm:pt-7">
        {/* HEADER */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[rgb(207,0,6)] shadow-sm ring-1 ring-[#f3e3d3] sm:h-12 sm:w-12">
              <ShoppingBag size={20} strokeWidth={2} className="sm:h-[22px] sm:w-[22px]" />
            </div>
            <h1 className="text-[26px] font-extrabold tracking-tight text-[#111827] sm:text-[30px]">
              Your Cart
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b7280] transition-colors hover:text-[rgb(207,0,6)]"
          >
            <Trash2 size={13} />
            Clear cart
          </button>
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          {/* ITEMS */}
          <div className="flex w-full flex-1 flex-col gap-3.5">
            <AnimatePresence mode="popLayout" initial>
              {items.map((item, index) => {
                const hasMrp = item.mrp !== null && item.mrp > item.price;
                const discountPercent = hasMrp
                  ? calculateDiscountPercent(item.mrp as number, item.price)
                  : 0;

                return (
                  <motion.div
                    key={item.productId}
                    layout
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative flex gap-4 rounded-2xl border border-[#efe6da] bg-white p-4 shadow-[0_1px_3px_rgba(24,34,53,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(24,34,53,0.08)] sm:p-5"
                  >
                    <button
                      type="button"
                      aria-label={`Remove ${item.productName}`}
                      onClick={() => removeItem(item.productId)}
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-[#fdf1f1] hover:text-[rgb(207,0,6)]"
                    >
                      <Trash2 size={14} />
                    </button>

                    <Link href={productPath(item)} className="shrink-0">
                      <CartItemImage
                        key={item.imageUrl || PLACEHOLDER_IMAGE}
                        src={item.imageUrl || PLACEHOLDER_IMAGE}
                        alt={item.productName}
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      {item.subCategory && (
                        <span className="w-fit rounded-full bg-[#f7f4ef] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">
                          {item.subCategory}
                        </span>
                      )}

                      <Link
                        href={productPath(item)}
                        className="mt-1.5 line-clamp-2 pr-8 text-[16px] font-semibold leading-tight text-[#111827] hover:text-[rgb(207,0,6)] sm:text-[17px]"
                      >
                        {item.productName}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        <span className="text-[17px] font-bold text-[#111827] sm:text-[18px]">
                          {formatPrice(item.price)}
                        </span>
                        {hasMrp && (
                          <>
                            <span className="text-[13px] text-[#9ca3af] line-through">
                              {formatPrice(item.mrp as number)}
                            </span>
                            <span className="text-[13px] font-semibold text-[#047857]">
                              {discountPercent}% off
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-[#6b7280]">Qty</span>
                          <div className="flex items-center rounded-full border border-[#dedede] bg-white">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-l-full text-[#374151] transition-colors hover:bg-[#f7f7f7]"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="relative flex h-8 w-7 items-center justify-center overflow-hidden text-[13px] font-semibold text-[#111827]">
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-r-full text-[#374151] transition-colors hover:bg-[#f7f7f7]"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>

                        <span className="text-[15px] font-bold text-[#111827]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <Link
              href="/products"
              className="mt-2 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-[#374151] transition-colors hover:text-[rgb(207,0,6)]"
            >
              <ArrowLeft size={14} />
              Continue shopping
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="w-full shrink-0 lg:sticky lg:top-28 lg:w-[350px]">
            <div className="rounded-2xl border border-[#efe6da] bg-white p-5 shadow-[0_4px_20px_rgba(24,34,53,0.05)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#111827]">Order summary</h2>
                <span className="rounded-full bg-[#fff3df] px-3 py-1 text-[12.5px] font-semibold text-[#b45309]">
                  {totalItems} item{totalItems === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-[14px]">
                <div className="flex items-center justify-between text-[#4b5563]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111827]">
                    <AnimatedPrice value={totalMrp} />
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex items-center justify-between text-[#047857]">
                    <span>Discount</span>
                    <span className="font-medium">
                      -<AnimatedPrice value={totalSavings} />
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#eee] pt-3">
                <span className="text-[15px] font-bold text-[#111827]">Total</span>
                <span className="text-[22px] font-extrabold text-[#111827]">
                  <AnimatedPrice value={totalPrice} />
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af]">
                Delivery and any transport charges are calculated at checkout.
              </p>

              {/* PROMO CODE */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  aria-label="Promo code"
                  className="h-10 min-w-0 flex-1 rounded-full border border-[#dedede] bg-white px-4 text-[13px] text-[#111827] placeholder:text-[#9ca3af] focus:border-[rgb(255,170,0)] focus:outline-none focus:ring-2 focus:ring-[rgb(255,170,0)]/25"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="h-10 shrink-0 rounded-full border border-[#dedede] px-4 text-[13px] font-semibold text-[#374151] transition-colors hover:border-[#c7c7c7] hover:bg-[#fafafa]"
                >
                  Apply
                </button>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-5 h-12 w-full rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(207,0,6,0.35)]"
              >
                Proceed to checkout
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] text-[#9ca3af]">
                <Lock size={11} />
                Secure, encrypted checkout
              </p>
            </div>

            {/* TRUST STRIP */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-[#efe6da] rounded-2xl border border-[#efe6da] bg-white">
              {[
                { icon: Truck, label: "Fast dispatch" },
                { icon: ShieldCheck, label: "Secure payments" },
                { icon: BadgeCheck, label: "Genuine products" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 px-2 py-3.5 text-center"
                >
                  <Icon size={15} strokeWidth={1.75} className="shrink-0 text-[rgb(207,0,6)]" />
                  <span className="text-[10px] font-medium leading-tight text-[#4b5563]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}