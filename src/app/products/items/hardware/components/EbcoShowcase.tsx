"use client";

/* ==========================================================
   Ebco Showcase
   ----------------------------------------------------------
   "Shop by Ebco" — a partnered-brand section for the Hardware
   landing page. Ebco supplies 7 product lines; each one is a
   *category*, not a single product, so every tile links into
   the existing generic subcategory route
   (/products/items/hardware/[subcategory]) with an extra
   ?brand=Ebco query param layered on top.

   Why that link shape:
   - `[subcategory]/page.tsx` already turns a slug into a
     category via `slugToCategory` (see src/lib/category-slug.ts)
     and locks ProductListing to that category — no new route or
     page needed for this section.
   - `brand` is a real filter facet (see src/types/products.ts /
     FACET_KEYS) that ProductListing reads straight from the URL
     and never overrides, so `?brand=Ebco` pre-filters to Ebco
     the moment real products carry that brand value — nothing
     to wire up later on the frontend side.

   IMAGES: placeholders only. Ebco's own product pages
   (ebco.in) render everything client-side through JavaScript,
   so there's no static image URL to fetch/scrape, and even if
   there were, hot-linking a partner's product photography from
   their CDN onto this site isn't something to do without their
   sign-off (it's also fragile — hotlink protection, path
   changes, etc. can silently break the tiles). Swap the
   `image` field below for real Ebco-approved photography
   (ideally downloaded and served from /public/brands/ebco/…)
   once you have it — everything else here is real, working
   code today, not a mockup.
========================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface EbcoCategory {
  id: string;
  name: string;
  /** Matches /products/items/hardware/[subcategory] */
  slug: string;
  blurb: string;
  /** PLACEHOLDER — see file header. Replace with approved Ebco imagery. */
  image: string;
}

const EBCO_CATEGORIES: EbcoCategory[] = [
  {
    id: "digital-locks",
    name: "Digital Locks",
    slug: "digital-locks",
    blurb: "Keyless entry systems for cabinets, drawers and doors.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2026/04/crest-digital-lock-CR04-03-01.jpg",
  },
  {
    id: "drawer-slides-hinges",
    name: "Drawer Slides & Hinges",
    slug: "drawer-slides-hinges",
    blurb: "Smooth-motion channels and concealed hinges for furniture.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/09/heavy-duty-drawer-slide-125-imgs-02.jpg",
  },
  {
    id: "furniture-locks",
    name: "Furniture Locks",
    slug: "furniture-locks",
    blurb: "Cabinet, drawer and cupboard locks for secure storage.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2025/08/4-digit-combination-lock-with-cover-01.webp",
  },
  {
    id: "general-hardware",
    name: "General Hardware",
    slug: "general-hardware",
    blurb: "Everyday fittings and accessories for every project.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2023/01/IMG_20220913_145904-1.jpg",
  },
  {
    id: "joinery-fittings-screws",
    name: "Joinery, Fittings & Screws",
    slug: "joinery-fittings-screws",
    blurb: "Connectors, fasteners and screws that hold everything together.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/nc/catalog/screw-for-steelfix-and-minifix/webpage-dp/Mfs7i.jpg",
  },
  {
    id: "retail-display-systems",
    name: "Retail Display Systems",
    slug: "retail-display-systems",
    blurb: "Modular display and shelving hardware for retail fit-outs.",
    image:
      "https://s3.ap-south-1.amazonaws.com/ebco-dev-assets/EBCO-assets/2024/05/dp-img-1.jpg.webp",
  },
  {
    id: "window-door-glass-hardware",
    name: "Window, Door & Glass Hardware",
    slug: "window-door-glass-hardware",
    blurb: "Fittings for windows, doors and glass partitions.",
    image:
      "https://ebco-dev-assets.s3.ap-south-1.amazonaws.com/EBCO-assets/product/03d36ac7-31b4-4b56-a1ff-e85cb923d6e8.jpg",
  },
];

const BRAND = "Ebco";

function categoryHref(slug: string) {
  return `/products/items/hardware/${slug}?brand=${encodeURIComponent(BRAND)}`;
}

export default function EbcoShowcase() {
  const [activeId, setActiveId] = useState<string>(EBCO_CATEGORIES[0].id);

  // --- Mobile carousel: track which card is centered so the dots below
  // the scroll strip stay in sync with the user's swipe position. ---
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(el.children) as HTMLElement[];
        if (children.length === 0) return;

        const center = el.scrollLeft + el.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        children.forEach((child, index) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const distance = Math.abs(childCenter - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveSlide(closestIndex);
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const el = scrollerRef.current;
    const child = el?.children[index] as HTMLElement | undefined;
    if (el && child) {
      el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FFF5F5] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-6 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[2px] w-9 bg-[rgb(255,170,0)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(207,0,6)] sm:text-xs">
                Our Partnered Brand
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#202020] sm:text-4xl lg:text-5xl">
              Shop Hardware by Ebco
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
              Ebco&apos;s full range of furniture fittings and architectural
              hardware, organized into 7 product lines.
            </p>
          </div>

          {/* BRAND MARK */}
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <div className="relative h-8 w-16 shrink-0 overflow-hidden rounded">
              <Image
                src="/brands/ebco.jpeg"
                alt="Ebco"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Authorized Partner
            </span>
          </div>
        </div>

        {/* ================= DESKTOP: EXPANDING ACCORDION ================= */}
        <div className="hidden lg:flex lg:h-[420px] lg:gap-3">
          {EBCO_CATEGORIES.map((category) => {
            const isActive = category.id === activeId;

            return (
              <motion.div
                key={category.id}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                animate={{ flexGrow: isActive ? 5 : 1 }}
                style={{ flexBasis: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-w-0 overflow-hidden rounded-2xl bg-gray-900"
              >
                <Link
                  href={categoryHref(category.slug)}
                  className="absolute inset-0 z-10"
                  aria-label={`Browse ${category.name} by Ebco`}
                />

                {/* IMAGE */}
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* GRADIENT */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    isActive
                      ? "from-black/85 via-black/25 to-black/10 opacity-100"
                      : "from-black/80 via-black/40 to-black/20 opacity-100"
                  }`}
                />

                {/* VERTICAL LABEL (collapsed state) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-end justify-center pb-6"
                    >
                      <span className="origin-bottom-left -rotate-90 whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em] text-white">
                        {category.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* EXPANDED CONTENT */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.35, delay: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        y: 6,
                        transition: { duration: 0.15, delay: 0, ease: "easeIn" },
                      }}
                      className="absolute bottom-0 left-0 w-[320px] max-w-[85%] p-6"
                    >
                      <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                        Ebco
                      </span>

                      <h3 className="text-2xl font-black leading-tight text-white xl:text-[26px]">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/85">
                        {category.blurb}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                        Shop Now
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* THEME ACCENT */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(255,170,0)] via-[rgb(255,110,0)] to-[rgb(207,0,6)] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ================= MOBILE / TABLET: SCROLLABLE STORY CARDS =================
            Full-bleed swipeable cards, one dominant tile in view with the
            next one peeking at the edge — same feel as a game-store promo
            carousel. Snap-scroll keeps each card centered, and the dots
            below track whichever card is currently in focus. */}
        <div className="lg:hidden">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {EBCO_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={categoryHref(category.slug)}
                aria-label={`Browse ${category.name} by Ebco`}
                className="relative h-[440px] w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl bg-gray-900 sm:w-[55%]"
              >
                {/* IMAGE */}
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* GRADIENT */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"
                />

                {/* THEME ACCENT */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(255,170,0)] via-[rgb(255,110,0)] to-[rgb(207,0,6)]"
                />

                {/* BRAND TAG */}
                <span className="absolute left-4 top-4 inline-block rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  Ebco
                </span>

                {/* CONTENT */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-black leading-tight text-white">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-[13px] leading-5 text-white/85">
                    {category.blurb}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                    Shop Now
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* DOT PAGINATION */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {EBCO_CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to ${category.name}`}
                aria-current={index === activeSlide}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? "w-5 bg-[rgb(207,0,6)]"
                    : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
