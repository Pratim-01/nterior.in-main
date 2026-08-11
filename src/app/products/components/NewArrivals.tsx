"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Check } from "lucide-react";

/* ==========================================================
   SHOWCASE DATA
========================================================== */

const showcaseItems = [
  {
    id: 1,
    title: "Interior Essentials",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    alt: "Modern interior with premium home and building essentials",
  },
  {
    id: 2,
    title: "Home Solutions",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop",
    alt: "Modern home interior with quality products and finishes",
  },
  {
    id: 3,
    title: "Kitchen Essentials",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop",
    alt: "Modern kitchen with contemporary interior solutions",
  },
  {
    id: 4,
    title: "Building Solutions",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    alt: "Modern space with building and interior solutions",
  },
  {
    id: 5,
    title: "Interior Finishes",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    alt: "Elegant interior with premium finishes and materials",
  },
];

/* ==========================================================
   COMPONENT
========================================================== */

export default function InteriorShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* ========================================================
     AUTOMATIC SLIDE
  ======================================================== */

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % showcaseItems.length;
      });
    }, 4200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* ========================================================
     GET CARD POSITION

     -2 = far top
     -1 = near top
      0 = active / center
      1 = near bottom
      2 = far bottom
  ======================================================== */

  const getPosition = (index: number) => {
    const total = showcaseItems.length;

    let position = index - activeIndex;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  };

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[rgb(255,245,245)]
        py-10
        sm:py-14
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-10
          px-4
          sm:px-6
          lg:grid-cols-[0.95fr_1fr]
          lg:gap-14
          xl:gap-16
        "
      >
        {/* ==================================================
            LEFT — IMAGE STACK
        ================================================== */}

        <div className="relative w-full">
          {/* ==================================================
              5 IMAGE STACK
          ================================================== */}

          <div
            className="
              relative
              h-[350px]
              w-full
              sm:h-[375px]
              lg:h-[400px]
            "
          >
            {showcaseItems.map((item, index) => {
              const position = getPosition(index);

              if (position < -2 || position > 2) {
                return null;
              }

              const isActive = position === 0;
              const isNearTop = position === -1;
              const isFarTop = position === -2;
              const isNearBottom = position === 1;
              const isFarBottom = position === 2;

              /* ==================================================
                 VERTICAL POSITION
              ================================================== */

              let translateY = 0;

              if (position === -2) {
                translateY = -92;
              }

              if (position === -1) {
                translateY = -52;
              }

              if (position === 1) {
                translateY = 52;
              }

              if (position === 2) {
                translateY = 92;
              }

              /* ==================================================
                 SCALE
              ================================================== */

              let scale = 1;

              if (position === -1 || position === 1) {
                scale = 0.97;
              }

              if (position === -2 || position === 2) {
                scale = 0.94;
              }

              /* ==================================================
                 OPACITY
              ================================================== */

              let opacity = 1;

              if (position === -1 || position === 1) {
                opacity = 0.3;
              }

              if (position === -2 || position === 2) {
                opacity = 0.12;
              }

              /* ==================================================
                 Z INDEX
              ================================================== */

              let zIndex = 10;

              if (position === -1 || position === 1) {
                zIndex = 20;
              }

              if (isActive) {
                zIndex = 50;
              }

              /* ==================================================
                 FADE MASK
              ================================================== */

              let maskImage = "none";

              if (isNearTop) {
                maskImage =
                  "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)";
              }

              if (isFarTop) {
                maskImage =
                  "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)";
              }

              if (isNearBottom) {
                maskImage =
                  "linear-gradient(to top, black 0%, black 45%, transparent 100%)";
              }

              if (isFarBottom) {
                maskImage =
                  "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)";
              }

              return (
                <div
                  key={item.id}
                  className="
                    absolute
                    left-0
                    top-1/2
                    w-full
                    will-change-transform
                    transition-all
                    duration-[1100ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                  "
                  style={{
                    transform: `
                      translate3d(
                        0,
                        calc(-50% + ${translateY}px),
                        0
                      )
                      scale(${scale})
                    `,
                    opacity,
                    zIndex,
                    pointerEvents: isActive ? "auto" : "none",

                    ...(maskImage !== "none"
                      ? {
                          WebkitMaskImage: maskImage,
                          maskImage: maskImage,
                          WebkitMaskSize: "100% 100%",
                          maskSize: "100% 100%",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                        }
                      : {}),
                  }}
                >
                  {/* ==================================================
                      IMAGE CARD
                  ================================================== */}

                  <div
                    className="
                      relative
                      aspect-[1.9/1]
                      w-full
                      overflow-hidden
                      rounded-[24px]
                      bg-gray-200
                      shadow-xl
                      sm:rounded-[28px]
                    "
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      priority={index === 0}
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 90vw,
                        50vw
                      "
                      className={`
                        object-cover
                        transition-transform
                        duration-[5000ms]
                        ease-out
                        ${isActive ? "scale-105" : "scale-100"}
                      `}
                    />

                    {/* ==================================================
                        ACTIVE IMAGE GRADIENT
                    ================================================== */}

                    {isActive && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-[24px]
                          bg-gradient-to-t
                          from-black/75
                          via-black/15
                          to-transparent
                          sm:rounded-[28px]
                        "
                      />
                    )}

                    {/* ==================================================
                        BACKGROUND IMAGE SOFTENING
                    ================================================== */}

                    {!isActive && (
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-[rgb(255,245,245)]/20
                        "
                      />
                    )}

                    {/* ==================================================
                        ACTIVE CONTENT
                    ================================================== */}

                    {isActive && (
                      <div
                        className="
                          absolute
                          bottom-5
                          left-5
                          right-5
                          sm:bottom-6
                          sm:left-7
                          sm:right-7
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[rgb(255,170,0)]
                            sm:text-[10px]
                          "
                        >
                          Featured Collection
                        </p>

                        <h3
                          className="
                            mt-1
                            text-xl
                            font-black
                            leading-tight
                            tracking-tight
                            text-white
                            sm:text-2xl
                            lg:text-3xl
                          "
                        >
                          {item.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================================================
              PROGRESS INDICATORS
          ================================================== */}

          <div
            className="
              relative
              z-[60]
              mt-3
              flex
              items-center
              justify-center
              gap-1.5
              sm:mt-4
            "
          >
            {showcaseItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                className={`
                  h-1
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    index === activeIndex
                      ? "w-8 bg-[rgb(255,170,0)]"
                      : "w-2 bg-[rgb(207,0,6)]/20"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ==================================================
            RIGHT CONTENT
        ================================================== */}

        <div className="max-w-xl">
          {/* ==================================================
              EYEBROW
          ================================================== */}

          <div className="mb-4 flex items-center gap-3">
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
              Explore Home & Interior Essentials
            </span>
          </div>

          {/* ==================================================
              SEO HEADING
          ================================================== */}

          <h2
            className="
              max-w-xl
              text-3xl
              font-black
              leading-[1.05]
              tracking-[-0.035em]
              text-[rgb(207,0,6)]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Everything You Need to Build Better Spaces
          </h2>

          {/* ==================================================
              SEO DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-4
              max-w-lg
              text-sm
              leading-6
              text-[rgb(120,90,0)]
              sm:mt-5
              sm:text-lg
              sm:leading-7
            "
          >
            Discover tiles, electricals, hardware, lighting, paints
            and more for modern homes and interiors.
          </p>

          {/* ==================================================
              FEATURES
          ================================================== */}

          <div
            className="
              mt-6
              space-y-3.5
              sm:mt-8
              sm:space-y-4
            "
          >
            {[
              "Quality products for every space",
              "Tiles, electricals and building essentials",
              "Modern designs and reliable materials",
              "Everything for your home and interior projects",
            ].map((feature) => (
              <div
                key={feature}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[rgb(255,170,0)]
                    text-white
                  "
                >
                  <Check
                    size={12}
                    strokeWidth={3}
                  />
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[rgb(207,0,6)]
                    sm:text-base
                  "
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* ==================================================
              CTA
          ================================================== */}

          <Link
            href="/products"
            className="
              group
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[rgb(207,0,6)]
              px-6
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[rgb(180,0,5)]
              hover:shadow-xl
              sm:mt-8
            "
          >
            Explore Products

            <ArrowRight
              size={17}
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