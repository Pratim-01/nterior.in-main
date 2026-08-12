"use client";

/* ==========================================================
   Category Product Sections
   Tiles / Ply Wood & Laminates / Paints
========================================================== */

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
   TILES
========================================================== */

const tileProducts: Product[] = [
  {
    id: 1,
    slug: "marble-finish-floor-tiles",
    title: "Marble Finish Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },

  {
    id: 2,
    slug: "wood-look-wall-tiles",
    title: "Wood Look Wall Tiles",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹749",
    oldPrice: "₹999",
    discount: "25% OFF",
  },

  {
    id: 3,
    slug: "premium-porcelain-tiles",
    title: "Premium Porcelain Tiles",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },

  {
    id: 4,
    slug: "designer-ceramic-tiles",
    title: "Designer Ceramic Tiles",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },

  {
    id: 5,
    slug: "modern-wall-floor-tiles",
    title: "Modern Wall & Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹799",
    oldPrice: "₹1,049",
    discount: "24% OFF",
  },
];

/* ==========================================================
   PLYWOOD & LAMINATES
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
   PAINTS
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
   REUSABLE CATEGORY CAROUSEL
========================================================== */

function CategoryCarousel({
  title,
  category,
  products,
  navigationId,
}: {
  title: string;
  category: string;
  products: Product[];
  navigationId: string;
}) {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-white
        pt-3
        pb-0
        sm:pt-4
        md:pt-4
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
    mb-4
    flex
    w-full
    items-center
    justify-between
    gap-3
    sm:mb-5
  "
        >
          {/* CATEGORY TITLE */}

          <Link
            href={`/products?category=${category}`}
            aria-label={`View all ${title}`}
            className="
      group
      flex
      min-w-0
      flex-1
      items-center
      gap-1.5
      text-[rgb(207,0,6)]
    "
          >
            <h2
              className="
        m-0
        max-w-full
        text-2xl
        font-black
        leading-[0.95]
        tracking-tight
        text-[rgb(207,0,6)]
        sm:text-4xl
        lg:text-3xl
      "
            >
              {title}
            </h2>

            <span
              className="
        flex
        shrink-0
        items-center
        text-[32px]
        font-normal
        leading-none
        text-[rgb(207,0,6)]
        transition-transform
        duration-200
        group-hover:translate-x-1
        sm:text-[42px]
      "
            >
              ›
            </span>
          </Link>

          {/* CAROUSEL CONTROLS */}

          <div
            className="
      flex
      shrink-0
      items-center
      gap-1.5
      sm:gap-3
    "
          >
            <button
              type="button"
              aria-label={`Previous ${title}`}
              className={`
        ${navigationId}-prev
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-gray-200
        bg-white
        text-gray-800
        shadow-sm
        transition-all
        duration-300
        hover:bg-gray-100
        sm:h-11
        sm:w-11
      `}
            >
              <ChevronLeft
                size={17}
                className="sm:h-5 sm:w-5"
              />
            </button>

            <button
              type="button"
              aria-label={`Next ${title}`}
              className={`
        ${navigationId}-next
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-gray-200
        bg-white
        text-gray-800
        shadow-sm
        transition-all
        duration-300
        hover:bg-gray-100
        sm:h-11
        sm:w-11
      `}
            >
              <ChevronRight
                size={17}
                className="sm:h-5 sm:w-5"
              />
            </button>
          </div>
        </div>

        {/* ======================================================
            PRODUCT SLIDER
        ====================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            pb-2
            pt-1
          "
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: `.${navigationId}-prev`,
              nextEl: `.${navigationId}-next`,
            }}
            autoplay={{
              delay: 2300,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            loop={true}
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              /* MOBILE */

              0: {
                slidesPerView: 1.25,
                spaceBetween: 12,
              },

              /* SMALL TABLET */

              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },

              /* TABLET */

              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },

              /* DESKTOP */

              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="!h-auto"
              >
                {/* ==================================================
                    PRODUCT CARD
                ================================================== */}

                <article
                  className="
                    group
                    relative
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:rounded-3xl
                  "
                >
                  {/* ==================================================
                      PRODUCT IMAGE
                  ================================================== */}

                  <Link
                    href={`/product/${product.slug}`}
                    className="block"
                  >
                    <div
                      className="
                        relative
                        h-40
                        overflow-hidden
                        bg-gray-100
                        sm:h-44
                        lg:h-48
                      "
                    >
                      <Image
                        src={product.image}
                        alt={`${product.title} for home interiors`}
                        fill
                        sizes="
                          (max-width: 640px) 80vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                      />

                      {/* IMAGE OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/15
                          via-transparent
                          to-transparent
                        "
                      />
                    </div>
                  </Link>

                  {/* ==================================================
                      PRODUCT DETAILS
                  ================================================== */}

                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      bg-white
                      px-4
                      pb-5
                      pt-4
                      sm:px-5
                      sm:pb-6
                      sm:pt-5
                    "
                  >
                    {/* PRODUCT TITLE */}

                    <Link
                      href={`/product/${product.slug}`}
                    >
                      <h3
                        className="
                          line-clamp-2
                          min-h-[32px]
                          text-[15px]
                          font-semibold
                          leading-6
                          tracking-[-0.01em]
                          text-gray-900
                          transition-colors
                          duration-300
                          hover:text-[rgb(207,0,6)]
                          sm:text-base
                          sm:leading-6
                        "
                      >
                        {product.title}
                      </h3>
                    </Link>

                    {/* ==================================================
                        PRICE
                    ================================================== */}

                    <div className="mt-1">
                      <div className="flex w-full items-end">
                        {/* LEFT */}

                        <div className="flex flex-col">
                          {/* DISCOUNT */}

                          <span
                            className="
                              mb-1
                              w-fit
                              rounded-md
                              bg-[rgb(207,0,6)]
                              px-2
                              py-1
                              text-[10px]
                              font-bold
                              leading-none
                              text-white
                            "
                          >
                            {product.discount}
                          </span>

                          {/* PRICE */}

                          <span
                            className="
                              text-[22px]
                              font-extrabold
                              leading-none
                              tracking-[-0.03em]
                              text-gray-950
                              sm:text-2xl
                            "
                          >
                            {product.price}
                          </span>

                          {/* GST */}

                          <span
                            className="
                              mt-1
                              text-[11px]
                              font-medium
                              text-gray-500
                              sm:text-xs
                            "
                          >
                            incl. GST
                          </span>
                        </div>

                        {/* DIVIDER */}

                        <span
                          className="
                            mx-4
                            h-12
                            w-px
                            bg-gray-300
                          "
                        />

                        {/* MRP */}

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                            whitespace-nowrap
                            pb-1
                          "
                        >
                          <span
                            className="
                              text-[11px]
                              font-medium
                              text-gray-400
                              sm:text-xs
                            "
                          >
                            MRP
                          </span>

                          <span
                            className="
                              text-[11px]
                              text-gray-400
                              line-through
                              sm:text-xs
                            "
                          >
                            {product.oldPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function Tiles() {
  return (
    <div className="w-full bg-white">
      {/* ======================================================
          1. TILES
      ====================================================== */}

      <CategoryCarousel
        title="Tiles"
        category="tiles"
        products={tileProducts}
        navigationId="tiles-carousel"
      />

      {/* ======================================================
          2. PLY WOOD & LAMINATES
      ====================================================== */}

      <CategoryCarousel
        title="Ply Wood & Laminates"
        category="plywood-laminates"
        products={plywoodProducts}
        navigationId="plywood-carousel"
      />

      {/* ======================================================
          3. PAINTS
      ====================================================== */}

      <CategoryCarousel
        title="Paints"
        category="paints"
        products={paintProducts}
        navigationId="paints-carousel"
      />
    </div>
  );
}