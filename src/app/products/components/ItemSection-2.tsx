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
   DIGITAL LOCK PRODUCTS
   category folder: hardware (Door Hardware column)
========================================================== */

const lockProducts: Product[] = [
  {
    id: 1,
    slug: "smart-digital-door-lock",
    title: "Smart Digital Door Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/Sync-pro-digital-lock-SP02-03.jpg",
    price: "₹6,499",
    oldPrice: "₹8,499",
    discount: "24% OFF",
  },
  {
    id: 2,
    slug: "fingerprint-smart-lock",
    title: "Fingerprint Smart Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/Imperia-IM03-img-03.jpg",
    price: "₹8,999",
    oldPrice: "₹11,499",
    discount: "22% OFF",
  },
  {
    id: 3,
    slug: "keypad-cylindrical-lock",
    title: "Keypad Cylindrical Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/Crest-digital-lock-CR02-03-1.jpg",
    price: "₹3,299",
    oldPrice: "₹4,199",
    discount: "21% OFF",
  },
  {
    id: 4,
    slug: "app-enabled-smart-deadbolt",
    title: "App-Enabled Smart Deadbolt",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/Crest-digital-lock-CR01-03.jpg",
    price: "₹9,999",
    oldPrice: "₹12,999",
    discount: "23% OFF",
  },
  {
    id: 5,
    slug: "rfid-card-door-lock",
    title: "RFID Card Door Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/Imperia-digital-lock-IM08-04.jpg",
    price: "₹5,799",
    oldPrice: "₹7,299",
    discount: "20% OFF",
  },
];

/* ==========================================================
   FURNITURE LOCK PRODUCTS
   category folder: hardware (Furniture Locks column)

   Images: Ebco product photography (ebco-dev-assets CDN) is
   used wherever there's a matching product; the remaining
   items use the same Unsplash hardware photography already
   live elsewhere on this site (see
   items/hardware/components/TopCategories.tsx) until matching
   Ebco photos for those specific products are available.
========================================================== */

const furnitureLockProducts: Product[] = [
  {
    id: 1,
    slug: "4-digit-combination-lock",
    title: "4-Digit Combination Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/08/4-digit-combination-lock-with-cover-01.webp",
    price: "₹349",
    oldPrice: "₹449",
    discount: "22% OFF",
  },
  {
    id: 2,
    slug: "cabinet-cam-lock",
    title: "Cabinet Cam Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/nc/catalog/esmart-digital-lock-cabinet-5z-numeric/dp-img-001.jpg",
    price: "₹129",
    oldPrice: "₹179",
    discount: "28% OFF",
  },
  {
    id: 3,
    slug: "drawer-multi-purpose-lock",
    title: "Drawer Multi-Purpose Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/nc/catalog/esmart-digital-lock-pedestal-1z-rfid/dp-img-001.jpg",
    price: "₹199",
    oldPrice: "₹269",
    discount: "26% OFF",
  },
  {
    id: 4,
    slug: "sliding-wardrobe-lock",
    title: "Sliding Wardrobe Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2023/08/IMG-P-WSPL-GW.jpg",
    price: "₹249",
    oldPrice: "₹329",
    discount: "24% OFF",
  },
  {
    id: 5,
    slug: "push-and-turn-cupboard-lock",
    title: "Push & Turn Cupboard Lock",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/nc/catalog/wardrobe-lock-3-point-22-mm/dp-img/pro_img-rotated.jpg",
    price: "₹179",
    oldPrice: "₹239",
    discount: "25% OFF",
  },
];

/* ==========================================================
   SLIDES & HINGES PRODUCTS
   category folder: hardware (Drawer Slides & Hinges column)
========================================================== */

const slidesHingesProducts: Product[] = [
  {
    id: 1,
    slug: "soft-close-drawer-slides",
    title: "Soft-Close Drawer Slides",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/09/heavy-duty-drawer-slide-125-imgs-02.jpg",
    price: "₹399",
    oldPrice: "₹529",
    discount: "25% OFF",
  },
  {
    id: 2,
    slug: "concealed-cabinet-hinges",
    title: "Concealed Cabinet Hinges",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/11/short-arm-hinge-with-4-hole-mounting-plate-img-01.jpg",
    price: "₹89",
    oldPrice: "₹119",
    discount: "25% OFF",
  },
  {
    id: 3,
    slug: "telescopic-ball-bearing-slides",
    title: "Telescopic Ball-Bearing Slides",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/01/STDS1-35-2.jpg",
    price: "₹549",
    oldPrice: "₹729",
    discount: "25% OFF",
  },
  {
    id: 4,
    slug: "heavy-duty-wardrobe-hinges",
    title: "Heavy-Duty Wardrobe Hinges",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/nc/catalog/thick-door-hinge-15-35mm-with-4-hole-mounting-plate/25042024/dp-img-1.jpg",
    price: "₹149",
    oldPrice: "₹199",
    discount: "25% OFF",
  },
  {
    id: 5,
    slug: "push-to-open-drawer-system",
    title: "Push-to-Open Drawer System",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2024/04/MG_4332.jpg",
    price: "₹649",
    oldPrice: "₹859",
    discount: "24% OFF",
  },
];

/* ==========================================================
   TABS

   All three columns — Digital Locks, Furniture Locks, and
   Slides & Hinges — live under the Hardware folder in the
   taxonomy, so every tab routes to the same category slug.
========================================================== */

type TabKey = "locks" | "furniture-locks" | "slides-hinges";

const tabs: {
  key: TabKey;
  label: string;
  category: string;
  products: Product[];
}[] = [
  {
    key: "locks",
    label: "Digital Locks",
    category: "hardware",
    products: lockProducts,
  },
  {
    key: "furniture-locks",
    label: "Furniture Locks",
    category: "hardware",
    products: furnitureLockProducts,
  },
  {
    key: "slides-hinges",
    label: "Slides & Hinges",
    category: "hardware",
    products: slidesHingesProducts,
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

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
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

export default function HardwareAndFinishes() {
  const [active, setActive] = useState<TabKey>("locks");

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
                Finish & Secure
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
              Digital Locks, Furniture Locks &amp; Slides &amp; Hinges
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              Smart security and smooth-motion hardware to finish every
              cabinet and door.
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
                        layoutId="hardware-finishes-active-tab-pill"
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
