"use client";

/* ==========================================================
   Top Brands
   ----------------------------------------------------------
   Premium furniture and interior brand carousel.

   Brand logos are stored locally inside:
   public/brands/

   The slider uses React refs for reliable custom navigation.
========================================================== */

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

/* ==========================================================
   Brand Data
========================================================== */

const brands = [
  {
    id: 1,
    name: "Havells",
    logo: "/brands/havells.png",
    offer: "Up to 40% OFF",
    slug: "havells",
  },

  {
    id: 2,
    name: "Bosch",
    logo: "/brands/bosch.png",
    offer: "Up to 40% OFF",
    slug: "bosch",
  },

  {
    id: 3,
    name: "Taparia",
    logo: "/brands/taparia.png",
    offer: "Up to 15% OFF",
    slug: "taparia",
  },

  {
    id: 4,
    name: "Anchor",
    logo: "/brands/anchor.png",
    offer: "Up to 50% OFF",
    slug: "anchor",
  },

  {
    id: 5,
    name: "Greenply",
    logo: "/brands/greenply.png",
    offer: "Extra 2% OFF",
    slug: "greenply",
  },

  {
    id: 6,
    name: "Hettich",
    logo: "/brands/hettich.png",
    offer: "Up to 20% OFF",
    slug: "hettich",
  },
];

/* ==========================================================
   Top Brands Component
========================================================== */

export default function TopBrands() {
  /* ==========================================================
     Navigation References
  ========================================================== */

  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  /* ==========================================================
     Swiper Instance
  ========================================================== */

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[rgb(255,245,245)]
        py-10
        sm:py-14
        md:py-16
      "
    >
      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

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
            mb-7
            flex
            flex-col
            gap-6
            sm:mb-9
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* ====================================================
              TEXT CONTENT
          ==================================================== */}

          <div className="max-w-3xl">
            {/* EYEBROW */}

            <div className="mb-3 flex items-center gap-3">
              <span
                className="
                  h-px
                  w-8
                  bg-[rgb(255,170,0)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-[rgb(255,170,0)]
                  sm:text-[11px]
                "
              >
                Premium Brands
              </span>
            </div>

            {/* SEO HEADING */}

            <h2
              className="
                max-w-3xl
                text-3xl
                font-black
                leading-[0.98]
                tracking-[-0.035em]
                text-[rgb(207,0,6)]
                sm:text-4xl
              "
            >
              Trusted Furniture &amp; Interior Brands
            </h2>

            {/* SEO DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-[rgb(120,90,0)]
                sm:text-lg
                sm:leading-7
              "
            >
              Explore leading furniture, lighting, kitchen, hardware
              and home interior brands selected for quality, style
              and lasting performance.
            </p>
          </div>

          {/* ====================================================
              HEADER CONTROLS
          ==================================================== */}

          <div
            className="
              flex
              w-full
              items-center
              justify-end
              gap-3
              md:w-auto
            "
          >
            {/* ==================================================
                VIEW ALL
            ================================================== */}

            <Link
              href="/brands"
              className="
                group
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-900
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(207,0,6)]
                hover:text-white
                hover:shadow-lg
              "
            >
              View All

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* ==================================================
                PREVIOUS
            ================================================== */}

            <button
              ref={prevButtonRef}
              type="button"
              aria-label="Previous brands"
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                text-gray-900
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(207,0,6)]
                hover:text-white
                hover:shadow-lg
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* ==================================================
                NEXT
            ================================================== */}

            <button
              ref={nextButtonRef}
              type="button"
              aria-label="Next brands"
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                text-gray-900
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(207,0,6)]
                hover:text-white
                hover:shadow-lg
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ======================================================
            BRAND SLIDER
        ====================================================== */}

        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              prevEl: prevButtonRef.current,
              nextEl: nextButtonRef.current,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={700}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              /* ==================================================
                 MOBILE
              ================================================== */

              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },

              /* ==================================================
                 SMALL MOBILE
              ================================================== */

              480: {
                slidesPerView: 2,
                spaceBetween: 12,
              },

              /* ==================================================
                 TABLET
              ================================================== */

              640: {
                slidesPerView: 3,
                spaceBetween: 14,
              },

              768: {
                slidesPerView: 4,
                spaceBetween: 16,
              },

              /* ==================================================
                 DESKTOP
              ================================================== */

              1024: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
            }}
            className="!overflow-hidden"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                {/* ==================================================
                    BRAND CARD
                ================================================== */}

                <Link
                  href={`/brands/${brand.slug}`}
                  className="
                    group
                    relative
                    flex
                    min-h-[190px]
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white
                    bg-white
                    px-4
                    py-6
                    text-center
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:min-h-[205px]
                    sm:rounded-3xl
                  "
                >
                  {/* ==================================================
                      DECORATIVE GOLD LINE
                  ================================================== */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-1
                      w-0
                      -translate-x-1/2
                      rounded-full
                      bg-[rgb(255,170,0)]
                      transition-all
                      duration-500
                      group-hover:w-16
                    "
                  />

                  {/* ==================================================
                      SOFT HOVER GLOW
                  ================================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-24
                      w-24
                      rounded-full
                      bg-[rgb(255,170,0)]/10
                      opacity-0
                      blur-2xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* ==================================================
                      BRAND LOGO
                  ================================================== */}

                  <div
                    className="
                      relative
                      h-20
                      w-36
                      sm:h-24
                      sm:w-44
                    "
                  >
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="
                        (max-width: 640px) 144px,
                        176px
                      "
                      className="
                        object-contain
                        transition-all
                        duration-500
                        group-hover:scale-110
                      "
                    />
                  </div>

                  {/* ==================================================
                      BRAND NAME
                  ================================================== */}

                  <h3
                    className="
                      mt-3
                      text-sm
                      font-bold
                      text-[rgb(207,0,6)]
                      transition-colors
                      duration-300
                      group-hover:text-[rgb(255,170,0)]
                    "
                  >
                    {brand.name}
                  </h3>

                  {/* ==================================================
                      OFFER
                  ================================================== */}

                  <p
                    className="
                      mt-1.5
                      text-xs
                      font-medium
                      text-[rgb(120,90,0)]
                    "
                  >
                    {brand.offer}
                  </p>

                  {/* ==================================================
                      EXPLORE
                  ================================================== */}

                  <span
                    className="
                      mt-3
                      flex
                      items-center
                      gap-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[rgb(255,170,0)]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    Explore

                    <ChevronRight size={12} />
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}