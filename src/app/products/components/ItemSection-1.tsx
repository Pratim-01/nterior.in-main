"use client";

import Link from "next/link";
import { calculateDiscountPercent } from "@/lib/pricing";
import { useEffect, useRef, useState } from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { Product as ApiProduct, ProductsResponse } from "@/types/products";
import { productPath } from "@/lib/product-slug";

/* ==========================================================
   PRODUCT TYPE
   (the shape this section's cards render — mapped from the
   real `ApiProduct` returned by /api/products)
========================================================== */

type Product = {
  id: number;
  href: string;
  title: string;
  image: string;
  price: string;
  oldPrice: string | null;
  discount: string | null;
};

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Maps a real `product_details` row (as returned by /api/products) into
 *  the local card shape — computing the "X% OFF" badge and struck-through
 *  MRP only when the product actually has a discounted MRP on file. */
function mapApiProduct(p: ApiProduct): Product {
  const hasDiscount = p.mrp !== null && p.mrp > p.price;
  const discountPct = hasDiscount
    ? calculateDiscountPercent(p.mrp as number, p.price)
    : null;

  return {
    id: p.productId,
    href: productPath(p),
    title: p.productName,
    image: p.imageUrl || PLACEHOLDER_IMAGE,
    price: formatPrice(p.price),
    oldPrice: hasDiscount ? formatPrice(p.mrp as number) : null,
    discount: hasDiscount ? `${discountPct}% OFF` : null,
  };
}

/* ==========================================================
   TABS

   Each tab fetches the newest 5 real products from
   /api/products for its own `category` (and, where the column
   is itself a leaf item, `subCategory`) — mirroring exactly
   what landing on the matching /products/items/plywood-laminates/<slug>
   page shows, capped to 5 and sorted newest-first.
========================================================== */

type TabKey = "plywood" | "laminates" | "adhesives";

const tabs: {
  key: TabKey;
  label: string;
  /** Exact `product_details.category` value to fetch. */
  apiCategory: string;
  /** Where "View All" links to — the real category listing page. */
  viewAllHref: string;
}[] = [
  {
    key: "plywood",
    label: "Plywood",
    apiCategory: "Plywood & Blockboard",
    viewAllHref: "/products/items/plywood-laminates/plywood-blockboard",
  },
  {
    key: "laminates",
    label: "Laminates",
    apiCategory: "Laminates",
    viewAllHref: "/products/items/plywood-laminates/laminates",
  },
  {
    key: "adhesives",
    label: "Adhesives",
    apiCategory: "Adhesives",
    viewAllHref: "/products/items/plywood-laminates/adhesives",
  },
];

/* ==========================================================
   DATA FETCHING
   Fetches all three tabs' newest-5 products once on mount, in
   parallel, so switching tabs is instant (no per-click fetch).
========================================================== */

type TabStatus = "loading" | "success" | "error";

function useTabbedProducts() {
  const [productsByTab, setProductsByTab] = useState<Record<TabKey, Product[]>>(
    () => {
      const initial = {} as Record<TabKey, Product[]>;
      tabs.forEach((t) => {
        initial[t.key] = [];
      });
      return initial;
    }
  );
  const [statusByTab, setStatusByTab] = useState<Record<TabKey, TabStatus>>(
    () => {
      const initial = {} as Record<TabKey, TabStatus>;
      tabs.forEach((t) => {
        initial[t.key] = "loading";
      });
      return initial;
    }
  );

  useEffect(() => {
    let cancelled = false;

    tabs.forEach((tab) => {
      const params = new URLSearchParams({
        category: tab.apiCategory,
        sort: "newest",
        pageSize: "5",
      });

      fetch(`/api/products?${params.toString()}`, { cache: "no-store" })
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to load products");
          return (await res.json()) as ProductsResponse;
        })
        .then((data) => {
          if (cancelled) return;
          setProductsByTab((prev) => ({
            ...prev,
            [tab.key]: (data.products ?? []).map(mapApiProduct),
          }));
          setStatusByTab((prev) => ({ ...prev, [tab.key]: "success" }));
        })
        .catch(() => {
          if (cancelled) return;
          setStatusByTab((prev) => ({ ...prev, [tab.key]: "error" }));
        });
    });

    return () => {
      cancelled = true;
    };
    // `tabs` is a module-level constant, so this only ever needs to run
    // once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { productsByTab, statusByTab };
}

/* ==========================================================
   PRODUCT CARD
========================================================== */

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.href} className="group block">
      {/* IMAGE */}

      <div
        className="
          relative

          aspect-[4/5]
          w-full

          overflow-hidden

          rounded-2xl

          bg-gray-100
        "
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover

            transition-transform
            duration-[900ms]
            ease-out

            group-hover:scale-[1.08]
          "
        />

        {/* DISCOUNT TAG */}

        {product.discount && (
          <span
            className="
              absolute
              left-3
              top-3

              rounded-full

              bg-white/95

              px-2.5
              py-1

              text-[10px]
              font-bold
              tracking-wide

              text-[rgb(207,0,6)]

              shadow-sm

              backdrop-blur-sm
            "
          >
            {product.discount}
          </span>
        )}

        {/* HOVER SCRIM */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent

            opacity-0

            transition-opacity
            duration-500

            group-hover:opacity-100
          "
        />

        {/* QUICK VIEW */}

        <div
          className="
            absolute
            inset-x-3
            bottom-3

            flex

            translate-y-3

            opacity-0

            transition-all
            duration-500
            ease-out

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-1

              rounded-full

              bg-white

              px-3
              py-1.5

              text-[11px]
              font-semibold

              text-gray-900

              shadow-md
            "
          >
            View Product
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* DETAILS */}

      <div className="mt-3 px-0.5">
        <h3
          className="
            line-clamp-1

            text-[13px]
            font-semibold
            leading-snug

            text-gray-900

            transition-colors
            duration-300

            group-hover:text-[rgb(207,0,6)]

            sm:text-sm
          "
        >
          {product.title}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-gray-900 sm:text-base">
            {product.price}
          </span>

          {product.oldPrice && (
            <span className="text-[11px] text-gray-400 line-through sm:text-xs decoration-[rgb(207,0,6)]">
              {product.oldPrice}
            </span>
          )}
        </div>

        {/* ANIMATED UNDERLINE */}

        <span
          className="
            mt-2
            block

            h-[2px]
            w-0

            bg-[rgb(255,170,0)]

            transition-all
            duration-500
            ease-out

            group-hover:w-full
          "
        />
      </div>
    </Link>
  );
}

/* ==========================================================
   MOBILE POSTER CARD
   A bigger, more immersive card used only on mobile inside
   the swipeable carousel below — deliberately different from
   the minimal desktop grid card.
========================================================== */

function MobilePosterCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.href}
      className="
        group
        block

        overflow-hidden

        rounded-3xl

        bg-gray-100

        shadow-[0_8px_24px_rgba(24,34,53,0.1)]

        transition-transform
        duration-200

        active:scale-[0.97]
      "
    >
      <div className="relative h-[320px] w-full sm:h-[360px]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* SCRIM */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-black/85
            via-black/10
            to-transparent
          "
        />

        {/* DISCOUNT TAG */}

        {product.discount && (
          <span
            className="
              absolute
              left-3
              top-3

              rounded-full

              bg-white/95

              px-2.5
              py-1

              text-[10px]
              font-bold
              tracking-wide

              text-[rgb(207,0,6)]

              shadow-sm
            "
          >
            {product.discount}
          </span>
        )}

        {/* CONTENT */}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-white">
            {product.title}
          </h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              {product.price}
            </span>

            {product.oldPrice && (
              <span className="text-xs text-white/60 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          <span
            className="
              mt-2.5

              inline-flex
              items-center
              gap-1

              rounded-full

              bg-[rgb(207,0,6)]

              px-3
              py-1.5

              text-[11px]
              font-bold

              text-white

              shadow-sm
            "
          >
            View Product
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ==========================================================
   MOBILE CAROUSEL
   Swipeable, scroll-snapped strip of poster cards with a
   live progress bar — the "not grid-like" mobile layout.
========================================================== */

function MobileCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <div className="sm:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          -mx-4

          flex

          snap-x
          snap-mandatory

          gap-4

          overflow-x-auto

          scroll-px-4

          px-4
          pb-1

          [-ms-overflow-style:none]
          [scrollbar-width:none]

          [&::-webkit-scrollbar]:hidden
        "
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            className="w-[72%] shrink-0 snap-center"
          >
            <MobilePosterCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* SWIPE PROGRESS BAR */}

      <div className="mx-4 mt-4 h-1 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-[rgb(255,170,0)]"
          animate={{ width: `${Math.min(100, Math.max(14, progress * 100))}%` }}
          transition={{ type: "tween", duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
}

/* ==========================================================
   SKELETON GRID
   Shown while a tab's products are still loading, in the same
   footprint as the real grid so nothing jumps into place.
========================================================== */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-gray-100"
        />
      ))}
    </div>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function Tiles() {
  const [active, setActive] = useState<TabKey>("plywood");
  const { productsByTab, statusByTab } = useTabbedProducts();

  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];
  const activeProducts = productsByTab[activeTab.key];
  const activeStatus = statusByTab[activeTab.key];

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      {/* AMBIENT BACKGROUND DECOR */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24

          h-72
          w-72

          rounded-full

          bg-[rgb(255,170,0)]/10

          blur-3xl
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24

          h-72
          w-72

          rounded-full

          bg-[rgb(207,0,6)]/[0.06]

          blur-3xl
        "
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ====================================================
            HEADER + TABS
            Header text on the left, tab switcher on the right —
            same pattern as the other sections. Stacks on mobile.
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6

            sm:flex-row
            sm:items-end
            sm:justify-between
            sm:gap-4
          "
        >
          {/* HEADER */}

          <div className="min-w-0 text-left">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-[rgb(255,170,0)]" />
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[rgb(255,170,0)]

                  sm:text-[11px]
                "
              >
                Curated For You
              </span>
            </div>

            <h2
              className="
                text-3xl
                font-black
                tracking-tight

                text-gray-900

                sm:text-4xl
              "
            >
              Plywood, Laminates &amp; Adhesives
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              Core boards, decorative surfaces and bonding solutions, chosen
              for quality that lasts.
            </p>
          </div>

          {/* TABS */}

          <div className="flex justify-center sm:shrink-0 sm:justify-end">
            <div
              className="
                flex
                flex-wrap
                items-center

                gap-1

                rounded-full

                border
                border-gray-200

                bg-gray-50

                p-1
              "
            >
              {tabs.map((tab) => {
                const isActive = tab.key === active;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActive(tab.key)}
                    className={`
                      relative

                      whitespace-nowrap

                      rounded-full

                      px-4
                      py-2.5

                      text-[13px]
                      font-semibold

                      transition-colors
                      duration-300

                      sm:px-6
                      sm:text-sm

                      ${isActive ? "text-[rgb(207,0,6)]" : "text-gray-500 hover:text-gray-900"}
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tiles-active-tab-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="
                          absolute
                          inset-0

                          -z-10

                          rounded-full

                          bg-[rgb(255,170,0)]

                          shadow-[0_4px_14px_rgba(255,170,0,0.35)]
                        "
                      />
                    )}

                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ====================================================
            PRODUCT GRID
        ==================================================== */}

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeStatus === "loading" ? (
                <SkeletonGrid />
              ) : activeStatus === "error" ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
                  <p className="text-sm font-medium text-gray-500">
                    Unable to load {activeTab.label.toLowerCase()} products right
                    now.
                  </p>
                </div>
              ) : activeProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center">
                  <p className="text-sm font-medium text-gray-500">
                    No {activeTab.label.toLowerCase()} products are available
                    right now.
                  </p>
                </div>
              ) : (
                <>
                  {/* MOBILE — swipeable poster carousel, not a grid */}

                  <MobileCarousel products={activeProducts} />

                  {/* TABLET / DESKTOP — clean minimal grid */}

                  <div
                    className="
                      hidden

                      sm:grid
                      sm:grid-cols-3
                      sm:gap-x-6
                      sm:gap-y-8

                      lg:grid-cols-5
                    "
                  >
                    {activeProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                          ease: "easeOut",
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ====================================================
            VIEW ALL CTA
        ==================================================== */}

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={activeTab.viewAllHref}
            className="
              group
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-gray-300

              bg-white

              px-6
              py-3

              text-sm
              font-semibold

              text-gray-900

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[rgb(207,0,6)]
              hover:text-white
              hover:shadow-lg
            "
          >
            View All {activeTab.label}
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}