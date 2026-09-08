"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Truck,
  Zap,
} from "lucide-react";

/* ==========================================================
   HERO BANNERS
========================================================== */

const banners = [
  {
    src: "/header/laminate.jpg",
    alt: "Premium laminate and interior materials",
  },
  {
    src: "/header/light.jpg",
    alt: "Modern lighting and interior products",
  },
  {
    src: "/header/ply.jpg",
    alt: "Premium plywood and interior materials",
  },
  {
    src: "/header/rug.jpg",
    alt: "Interior rugs and home finishing products",
  },
];

/* ==========================================================
   AUTO SLIDE SPEED
========================================================== */

const AUTO_SLIDE_TIME = 6500;

/* ==========================================================
   HERO COMPONENT
========================================================== */

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ==========================================================
     MOBILE DETECTION
     (mobile shows only the active slide — the peeking side
     images are a desktop/tablet effect, like the reference)
  ========================================================== */

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  /* ==========================================================
     AUTOMATIC SLIDER
  ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, AUTO_SLIDE_TIME);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  /* ==========================================================
     RELATIVE SLIDE POSITION
     0 = active, -1 = previous (peeks on the left),
     +1 = next (peeks on the right)
  ========================================================== */

  const getRelativePosition = (index: number) => {
    let position = index - currentSlide;

    if (position > banners.length / 2) position -= banners.length;
    if (position < -banners.length / 2) position += banners.length;

    return position;
  };

  return (
    <section
      aria-label="Featured interior products"
      className="w-full overflow-hidden bg-white"
    >
      {/* ======================================================
          FULL WIDTH WRAPPER — lets the side slides peek in
          from beyond the centered content column.
      ====================================================== */}

      <div
        className="
          relative
          left-1/2
          w-screen
          -translate-x-1/2

          pt-[76px]

          sm:pt-[96px]

          lg:pt-[24px]
        "
      >
        {/* ====================================================
            HERO SLIDER — center slide + peeking prev/next
        ==================================================== */}

        <div
          className="
            relative
            h-[190px]
            w-full

            sm:h-[300px]

            md:h-[360px]

            lg:h-[400px]

            xl:h-[430px]
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {banners.map((banner, index) => {
            const position = getRelativePosition(index);
            const isActive = position === 0;

            /* On mobile only the active slide is rendered —
               no peeking strips on small screens. */
            if (isMobile && !isActive) return null;

            /* Desktop: active slide spans ~70vw, centered.
               Previous/next slides sit ~74% further out,
               so a sliver of each peeks in from the edges. */
            const centerPosition = isMobile ? 50 : 50 + position * 74;

            return (
              <div
                key={banner.src}
                className={`
                  absolute
                  top-0

                  h-full

                  overflow-hidden

                  rounded-xl

                  border
                  border-gray-200

                  shadow-md

                  sm:rounded-2xl

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${isActive ? "z-20" : "z-10"}
                `}
                style={{
                  left: `${centerPosition}%`,
                  width: isMobile ? "calc(100vw - 16px)" : "70vw",
                  transform: "translateX(-50%)",
                }}
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 767px) calc(100vw - 16px), 70vw"
                  className="select-none object-cover object-center"
                  draggable={false}
                />

                {/* dim the peeking side slides */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/25" />
                )}
              </div>
            );
          })}

          {/* ==================================================
              ARROWS — sit in the gap between the active slide
              and the peeking side slides on desktop; sit inside
              the image on mobile.
          ================================================== */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            className="
              absolute
              left-[13%]
              top-1/2
              z-40

              flex
              h-11
              w-11

              -translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-gray-200

              bg-white

              text-gray-800

              shadow-md

              transition-all
              duration-200

              hover:border-[rgb(255,170,0)]
              hover:text-[rgb(207,0,6)]

              active:scale-95

              max-md:left-2
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronLeft size={20} strokeWidth={2} className="max-md:h-4 max-md:w-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="
              absolute
              right-[13%]
              top-1/2
              z-40

              flex
              h-11
              w-11

              translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-gray-200

              bg-white

              text-gray-800

              shadow-md

              transition-all
              duration-200

              hover:border-[rgb(255,170,0)]
              hover:text-[rgb(207,0,6)]

              active:scale-95

              max-md:right-2
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronRight size={20} strokeWidth={2} className="max-md:h-4 max-md:w-4" />
          </button>
        </div>

        {/* ====================================================
            PILL DOT PAGINATION — below the slider, like the
            reference screenshot.
        ==================================================== */}

        <div className="flex h-8 w-full items-center justify-center sm:h-10">
          <div
            className="
              flex
              items-center
              gap-1

              rounded-full

              border
              border-gray-200

              bg-white

              px-2
              py-1

              shadow-sm
            "
          >
            {banners.map((banner, index) => {
              const isActive = currentSlide === index;

              return (
                <button
                  key={banner.src}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to banner ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-3 items-center justify-center"
                >
                  <span
                    className={`
                      block
                      h-1.5

                      rounded-full

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "w-7 bg-[rgb(255,170,0)] sm:w-9"
                          : "w-1.5 bg-gray-300"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            EXPRESS DELIVERY — compact strip, always inside
            the first viewport (no extra scroll needed).
        ==================================================== */}

        <div
          className="
            relative

            mx-auto

            mb-3

            w-[calc(100%-16px)]

            max-w-[1100px]

            overflow-hidden

            rounded-xl

            border
            border-orange-100

            bg-gradient-to-r
            from-[#fff4df]
            via-[#fff9ef]
            to-white

            shadow-sm

            sm:mb-5

            sm:w-[calc(100%-48px)]

            sm:rounded-2xl
          "
        >
          <div
            className="
              relative

              flex
              min-h-[52px]

              items-center

              gap-2

              px-2.5
              py-1.5

              sm:min-h-[68px]

              sm:gap-4

              sm:px-5
              sm:py-3

              lg:px-8
            "
          >
            {/* TRUCK ICON */}

            <div
              className="
                flex

                h-7
                w-7

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[#cf0006]

                text-white

                shadow-sm

                sm:h-10
                sm:w-10
              "
            >
              <Truck
                size={14}
                strokeWidth={2}
                className="sm:h-[18px] sm:w-[18px]"
              />
            </div>

            {/* DELIVERY TEXT */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-1.5">
                <div
                  className="
                    flex
                    items-center

                    gap-0.5

                    text-[10px]
                    font-bold
                    leading-tight

                    text-[#cf0006]

                    sm:gap-1

                    sm:text-sm

                    lg:text-base
                  "
                >
                  <Zap
                    size={10}
                    fill="currentColor"
                    strokeWidth={2}
                    className="sm:h-[14px] sm:w-[14px]"
                  />
                  <span>Express Delivery</span>
                </div>

                <span className="text-[8px] text-gray-300 sm:text-sm">•</span>

                <span
                  className="
                    text-[8px]
                    font-semibold

                    text-[#a76d00]

                    sm:text-sm
                  "
                >
                  In 4 hours
                </span>
              </div>

              <p
                className="
                  hidden

                  text-xs
                  leading-tight

                  text-gray-600

                  sm:block
                "
              >
                Order before 4 PM to receive your order the same day.
              </p>

              <div
                className="
                  mt-0.5

                  flex
                  items-center

                  gap-0.5

                  text-[7px]
                  font-medium

                  text-gray-400

                  sm:gap-1

                  sm:text-[11px]
                "
              >
                <MapPin size={8} strokeWidth={2} className="sm:h-3 sm:w-3" />
                <span>Available on select pincodes &amp; products</span>
              </div>
            </div>

            {/* DELIVERY TIME BADGE (desktop) */}

            <div
              className="
                hidden

                shrink-0

                items-center

                gap-2

                rounded-full

                border
                border-orange-100

                bg-white

                px-3.5
                py-1.5

                shadow-sm

                md:flex
              "
            >
              <Clock3 size={15} className="text-[#ffab00]" />
              <span className="text-xs font-semibold text-gray-700">
                4 Hour Delivery
              </span>
            </div>
          </div>

          <div
            className="
              h-[2px]
              w-full

              bg-gradient-to-r
              from-[#ffab00]
              via-[#ff8a00]
              to-[#cf0006]
            "
          />
        </div>
      </div>
    </section>
  );
}
