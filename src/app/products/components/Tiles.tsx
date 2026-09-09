"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ==========================================================
   PRODUCT TYPE
========================================================== */

type Product = {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
};

/* ==========================================================
   TILES PRODUCTS
========================================================== */

const tileProducts: Product[] = [
  {
    id: 1,
    slug: "premium-porcelain-tiles",
    title: "Premium Porcelain Tiles",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
  {
    id: 2,
    slug: "designer-ceramic-tiles",
    title: "Designer Ceramic Tiles",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 3,
    slug: "modern-wall-floor-tiles",
    title: "Modern Wall & Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹799",
    oldPrice: "₹1,049",
    discount: "24% OFF",
  },
  {
    id: 4,
    slug: "marble-finish-floor-tiles",
    title: "Marble Finish Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 5,
    slug: "wood-look-wall-tiles",
    title: "Wood Look Wall Tiles",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹749",
    oldPrice: "₹999",
    discount: "25% OFF",
  },
];

/* ==========================================================
   PAINT PRODUCTS
========================================================== */

const paintProducts: Product[] = [
  {
    id: 1,
    slug: "premium-interior-wall-paint",
    title: "Premium Interior Wall Paint",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 2,
    slug: "weatherproof-exterior-paint",
    title: "Weatherproof Exterior Paint",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,299",
    oldPrice: "₹1,699",
    discount: "24% OFF",
  },
  {
    id: 3,
    slug: "luxury-matt-finish-paint",
    title: "Luxury Matt Finish Paint",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
  {
    id: 4,
    slug: "easy-clean-emulsion-paint",
    title: "Easy Clean Emulsion Paint",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 5,
    slug: "decorative-texture-paint",
    title: "Decorative Texture Paint",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹799",
    oldPrice: "₹1,049",
    discount: "24% OFF",
  },
];

/* ==========================================================
   PLYWOOD & LAMINATES PRODUCTS
========================================================== */

const plywoodProducts: Product[] = [
  {
    id: 1,
    slug: "premium-plywood-sheets",
    title: "Premium Plywood Sheets",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,299",
    oldPrice: "₹1,699",
    discount: "24% OFF",
  },
  {
    id: 2,
    slug: "decorative-laminates",
    title: "Decorative Laminates",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 3,
    slug: "wood-finish-laminates",
    title: "Wood Finish Laminates",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 4,
    slug: "interior-grade-plywood",
    title: "Interior Grade Plywood",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,499",
    oldPrice: "₹1,899",
    discount: "21% OFF",
  },
  {
    id: 5,
    slug: "high-pressure-laminates",
    title: "High Pressure Laminates",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
];

/* ==========================================================
   TABS
========================================================== */

type TabKey = "tiles" | "paints" | "plywood";

const tabs: {
  key: TabKey;
  label: string;
  category: string;
  products: Product[];
}[] = [
  { key: "tiles", label: "Tiles", category: "tiles", products: tileProducts },
  {
    key: "paints",
    label: "Paints",
    category: "paints",
    products: paintProducts,
  },
  {
    key: "plywood",
    label: "Plywood & Laminates",
    category: "plywood-laminates",
    products: plywoodProducts,
  },
];

/* ==========================================================
   PRODUCT CARD
========================================================== */

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(product.title)}`}
      className="group block"
    >
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
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="
            (max-width: 639px) 46vw,
            (max-width: 1023px) 30vw,
            19vw
          "
          className="
            object-cover

            transition-transform
            duration-[900ms]
            ease-out

            group-hover:scale-[1.08]
          "
        />

        {/* DISCOUNT TAG */}

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

          <span className="text-[11px] text-gray-400 line-through sm:text-xs">
            {product.oldPrice}
          </span>
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
      href={`/products?category=${encodeURIComponent(product.title)}`}
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
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="76vw"
          className="object-cover"
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

        {/* CONTENT */}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-white">
            {product.title}
          </h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              {product.price}
            </span>

            <span className="text-xs text-white/60 line-through">
              {product.oldPrice}
            </span>
          </div>

          <span
            className="
              mt-2.5

              inline-flex
              items-center
              gap-1

              rounded-full

              bg-[rgb(255,170,0)]

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
   MAIN COMPONENT
========================================================== */

export default function Tiles() {
  const [active, setActive] = useState<TabKey>("tiles");

  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];

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
              Tiles, Paints &amp; Plywood
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              Hand-picked materials and finishes, chosen for quality that
              lasts.
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
              {/* MOBILE — swipeable poster carousel, not a grid */}

              <MobileCarousel products={activeTab.products} />

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
                {activeTab.products.map((product, index) => (
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ====================================================
            VIEW ALL CTA
        ==================================================== */}

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={`/products/items/${activeTab.category}`}
            className="
              group
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-gray-900

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
