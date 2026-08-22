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
  ========================================================== */

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

  /* ==========================================================
     AUTOMATIC SLIDER
  ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => {
        return (prev + 1) % banners.length;
      });
    }, AUTO_SLIDE_TIME);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  /* ==========================================================
     NEXT SLIDE
  ========================================================== */

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      return (prev + 1) % banners.length;
    });
  };

  /* ==========================================================
     PREVIOUS SLIDE
  ========================================================== */

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      return (prev - 1 + banners.length) % banners.length;
    });
  };

  /* ==========================================================
     GET RELATIVE SLIDE POSITION
  ========================================================== */

  const getRelativePosition = (index: number) => {
    let position = index - currentSlide;

    if (position > banners.length / 2) {
      position -= banners.length;
    }

    if (position < -banners.length / 2) {
      position += banners.length;
    }

    return position;
  };

  return (
    <section
      aria-label="Featured interior products"
      className="
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* ======================================================
          FULL WIDTH HERO WRAPPER
      ====================================================== */}

      <div
        className="
          relative
          left-1/2
          w-screen
          -translate-x-1/2

          pt-[20px]

          sm:pt-[86px]

          lg:pt-[20px]
        "
      >
        {/* ====================================================
            HERO IMAGE SLIDER
        ==================================================== */}

        <div
          className="
            relative
            h-[178px]
            w-full

            sm:h-[280px]

            md:h-[340px]

            lg:h-[390px]

            xl:h-[420px]
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ==================================================
              SLIDES
          ================================================== */}

          {banners.map((banner, index) => {
            const position = getRelativePosition(index);

            const isActive = position === 0;

            /*
             * On mobile:
             * Only show the active image.
             *
             * This prevents the next/previous image from
             * appearing as a clipped strip on the sides.
             */

            if (isMobile && !isActive) {
              return null;
            }

            /*
             * DESKTOP
             *
             * Main image:
             * left edge  = 15vw
             * right edge = 85vw
             *
             * Previous image:
             * ends around 11vw
             *
             * Next image:
             * starts around 89vw
             *
             * Therefore the white gaps are approximately:
             *
             * 11vw → 15vw
             *
             * and
             *
             * 85vw → 89vw
             *
             * The arrows are placed at 13% and 87%.
             */

            const centerPosition = isMobile
              ? 50
              : 50 + position * 74;

            return (
              <div
                key={banner.src}
                className={`
                  absolute
                  top-0

                  h-full

                  overflow-hidden

                  rounded-xl

                  sm:rounded-2xl

                  lg:rounded-3xl

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    isActive
                      ? "z-20 opacity-100"
                      : "z-10 opacity-100"
                  }
                `}
                style={{
                  left: `${centerPosition}%`,

                  width: isMobile
                    ? "calc(100vw - 16px)"
                    : "70vw",

                  transform: "translateX(-50%)",
                }}
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  sizes="
                    (max-width: 767px) calc(100vw - 16px),
                    70vw
                  "
                  className="
                    select-none
                    object-cover
                    object-center
                  "
                  draggable={false}
                />

                {/* ==================================================
                    SIDE IMAGE OVERLAY
                ================================================== */}

                {!isActive && (
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/15
                    "
                  />
                )}
              </div>
            );
          })}

          {/* ==================================================
              PREVIOUS ARROW

              DESKTOP:
              Positioned in the white gap.

              MOBILE:
              Positioned inside the image.
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
              h-12
              w-12

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

              max-md:left-3
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronLeft
              size={20}
              strokeWidth={2}
              className="
                max-md:h-4
                max-md:w-4
              "
            />
          </button>

          {/* ==================================================
              NEXT ARROW

              DESKTOP:
              Positioned in the white gap.

              MOBILE:
              Positioned inside the image.
          ================================================== */}

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
              h-12
              w-12

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

              max-md:right-3
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
              className="
                max-md:h-4
                max-md:w-4
              "
            />
          </button>
        </div>

        {/* ====================================================
            PAGINATION
        ==================================================== */}

        <div
          className="
            flex
            h-9
            w-full

            items-center
            justify-center

            sm:h-12
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

              bg-white

              px-2
              py-1

              shadow-sm
            "
          >
            {banners.map((banner, index) => {
              const isActive =
                currentSlide === index;

              return (
                <button
                  key={banner.src}
                  type="button"
                  onClick={() =>
                    setCurrentSlide(index)
                  }
                  aria-label={`Go to banner ${
                    index + 1
                  }`}
                  aria-current={
                    isActive ? "true" : undefined
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
            EXPRESS DELIVERY
        ==================================================== */}

        <div
          className="
            relative

            mx-auto

            mt-2
            mb-5

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

            sm:mt-3
            sm:mb-14

            sm:w-[calc(100%-48px)]

            sm:rounded-2xl
          "
        >
          {/* ==================================================
              DECORATIVE GLOW
          ================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              -right-8
              -top-8

              h-20
              w-20

              rounded-full

              bg-[#ffb000]/10

              blur-2xl

              sm:h-32
              sm:w-32
            "
          />

          {/* ==================================================
              DELIVERY CONTENT
          ================================================== */}

          <div
            className="
              relative

              flex
              min-h-[64px]

              items-center

              gap-2

              px-2.5
              py-2

              sm:min-h-[88px]

              sm:gap-4

              sm:px-5
              sm:py-4

              lg:px-8
            "
          >
            {/* ==================================================
                TRUCK ICON
            ================================================== */}

            <div
              className="
                flex

                h-8
                w-8

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[#cf0006]

                text-white

                shadow-sm

                sm:h-12
                sm:w-12
              "
            >
              <Truck
                size={16}
                strokeWidth={2}
                className="
                  sm:h-[22px]
                  sm:w-[22px]
                "
              />
            </div>

            {/* ==================================================
                DELIVERY TEXT
            ================================================== */}

            <div className="min-w-0 flex-1">
              <div
                className="
                  flex
                  flex-wrap

                  items-center

                  gap-x-1

                  sm:gap-x-1.5
                "
              >
                <div
                  className="
                    flex
                    items-center

                    gap-0.5

                    text-[10px]
                    font-bold
                    leading-tight

                    text-[#cf0006]

                    sm:gap-1.5

                    sm:text-lg

                    lg:text-xl
                  "
                >
                  <Zap
                    size={10}
                    fill="currentColor"
                    strokeWidth={2}
                    className="
                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />

                  <span>
                    Express Delivery
                  </span>
                </div>

                <span
                  className="
                    text-[8px]
                    text-gray-300

                    sm:text-base
                  "
                >
                  •
                </span>

                <span
                  className="
                    text-[8px]
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

                  text-[8px]
                  leading-tight

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

                  gap-0.5

                  text-[7px]
                  font-medium

                  text-gray-400

                  sm:mt-1

                  sm:gap-1

                  sm:text-xs
                "
              >
                <MapPin
                  size={8}
                  strokeWidth={2}
                  className="
                    sm:h-3
                    sm:w-3
                  "
                />

                <span>
                  Available on select pincodes &
                  products
                </span>
              </div>
            </div>

            {/* ==================================================
                DELIVERY TIME BADGE
            ================================================== */}

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

          {/* ==================================================
              BOTTOM ACCENT
          ================================================== */}

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