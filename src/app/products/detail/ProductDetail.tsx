"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import type { ProductDetail as ProductDetailType, Product } from "@/types/products";
import { categoryToSlug } from "@/lib/category-slug";
import { useCart } from "@/lib/cart-context";
import { productPath } from "@/lib/product-slug";
import Breadcrumb from "../listing/Breadcrumb";

interface ProductDetailData {
  product: ProductDetailType;
  relatedProducts: Product[];
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto w-full max-w-[1840px] px-5 sm:px-7 lg:px-9 xl:px-10";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className={`${CONTAINER} pb-16 pt-6 sm:pt-7`}>
        <div className="mb-7 h-4 w-64 animate-pulse rounded-full bg-[#f3ece0]" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="h-[420px] animate-pulse rounded-[32px] bg-[#fff1dc] lg:h-[600px]" />
          <div className="flex flex-col gap-4 pt-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-[#f3ece0]" />
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-[#f3ece0]" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#f3ece0]" />
            <div className="mt-4 h-12 w-44 animate-pulse rounded-lg bg-[#f3ece0]" />
            <div className="mt-4 h-14 w-full animate-pulse rounded-full bg-[#f8dfbf]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOT FOUND / ERROR
========================================================= */

function ProductDetailError({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1dc]">
          <ImageIcon size={26} strokeWidth={1.75} className="text-[rgb(207,0,6)]" />
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Browse products
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dedede] bg-white px-6 text-sm font-semibold text-[#374151] transition-all duration-300 hover:bg-[#fafafa]"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY — the main image is shown as a rounded card that
   takes the exact shape of the photo (portrait, landscape or
   square) and is scaled to fit the available space. Nothing
   is cropped, there is no tinted or blurred background, and
   light photos stay defined thanks to a thin border + shadow.
   A thumbnail row sits underneath (at least 4 slots).
========================================================= */

const THUMBNAIL_SLOTS = 4;

function Gallery({ product }: { product: ProductDetailType }) {
  const images = product.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [box, setBox] = useState({ w: 0, h: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  const active = images[activeIndex];
  const mainSrc =
    (images.length > 0 && !imageFailed ? active?.url : undefined) || PLACEHOLDER_IMAGE;
  const mainAlt = active?.altText || product.productName;

  const slots = Array.from({ length: Math.max(THUMBNAIL_SLOTS, images.length) });

  // Measure the space available for the main image.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Remember each photo's shape once it has loaded.
  const recordRatio = useCallback((src: string, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const r = img.naturalWidth / img.naturalHeight;
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: r }));
  }, []);

  // Covers images that finished loading before React attached onLoad (cached / server-rendered).
  const setImageEl = useCallback(
    (el: HTMLImageElement | null) => {
      if (el && el.complete) recordRatio(mainSrc, el);
    },
    [mainSrc, recordRatio]
  );

  // Fit the photo's shape inside the available box (scale up or down, never crop).
  const ratio = ratios[mainSrc];
  let fitW: number | string = "100%";
  let fitH: number | string = "100%";
  if (ratio && box.w > 0 && box.h > 0) {
    if (box.w / box.h > ratio) {
      fitH = box.h;
      fitW = box.h * ratio;
    } else {
      fitW = box.w;
      fitH = box.w / ratio;
    }
  }

  return (
    <div className="flex flex-col lg:h-full lg:min-h-0">
      {/* MAIN IMAGE */}
      <div
        ref={boxRef}
        className="relative flex h-[380px] items-center justify-center sm:h-[500px] lg:h-auto lg:min-h-0 lg:flex-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mainSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ width: fitW, height: fitH }}
            className={`relative overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(24,34,53,0.14)] ring-1 ring-black/10 ${
              ratio ? "" : "invisible"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={setImageEl}
              src={mainSrc}
              alt={mainAlt}
              onLoad={(e) => recordRatio(mainSrc, e.currentTarget)}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
            {images.length > 1 && (
              <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-[#374151] shadow-sm ring-1 ring-black/5">
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-3 flex shrink-0 gap-3 overflow-x-auto p-1 [&::-webkit-scrollbar]:hidden">
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
                className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-white transition-all duration-300 sm:h-[72px] sm:w-[72px] lg:h-[60px] lg:w-[60px] ${
                  isActive
                    ? "ring-2 ring-[rgb(207,0,6)] ring-offset-2"
                    : "opacity-70 ring-1 ring-[#eadfce] hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.altText} className="h-full w-full object-cover" />
              </button>
            );
          }
          return (
            <div
              key={`placeholder-${i}`}
              aria-hidden="true"
              className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-[#fff6e8] sm:h-[72px] sm:w-[72px] lg:h-[60px] lg:w-[60px]"
            >
              <ImageIcon size={20} strokeWidth={1.5} className="text-[#e3cfae]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   RELATED PRODUCT CARD — white card, image on top, details
   below. The whole card links to that product.
========================================================= */

function RelatedProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasMrp = product.mrp !== null && product.mrp > product.price;
  const discountPercent = hasMrp
    ? Math.round((((product.mrp as number) - product.price) / (product.mrp as number)) * 100)
    : 0;

  return (
    <Link
      href={productPath(product)}
      className="group block rounded-2xl bg-white p-2 no-underline shadow-[0_2px_12px_rgba(120,53,15,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_36px_rgba(120,53,15,0.18)]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f6f1e9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={!imageFailed && product.imageUrl ? product.imageUrl : PLACEHOLDER_IMAGE}
          alt={product.imageAltText || product.productName}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {discountPercent > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[rgb(207,0,6)] px-2.5 py-1 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="px-1.5 pb-2 pt-3">
        <h3 className="line-clamp-1 text-[13px] font-semibold text-gray-900 transition-colors group-hover:text-[rgb(207,0,6)] sm:text-sm">
          {product.productName}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-gray-900 sm:text-base">
            {formatPrice(product.price)}
          </span>
          {hasMrp && (
            <span className="text-[11px] text-gray-400 line-through sm:text-xs">
              {formatPrice(product.mrp as number)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   RELATED PRODUCTS — a rounded gradient panel (same look as
   the About panel above) holding a title, arrow buttons and a
   scrolling row of white cards.
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

  const arrowClass =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:ring-[rgb(255,170,0)] active:scale-90 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <section className={`${CONTAINER} mt-14 pb-16 sm:mt-20`}>
      <div
        className="rounded-[28px] px-5 pb-3 pt-7 sm:px-8 sm:pb-4 sm:pt-9 lg:px-9"
        style={{
          background: "linear-gradient(135deg, #fff3dc 0%, #ffe9dc 60%, #fce0e0 100%)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-[28px]">
            You may also like
          </h2>

          {products.length > 1 && (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="Scroll related products left"
                onClick={() => scrollByCards(-1)}
                disabled={!canScrollLeft}
                className={arrowClass}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Scroll related products right"
                onClick={() => scrollByCards(1)}
                disabled={!canScrollRight}
                className={arrowClass}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateArrowState}
          className="-mx-2 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 pb-6 pt-2 sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div
              key={p.productId}
              className="w-[46%] shrink-0 snap-start sm:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] xl:w-[calc((100%-96px)/5)]"
            >
              <RelatedProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DETAIL SECTION — a dropdown on mobile (collapsed by default
   to save space); always open, with a plain heading, on desktop.
========================================================= */

function DetailSection({
  title,
  className = "",
  style,
  children,
}: {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className} style={style}>
      {/* mobile header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left lg:hidden"
      >
        <span className="text-[19px] font-extrabold tracking-tight text-[#111827]">{title}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#374151] ring-1 ring-black/5">
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* desktop heading */}
      <h2 className="hidden text-[24px] font-extrabold tracking-tight text-[#111827] lg:block">
        {title}
      </h2>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-1 pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

const columnVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function ProductDetail({
  productId,
  initialData,
}: {
  productId: number;
  initialData?: ProductDetailData;
}) {
  // When the server page passes `initialData`, the product is already in the
  // HTML Google and users receive, so we skip the client-side fetch.
  const [data, setData] = useState<ProductDetailData | null>(initialData ?? null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (initialData && initialData.product.productId === productId) return;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Reset quantity whenever a different product loads.
  useEffect(() => {
    setQuantity(1);
  }, [data?.product.productId]);

  // Show the sticky purchase bar once the main buy buttons have scrolled out above the viewport.
  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data]);

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
  const savingsPerUnit = hasMrp ? (product.mrp as number) - product.price : 0;

  const unitSuffix = product.productType === "sqft" ? "/ sq.ft." : "";

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
  const thumbSrc = product.images[0]?.url || PLACEHOLDER_IMAGE;

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
    <div className="relative min-h-screen w-full bg-white">
      <div className={`${CONTAINER} pt-5`}>
        {/* BREADCRUMB */}
        <div className="mb-5">
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

        {/* GALLERY + BUY COLUMN */}
        <div className="grid grid-cols-1 gap-10 lg:h-[calc(100vh-225px)] lg:min-h-[500px] lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <motion.div
            className="lg:h-full lg:min-h-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Gallery product={product} />
          </motion.div>

          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:h-full lg:min-h-0 lg:justify-center"
          >
            {/* BRAND + AVAILABILITY */}
            <motion.div variants={rowVariants} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {product.brand && (
                <span className="text-[15px] font-bold text-[rgb(207,0,6)]">{product.brand}</span>
              )}
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#12805c]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12805c] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#12805c]" />
                </span>
                {availabilityText}
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h1
              variants={rowVariants}
              className="mt-2 text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#111827] sm:text-[30px] lg:text-[clamp(26px,4vh,34px)]"
            >
              {product.productName}
            </motion.h1>

            {/* FEATURE BULLETS */}
            {featureBullets.length > 0 && (
              <motion.ul
                variants={rowVariants}
                className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[14px] text-[#4b5563] sm:grid-cols-2"
              >
                {featureBullets.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <BadgeCheck
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-[rgb(207,0,6)]"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* PRICE */}
            <motion.div variants={rowVariants} className="mt-[clamp(14px,2.6vh,26px)]">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[38px] font-extrabold leading-none tracking-tight text-[#111827] lg:text-[clamp(34px,5.4vh,46px)]">
                  {formatPrice(product.price)}
                </span>
                {unitSuffix && (
                  <span className="text-[15px] font-medium text-[#6b7280]">{unitSuffix}</span>
                )}
                {hasMrp && (
                  <span className="text-[17px] text-[#9ca3af] line-through">
                    {formatPrice(product.mrp as number)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="self-center rounded-full bg-[rgb(207,0,6)] px-3 py-1 text-[13px] font-bold text-white">
                    {discountPercent}% off
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-[#6b7280]">
                {product.gstExclude ? "GST extra" : "Inclusive of GST"}
                {savingsPerUnit > 0 && (
                  <>
                    {" "}
                    <span className="font-semibold text-[#047857]">
                      You save {formatPrice(savingsPerUnit)} {unitSuffix}
                    </span>
                  </>
                )}
              </p>
            </motion.div>

            {/* SPEC TILES */}
            {specChips.length > 0 && (
              <motion.div variants={rowVariants} className="mt-[clamp(12px,2.4vh,24px)] grid grid-cols-3 gap-3">
                {specChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="rounded-2xl bg-[#fff6e8] px-4 py-2.5 ring-1 ring-[#fbe6c4]"
                  >
                    <div className="text-[12px] text-[#a16207]">{chip.label}</div>
                    <div className="mt-0.5 text-[15px] font-bold text-[#111827]">{chip.value}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* QUANTITY + ACTIONS */}
            <motion.div variants={rowVariants} ref={actionsRef} className="mt-[clamp(14px,3vh,28px)] flex flex-col gap-2.5">
              <div className="flex items-stretch gap-3">
                <div className="flex shrink-0 items-center rounded-full bg-[#f5f1ea]">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-[clamp(46px,6.2vh,56px)] w-12 items-center justify-center rounded-l-full text-[#374151] transition-colors hover:bg-[#ece5d9] active:scale-90"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="relative flex h-[clamp(46px,6.2vh,56px)] w-10 items-center justify-center overflow-hidden text-[16px] font-bold text-[#111827]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={quantity}
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -12, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(999, q + 1))}
                    className="flex h-[clamp(46px,6.2vh,56px)] w-12 items-center justify-center rounded-r-full text-[#374151] transition-colors hover:bg-[#ece5d9] active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="h-[clamp(46px,6.2vh,56px)] min-w-0 flex-1 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-6 text-[16px] font-semibold text-white shadow-[0_8px_22px_rgba(207,0,6,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(207,0,6,0.4)]"
                >
                  Buy now
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="flex h-[clamp(46px,6.2vh,56px)] w-full items-center justify-center gap-2 rounded-full border-2 border-[#111827]/10 bg-white text-[16px] font-semibold text-[#111827] transition-all duration-300 hover:border-[rgb(207,0,6)] hover:text-[rgb(207,0,6)]"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </motion.div>

            {/* TRUST */}
            <motion.div
              variants={rowVariants}
              className="mt-[clamp(12px,2.4vh,22px)] flex flex-wrap gap-x-7 gap-y-2 border-t border-[#f0e4d2] pt-[clamp(10px,2vh,18px)]"
            >
              {[
                { icon: Truck, label: "Fast dispatch" },
                { icon: ShieldCheck, label: "Secure payments" },
                { icon: BadgeCheck, label: "Genuine products" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1dc] text-[rgb(207,0,6)]">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-medium text-[#374151]">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* DETAILS — aligned with the columns above: about (left), specifications (right) */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* ABOUT */}
          <DetailSection
            title="About this product"
            className="rounded-[28px] px-5 py-4 sm:px-8 lg:p-9"
            style={{
              background: "linear-gradient(135deg, #fff3dc 0%, #ffe9dc 60%, #fce0e0 100%)",
            }}
          >
            <p className="whitespace-pre-line text-[16px] leading-[1.75] text-[#4b5563]">
              {product.aboutProduct ||
                product.shortDescription ||
                "No additional details available for this product yet."}
            </p>
          </DetailSection>

          {/* SPECIFICATIONS */}
          <DetailSection
            title="Specifications"
            className="rounded-[28px] border border-[#f0e4d2] bg-white px-5 py-4 sm:px-8 lg:p-9"
          >
            {specRows.length > 0 ? (
              <dl className="-mt-1 grid grid-cols-2 gap-x-5 sm:gap-x-10">
                {specRows.map((row) => (
                  <div key={row.label} className="min-w-0 border-b border-[#f3ead9] py-3 sm:py-4">
                    <dt className="text-[12.5px] text-[#9ca3af]">{row.label}</dt>
                    <dd className="mt-1 break-words text-[15px] font-semibold text-[#111827] sm:text-[16px]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-[14px] text-[#9ca3af]">No specifications listed yet.</p>
            )}
          </DetailSection>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 ? (
        <RelatedProductsSection products={relatedProducts} />
      ) : (
        <div className="pb-16" />
      )}

      {/* STICKY PURCHASE BAR — appears after the main buttons scroll out of view */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f0e4d2] bg-white/95 shadow-[0_-8px_24px_rgba(24,34,53,0.08)] backdrop-blur"
          >
            <div className={`${CONTAINER} flex items-center justify-between gap-4 py-3`}>
              <div className="flex min-w-0 items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbSrc}
                  alt=""
                  className="hidden h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-[#eadfce] sm:block"
                />
                <div className="min-w-0">
                  <p className="hidden truncate text-[14px] font-semibold text-[#111827] sm:block">
                    {product.productName}
                  </p>
                  <p className="text-[15px] font-extrabold text-[#111827]">
                    {formatPrice(product.price)}{" "}
                    {unitSuffix && (
                      <span className="text-[12px] font-medium text-[#6b7280]">{unitSuffix}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  className="h-11 rounded-full border-2 border-[#111827]/10 px-4 text-[14px] font-semibold text-[#111827] transition-colors hover:border-[rgb(207,0,6)] hover:text-[rgb(207,0,6)] sm:px-6"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="h-11 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-5 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(207,0,6,0.3)] sm:px-7"
                >
                  Buy now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}