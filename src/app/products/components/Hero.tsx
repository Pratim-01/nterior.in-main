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

const banners = [
  {
    src: "/header/laminate.jpg",
    alt: "Modern laminate interior materials",
  },
  {
    src: "/header/light.jpg",
    alt: "Modern lighting and interior design",
  },
  {
    src: "/header/ply.jpg",
    alt: "Premium plywood and interior materials",
  },
  {
    src: "/header/rug.jpg",
    alt: "Modern rugs and interior decor",
  },
];

const AUTO_SLIDE_TIME = 1500;

/*
 * Desktop:
 * 2 images per slide
 *
 * Slide 1:
 * laminate + light
 *
 * Slide 2:
 * ply + rug
 */
const desktopSlides = [
  [banners[0], banners[1]],
  [banners[2], banners[3]],
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* =========================================================
     DETECT MOBILE SCREEN
  ========================================================= */

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  /*
   * Mobile = 4 slides
   * Desktop = 2 slides
   */
  const totalSlides = isMobile
    ? banners.length
    : desktopSlides.length;

  /* =========================================================
     RESET SLIDE WHEN SCREEN SIZE CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  /* =========================================================
     AUTOMATIC SLIDER
  ========================================================= */

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_TIME);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, totalSlides]);

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + totalSlides) % totalSlides
    );
  };

  return (
    <section
      aria-label="Featured interior design banners"
      className="w-full bg-white"
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]

          px-3
          pt-[84px]

          sm:px-6 
          sm:pt-[88px]

          lg:px-8
          lg:pt-[136px]

          xl:px-0
        "
      >
        {/* ===================================================
            HERO AREA
        =================================================== */}

        <div
  className="relative mt-14 w-full md:mt-0"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
          {/* =================================================
              IMAGE CONTAINER
          ================================================= */}

          <div
            className="
              relative
              h-[215px]
              w-full
              overflow-hidden
              rounded-xl

              sm:h-[300px]
              sm:rounded-2xl
              

              md:h-[360px]

              lg:h-[400px]
              lg:rounded-3xl

              xl:h-[420px]
            "
          >
            {/* =================================================
                MOBILE SLIDES
                ONE IMAGE
            ================================================= */}

            {isMobile &&
              banners.map((banner, index) => {
                const isActive = currentSlide === index;

                return (
                  <div
                    key={banner.src}
                    className={`
                      absolute
                      inset-0
                      overflow-hidden
                      transition-opacity
                      duration-700
                      ease-in-out
                      ${isActive
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0"
                      }
                    `}
                  >
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="
                        select-none
                        object-cover
                        object-center
                      "
                      draggable={false}
                    />
                  </div>
                );
              })}

            {/* =================================================
                DESKTOP SLIDES
                TWO IMAGES PER SLIDE
            ================================================= */}

            {!isMobile &&
              desktopSlides.map((slide, slideIndex) => {
                const isActive = currentSlide === slideIndex;

                return (
                  <div
                    key={slideIndex}
                    className={`
                      absolute
                      inset-0
                      flex
                      gap-2
                      p-2

                      transition-opacity
                      duration-700
                      ease-in-out

                      sm:gap-3
                      sm:p-3

                      ${isActive
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0"
                      }
                    `}
                  >
                    {/* FIRST IMAGE */}

                    <div
                      className="
                        relative
                        h-full
                        min-w-0
                        flex-1
                        overflow-hidden
                        rounded-xl

                        sm:rounded-2xl
                      "
                    >
                      <Image
                        src={slide[0].src}
                        alt={slide[0].alt}
                        fill
                        priority={slideIndex === 0}
                        sizes="
                          (max-width: 1024px) 50vw,
                          700px
                        "
                        className="
                          select-none
                          object-cover
                          object-center
                        "
                        draggable={false}
                      />
                    </div>

                    {/* SECOND IMAGE */}

                    <div
                      className="
                        relative
                        h-full
                        min-w-0
                        flex-1
                        overflow-hidden
                        rounded-xl

                        sm:rounded-2xl
                      "
                    >
                      <Image
                        src={slide[1].src}
                        alt={slide[1].alt}
                        fill
                        priority={slideIndex === 0}
                        sizes="
                          (max-width: 1024px) 50vw,
                          700px
                        "
                        className="
                          select-none
                          object-cover
                          object-center
                        "
                        draggable={false}
                      />
                    </div>
                  </div>
                );
              })}

            {/* =================================================
                LEFT ARROW
            ================================================= */}

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous banner"
              className="
                absolute
                left-2
                top-1/2
                z-30
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/50
                bg-black/35
                text-white
                shadow-md
                backdrop-blur-md
                transition-all
                duration-200
                hover:bg-[rgb(207,0,6)]
                active:scale-95

                sm:left-4
                sm:h-10
                sm:w-10

                md:left-5
                md:h-11
                md:w-11

                lg:left-6
                lg:h-12
                lg:w-12
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={2.2}
                className="sm:h-5 sm:w-5"
              />
            </button>

            {/* =================================================
                RIGHT ARROW
            ================================================= */}

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next banner"
              className="
                absolute
                right-2
                top-1/2
                z-30
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/50
                bg-black/35
                text-white
                shadow-md
                backdrop-blur-md
                transition-all
                duration-200
                hover:bg-[rgb(207,0,6)]
                active:scale-95

                sm:right-4
                sm:h-10
                sm:w-10

                md:right-5
                md:h-11
                md:w-11

                lg:right-6
                lg:h-12
                lg:w-12
              "
            >
              <ChevronRight
                size={17}
                strokeWidth={2.2}
                className="sm:h-5 sm:w-5"
              />
            </button>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="
              flex
              h-9
              w-full
              items-center
              justify-center

              sm:h-11
            "
          >
            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                border
                border-gray-200
                bg-gray-100/90
                px-2
                py-1
                shadow-sm

                sm:gap-1.5
                sm:px-2.5
                sm:py-1.5
              "
            >
              {Array.from({
                length: totalSlides,
              }).map((_, index) => {
                const isActive =
                  currentSlide === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCurrentSlide(index)
                    }
                    aria-label={`Go to banner ${index + 1
                      }`}
                    aria-current={
                      isActive
                        ? "true"
                        : undefined
                    }
                    className="
                      flex
                      h-3
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className={`
                        block
                        h-1.5
                        rounded-full
                        transition-all
                        duration-300
                        ${isActive
                          ? "w-6 bg-[rgb(255,170,0)] sm:w-9"
                          : "w-1.5 bg-gray-400 hover:bg-gray-600"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              EXPRESS DELIVERY
          ================================================= */}

          <div
            className="
    relative
    mx-auto
    mt-2
    mb-3
    w-full
    max-w-[1200px]
    overflow-hidden
    rounded-xl
    border
    border-orange-100
    bg-gradient-to-r
    from-[#fff4df]
    via-[#fff9ef]
    to-white
    shadow-sm

    sm:mt-3
    sm:mb-14
    sm:rounded-2xl

    lg:max-w-[900px]
  "
          >
            {/* Decorative glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-[#ffb000]/10
                blur-2xl

                sm:h-32
                sm:w-32
              "
            />

            <div
              className="
                relative
                flex
                min-h-[68px]
                items-center
                gap-2
                px-3
                py-2.5

                sm:min-h-[88px]
                sm:gap-4
                sm:px-5
                sm:py-4

                lg:px-8
              "
            >
              {/* DELIVERY ICON */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#cf0006]
                  text-white
                  shadow-md

                  sm:h-12
                  sm:w-12
                "
              >
                <Truck
                  size={18}
                  strokeWidth={2}
                  className="sm:h-[22px] sm:w-[22px]"
                />
              </div>

              {/* DELIVERY TEXT */}

              <div className="min-w-0 flex-1">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-1.5
                    gap-y-0.5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-[11px]
                      font-bold
                      leading-tight
                      text-[#cf0006]

                      sm:gap-1.5
                      sm:text-lg

                      lg:text-xl
                    "
                  >
                    <Zap
                      size={12}
                      fill="currentColor"
                      strokeWidth={2}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    <span>
                      Express Delivery
                    </span>
                  </div>

                  <span
                    className="
                      hidden
                      text-gray-300
                      sm:inline
                    "
                  >
                    •
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      text-[#a76d00]

                      sm:text-base
                    "
                  >
                    In 4 hours
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[9px]
                    leading-relaxed
                    text-gray-600

                    sm:mt-1
                    sm:text-sm
                  "
                >
                  Order before 4 PM to receive your
                  order in 4 hours.
                </p>

                <div
                  className="
                    mt-0.5
                    flex
                    items-center
                    gap-1
                    text-[8px]
                    font-medium
                    text-gray-400

                    sm:mt-1
                    sm:text-xs
                  "
                >
                  <MapPin
                    size={9}
                    strokeWidth={2}
                    className="sm:h-3 sm:w-3"
                  />

                  <span className="truncate">
                    Available on select pincodes
                    &amp; products
                  </span>
                </div>
              </div>

              {/* TIME BADGE */}

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
                  px-4
                  py-2
                  shadow-sm

                  md:flex
                "
              >
                <Clock3
                  size={17}
                  className="text-[#ffab00]"
                />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  4 Hour Delivery
                </span>
              </div>
            </div>

            {/* Bottom accent */}

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
      </div>
    </section>
  );
}