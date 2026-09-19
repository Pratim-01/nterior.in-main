"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import type { ProductDetail as ProductDetailType, Product } from "@/types/products";
import { categoryToSlug } from "@/lib/category-slug";
import { useCart } from "@/lib/cart-context";
import Breadcrumb from "../listing/Breadcrumb";

interface ProductDetailData {
  product: ProductDetailType;
  relatedProducts: Product[];
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/* =========================================================
   DECORATIVE BACKGROUND — soft brand-gradient blobs used
   behind the page. Purely visual, pointer-events disabled.
========================================================= */

function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[rgba(255,170,0,0.16)] to-[rgba(207,0,6,0.10)] blur-3xl" />
      <div className="absolute top-[38%] -left-28 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-[rgba(255,170,0,0.10)] to-[rgba(207,0,6,0.08)] blur-3xl" />
      <div className="absolute bottom-[-10%] right-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[rgba(255,170,0,0.10)] to-transparent blur-3xl" />
    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function ProductDetailSkeleton() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <AmbientBackground />
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        <div className="mb-7 h-4 w-64 animate-pulse rounded-full bg-gradient-to-r from-[#f0f0f0] to-[#f7f7f7]" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-[4/3] w-full animate-pulse rounded-2xl border border-[#f0ece2] bg-gradient-to-br from-[#fff9ef] to-[#f7f7f7] lg:aspect-auto lg:h-[560px]" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 animate-pulse rounded-full bg-[#f0f0f0]" />
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-[#f0f0f0]" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#f0f0f0]" />
            <div className="h-10 w-40 animate-pulse rounded-lg bg-[#f0f0f0]" />
            <div className="h-12 w-full animate-pulse rounded-full bg-gradient-to-r from-[#ffe9c2] to-[#f7c9ca]" />
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   NOT FOUND / ERROR
========================================================= */

function ProductDetailError({ message }: { message: string }) {
  const router = useRouter();
  return (
    <main className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-white px-4">
      <AmbientBackground />
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(255,170,0)] to-[rgb(207,0,6)] shadow-[0_8px_24px_rgba(207,0,6,0.25)]">
          <ImageIcon size={26} strokeWidth={1.75} className="text-white" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#111827] sm:text-[26px]">
          We couldn&apos;t find this product
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#4b5563]">
          {message}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(207,0,6,0.35)]"
          >
            Browse products
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dedede] bg-white px-6 text-sm font-semibold text-[#374151] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c7c7c7] hover:bg-[#fafafa]"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   GALLERY — vertical thumbnail rail (desktop) + main image.
   Always shows 4 thumbnail slots; real images fill the first
   slots, any remaining slots are plain placeholder boxes.
========================================================= */

const THUMBNAIL_SLOTS = 4;

function Gallery({ product }: { product: ProductDetailType }) {
  const images = product.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const thumbRailRef = useRef<HTMLDivElement>(null);

  const active = images[activeIndex];
  const mainSrc = images.length > 0 && !imageFailed ? active?.url : PLACEHOLDER_IMAGE;
  const mainAlt = active?.altText || product.productName;

  const slots = Array.from({ length: Math.max(THUMBNAIL_SLOTS, images.length) });

  function scrollThumbs(direction: -1 | 1) {
    thumbRailRef.current?.scrollBy({ left: direction * 100, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-4">
      {/* THUMBNAILS */}
      <div className="order-2 flex items-center gap-2 lg:order-1 lg:w-[92px] lg:shrink-0 lg:flex-col lg:items-stretch">
        {/* Prev/next arrows only make sense as a horizontal scroller — hidden once the
            rail becomes a vertical column on desktop. */}
        {images.length > THUMBNAIL_SLOTS && (
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => scrollThumbs(-1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#374151] transition-colors hover:bg-[#e5e5e5] lg:hidden"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div
          ref={thumbRailRef}
          className="flex flex-1 gap-2.5 overflow-x-auto scroll-smooth lg:flex-none lg:flex-col lg:overflow-visible"
        >
          {slots.map((_, i) => {
            const img = images[i];
            if (img) {
              const isActive = i === activeIndex;
              return (
                <button
                  key={img.url + i}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setImageFailed(false);
                  }}
                  aria-label={`View image ${i + 1}`}
                  className={`relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[10px] bg-white transition-all duration-300 lg:h-[88px] lg:w-[88px] ${
                    isActive
                      ? "shadow-[0_4px_14px_rgba(207,0,6,0.25)] ring-2 ring-[rgb(207,0,6)] ring-offset-2"
                      : "border-2 border-[#dedede] hover:-translate-y-0.5 hover:border-[rgb(255,170,0)] hover:shadow-md"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.altText}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            }
            // Placeholder slot — no real image at this position yet.
            return (
              <div
                key={`placeholder-${i}`}
                aria-hidden="true"
                className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[10px] border-2 border-dashed border-[#e2e2e2] bg-[#fafafa] lg:h-[88px] lg:w-[88px]"
              >
                <ImageIcon size={20} strokeWidth={1.5} className="text-[#c7c7c7]" />
              </div>
            );
          })}
        </div>

        {images.length > THUMBNAIL_SLOTS && (
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => scrollThumbs(1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#374151] transition-colors hover:bg-[#e5e5e5] lg:hidden"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* MAIN IMAGE */}
      <div className="order-1 flex-1 lg:order-2">
        <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#f0ece2] bg-gradient-to-br from-[#fffaf0] to-[#f7f7f7] shadow-[0_8px_30px_rgba(24,34,53,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(24,34,53,0.12)] lg:aspect-auto lg:h-[70vh] lg:max-h-[560px] lg:min-h-[380px]">
          {/* subtle decorative corner glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[rgba(255,170,0,0.14)] to-[rgba(207,0,6,0.08)] blur-2xl" />

          <AnimatePresence mode="wait">
            <motion.img
              key={mainSrc}
              src={mainSrc || PLACEHOLDER_IMAGE}
              alt={mainAlt}
              onError={() => setImageFailed(true)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative h-full w-full object-contain"
            />
          </AnimatePresence>
        </div>
        <p className="mt-2.5 text-[12px] italic text-[#9ca3af]">*{product.productName}</p>
      </div>
    </div>
  );
}

/* =========================================================
   RELATED PRODUCT CARD — badge + image + price. The whole
   card is a link to that product; no add-to-cart or wishlist
   here, purely a "browse more" card.
========================================================= */

function RelatedProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasMrp = product.mrp !== null && product.mrp > product.price;
  const discountPercent = hasMrp
    ? Math.round((((product.mrp as number) - product.price) / (product.mrp as number)) * 100)
    : 0;

  const isNew =
    Boolean(product.createdAt) &&
    Date.now() - new Date(product.createdAt as string).getTime() < 1000 * 60 * 60 * 24 * 30;

  return (
    <Link href={`/products/${product.productId}`} className="group block no-underline">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_4px_16px_rgba(24,34,53,0.06)] transition-shadow duration-300 group-hover:shadow-[0_16px_32px_rgba(24,34,53,0.14)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={!imageFailed && product.imageUrl ? product.imageUrl : PLACEHOLDER_IMAGE}
          alt={product.imageAltText || product.productName}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />

        {/* DISCOUNT / NEW TAG */}
        {discountPercent > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-[rgb(207,0,6)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
            -{discountPercent}%
          </span>
        ) : isNew ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#12805c] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
            NEW
          </span>
        ) : null}

        {/* HOVER SCRIM */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* QUICK VIEW */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-900 shadow-md">
            View Product
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-[13px] font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-[rgb(207,0,6)] sm:text-sm">
          {product.productName}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-gray-900 sm:text-base">
            {formatPrice(product.price)}
          </span>
          {hasMrp && (
            <span className="text-[11px] text-gray-400 line-through sm:text-xs">
              {formatPrice(product.mrp as number)}
            </span>
          )}
        </div>

        {/* ANIMATED UNDERLINE */}
        <span className="mt-2 block h-[2px] w-0 bg-[rgb(255,170,0)] transition-all duration-500 ease-out group-hover:w-full" />
      </div>
    </Link>
  );
}

/* =========================================================
   RELATED PRODUCTS SECTION — a single horizontally-scrolling
   row of compact cards at every breakpoint, with left/right
   arrow buttons for pointer users and native swipe on touch.
========================================================= */

function RelatedProductsSection({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateArrowState() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrowState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  function scrollByCards(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-2 text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fff4df] to-[#fff9ef] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[rgb(207,0,6)]">
            <Sparkles size={12} />
            You might also like
          </span>
          <h2 className="text-[20px] font-bold text-[#111827] sm:text-[22px]">
            Related Products
          </h2>
          <div className="h-1 w-14 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)]" />
        </div>

        {products.length > 1 && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Scroll related products left"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-300 hover:border-[rgb(255,170,0)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Scroll related products right"
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-300 hover:border-[rgb(255,170,0)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Single row at every breakpoint — compact cards, native swipe + arrow buttons */}
      <div
        ref={scrollerRef}
        onScroll={updateArrowState}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.productId}
            className="w-[150px] shrink-0 snap-start sm:w-[180px] lg:w-[200px]"
          >
            <RelatedProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   TRUST BADGES — small strip reinforcing purchase confidence,
   styled after the gradient icon-circle pattern used on the
   products landing page (Hero's delivery strip).
========================================================= */

function TrustBadges() {
  const badges = [
    { icon: Truck, label: "Fast dispatch" },
    { icon: ShieldCheck, label: "Secure checkout" },
    { icon: RotateCcw, label: "Easy replacement" },
  ];

  return (
    <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-orange-100 bg-gradient-to-r from-[#fff9ef] to-white p-3 sm:gap-3 sm:p-3.5">
      {badges.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-sm">
            <Icon size={13} strokeWidth={2.25} />
          </span>
          <span className="text-[10.5px] font-semibold leading-tight text-[#374151] sm:text-[11.5px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function ProductDetail({ productId }: { productId: number }) {
  const [data, setData] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specification">("description");

  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setNotFound(false);

    fetch(`/api/products/${productId}`, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setNotFound(true);
          return null;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to load this product.");
        }
        return (await res.json()) as ProductDetailData;
      })
      .then((json) => {
        if (!cancelled && json) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  // Reset quantity + tab whenever a different product loads.
  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
  }, [data?.product.productId]);

  if (isLoading && !data) return <ProductDetailSkeleton />;
  if (notFound) {
    return (
      <ProductDetailError message="This product may have been removed or is no longer available." />
    );
  }
  if (error || !data) {
    return <ProductDetailError message={error ?? "Something went wrong."} />;
  }

  const { product, relatedProducts } = data;
  const hasMrp = product.mrp !== null && product.mrp > product.price;
  const discountPercent = hasMrp
    ? Math.round((((product.mrp as number) - product.price) / (product.mrp as number)) * 100)
    : 0;

  const unitSuffix = product.productType === "sqft" ? " / sq.ft." : "";
  const quantityLabel = product.productType === "sqft" ? "sq.ft." : "Qty";

  const availabilityText = product.showroomStock
    ? `Available in showroom${
        product.showroomStockNumber ? ` · ${product.showroomStockNumber}` : ""
      }`
    : "In stock, ready to ship";

  const featureBullets: string[] = (() => {
    const fromAttributes = Object.entries(product.attributes ?? {})
      .filter(([, value]) => value !== null && value !== "")
      .slice(0, 5)
      .map(([key, value]) => `${key}: ${String(value)}`);
    if (fromAttributes.length > 0) return fromAttributes;

    if (product.shortDescription) {
      return product.shortDescription
        .split(/[.;]\s*/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4);
    }
    return [];
  })();

  const specChips = [
    { label: "Size", value: product.size },
    { label: "Thickness", value: product.thickness },
    { label: "Grade", value: product.grade },
  ].filter((c) => c.value);

  const specRows: { label: string; value: string }[] = [
    { label: "Brand", value: product.brand ?? "" },
    { label: "Category", value: product.category },
    { label: "Sub-category", value: product.subCategory ?? "" },
    { label: "Size", value: product.size ?? "" },
    { label: "Thickness", value: product.thickness ?? "" },
    { label: "Grade", value: product.grade ?? "" },
    {
      label: "Sold as",
      value: product.productType === "sqft" ? "Per square foot" : "Per unit",
    },
    ...Object.entries(product.attributes ?? {})
      .filter(([, value]) => value !== null && value !== "")
      .map(([key, value]) => ({ label: key, value: String(value) })),
  ].filter((row) => row.value);

  const categorySlug = categoryToSlug(product.category);

  function handleAddToCart(andBuyNow: boolean) {
    addItem(product, quantity);
    if (andBuyNow) {
      router.push("/cart");
      return;
    }
    toast.success(`Added ${quantity} × ${product.productName} to cart`, {
      icon: <ShoppingCart size={16} />,
    });
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <AmbientBackground />
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        {/* BREADCRUMB */}
        <div className="mb-7">
          <Breadcrumb
            items={[
              { label: "Home", href: "/products" },
              { label: product.category, href: `/products/${categorySlug}` },
              ...(product.subCategory && product.subCategory !== product.category
                ? [{ label: product.subCategory }]
                : []),
              { label: product.productName },
            ]}
          />
        </div>

        {/* GALLERY + BUY BOX */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Gallery product={product} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* META LINES */}
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              {product.brand && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f7f7] px-2.5 py-1 text-[#4b5563]">
                  <span className="font-semibold text-[#111827]">Brand:</span> {product.brand}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f7f7] px-2.5 py-1 text-[#4b5563]">
                <span className="font-semibold text-[#111827]">Category:</span> {product.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#e9f9f0] to-[#f0fdf6] px-2.5 py-1 font-medium text-[#12805c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12805c]" />
                {availabilityText}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <div className="mt-1 h-auto w-1 shrink-0 rounded-full bg-gradient-to-b from-[rgb(255,170,0)] to-[rgb(207,0,6)]" />
              <h1 className="text-[22px] font-bold uppercase leading-tight tracking-tight text-[#111827] sm:text-[25px] lg:text-[27px]">
                {product.productName}
              </h1>
            </div>

            {/* FEATURE BULLETS */}
            {featureBullets.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2 text-[13px] leading-relaxed text-[#4b5563] sm:text-[14px]">
                {featureBullets.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <BadgeCheck
                      size={15}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[rgb(207,0,6)]"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* SPEC CHIPS */}
            {specChips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[#eee] pt-5">
                {specChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="relative overflow-hidden rounded-xl border border-[#eee] bg-gradient-to-b from-white to-[#fafafa] px-4 py-2 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,170,0,0.5)] hover:shadow-md"
                  >
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)]" />
                    <div className="text-[10px] uppercase tracking-wide text-[#9ca3af]">
                      {chip.label}
                    </div>
                    <div className="text-[13px] font-semibold text-[#111827]">{chip.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className={`mt-5 pt-5 ${specChips.length > 0 ? "" : "border-t border-[#eee]"}`}>
              <p className="m-0 text-[12px] font-medium uppercase tracking-wide text-[#9ca3af]">
                INR {product.gstExclude ? "(+ GST extra)" : "(incl. of GST)"}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-2.5">
                <span className="bg-gradient-to-r from-[#111827] to-[#374151] bg-clip-text text-[28px] font-bold leading-none text-transparent sm:text-[32px]">
                  {formatPrice(product.price)}
                </span>
                {unitSuffix && (
                  <span className="text-[13px] font-medium text-[#6b7280]">
                    {unitSuffix.trim()}
                  </span>
                )}
                {hasMrp && (
                  <span className="text-[15px] leading-none text-[#9ca3af] line-through">
                    {formatPrice(product.mrp as number)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* QUANTITY + ACTIONS */}
            <div className="mt-6 flex items-center gap-2 sm:gap-3 lg:flex-wrap lg:gap-4">
              <div className="flex shrink-0 items-center rounded-full border border-[#dedede] bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-9 items-center justify-center rounded-l-full text-[#374151] transition-colors hover:bg-[#f7f7f7] lg:w-11"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-[14px] font-semibold text-[#111827] lg:w-10">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(999, q + 1))}
                  className="flex h-12 w-9 items-center justify-center rounded-r-full text-[#374151] transition-colors hover:bg-[#f7f7f7] lg:w-11"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="h-12 min-w-0 flex-1 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-3 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(207,0,6,0.35)] sm:text-[15px] lg:flex-none lg:px-8"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="flex h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-[rgb(207,0,6)] bg-white px-3 text-[14px] font-semibold text-[rgb(207,0,6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[rgb(255,170,0)] hover:to-[rgb(207,0,6)] hover:text-white hover:shadow-[0_8px_20px_rgba(207,0,6,0.25)] sm:gap-2 sm:text-[15px] lg:flex-none lg:px-6"
              >
                Add to Cart
              </button>
            </div>

            <TrustBadges />
          </motion.div>
        </div>

        {/* DESCRIPTION / SPECIFICATION TABS */}
        <div className="mx-auto mt-14 max-w-[820px]">
          <div className="relative flex justify-center gap-8 border-b border-[#eee]">
            {(
              [
                { key: "description", label: "Description" },
                { key: "specification", label: "Specification" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative -mb-px pb-3 text-[15px] font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#111827]"
                    : "text-[#9ca3af] hover:text-[#4b5563]"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="productTabIndicator"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pt-6"
            >
              {activeTab === "description" ? (
                <div className="whitespace-pre-line text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
                  {product.aboutProduct ||
                    product.shortDescription ||
                    "No additional details available for this product yet."}
                </div>
              ) : specRows.length > 0 ? (
                <dl className="relative overflow-hidden rounded-2xl border border-[#eee] shadow-sm">
                  <div className="h-[3px] bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)]" />
                  <div className="divide-y divide-[#eee]">
                    {specRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-4 px-4 py-2.5 text-[13px] transition-colors hover:bg-[#fdf9f2]"
                      >
                        <dt className="text-[#6b7280]">{row.label}</dt>
                        <dd className="text-right font-medium text-[#111827]">{row.value}</dd>
                      </div>
                    ))}
                  </div>
                </dl>
              ) : (
                <p className="text-[14px] text-[#9ca3af]">No specifications listed yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && <RelatedProductsSection products={relatedProducts} />}
      </div>
    </main>
  );
}
