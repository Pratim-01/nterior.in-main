"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlywoodLaminatesHero() {
  return (
    <section className="w-full bg-white">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1600px] px-4 pt-5.5 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm"
        >
          <Link
            href="/products"
            className="
              text-gray-500
              transition-colors
              duration-200
              hover:text-[rgb(207,0,6)]
            "
          >
            Home
          </Link>

          <span className="text-gray-300">/</span>

          <span className="font-medium text-gray-900">
            Tiles
          </span>
        </nav>
      </div>

      {/* =====================================================
          HERO BANNER
      ===================================================== */}

      <div className="mt-6 w-full">
        <div
          className="
            relative
            overflow-hidden
            bg-[#f3f1f5]
            shadow-sm
          "
        >
          <div
            className="
              relative
              min-h-[380px]
              lg:grid
              lg:min-h-[470px]
              lg:grid-cols-[42%_58%]
            "
          >
            {/* =================================================
                MOBILE BACKGROUND IMAGE
                Visible only below lg
            ================================================= */}

            <div className="absolute inset-0 lg:hidden">
              <Image
                src="https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern interior featuring plywood cabinetry and laminate finishes"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Dark overlay for text readability */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-black/60
                  via-black/50
                  to-black/75
                "
              />
            </div>

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="
    relative
    z-10
    flex
    min-h-[380px]
    flex-col
    justify-start
    px-5
    pt-16
    pb-8
    sm:px-8
    sm:pt-20
    sm:pb-10
    lg:min-h-[470px]
    lg:justify-center
    lg:px-14
    lg:py-12
    xl:px-16
  "
            >
              {/* =================================================
                  DESKTOP DECORATIVE BACKGROUND
              ================================================= */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-24
                  top-1/2
                  hidden
                  h-72
                  w-72
                  -translate-y-1/2
                  rounded-full
                  bg-orange-100/60
                  blur-3xl
                  lg:block
                "
              />

              <div className="relative">
                {/* =================================================
                    TOP LABEL
                ================================================= */}

                <div className="mb-5 flex items-center gap-2">
                  <span
                    className="
                      h-[2px]
                      w-10
                      bg-[rgb(255,170,0)]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[rgb(255,190,40)]
                      lg:text-[rgb(207,0,6)]
                      sm:text-xs
                    "
                  >
                    EXPLORE TILES
                  </span>
                </div>

                {/* =================================================
                    MAIN HEADING
                ================================================= */}

                <h1
                  className="
                    max-w-[560px]
                    text-4xl
                    font-black
                    leading-[0.98]
                    tracking-tight
                    text-white
                    sm:text-5xl
                    lg:text-[52px]
                    lg:text-[#202020]
                    xl:text-[58px]
                  "
                >
                  Beautiful Tiles.
                  <br />

                  <span
                    className="
                      text-[rgb(255,190,40)]
                      lg:text-[rgb(207,0,6)]
                    "
                  >
                    Exceptional Spaces.
                  </span>
                </h1>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    mt-5
                    max-w-[510px]
                    text-sm
                    leading-6
                    text-white/90
                    sm:text-base
                    sm:leading-7
                    lg:text-gray-600
                  "
                >
                  From timeless floor tiles to contemporary wall finishes, discover durable surfaces designed to bring style, character and lasting beauty to every space.
                </p>

                {/* =================================================
                    TRUST POINTS
                ================================================= */}

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {/* FAST DELIVERY */}

                  <div className="flex items-center gap-2">
                    <span
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgb(207,0,6)]
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      ✓
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-white
                        lg:text-gray-700
                      "
                    >
                      Fast Delivery
                    </span>
                  </div>

                  {/* 100% AUTHENTIC */}

                  <div className="flex items-center gap-2">
                    <span
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[rgb(207,0,6)]
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      ✓
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-white
                        lg:text-gray-700
                      "
                    >
                      100% Authentic
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
                Desktop only
            ================================================= */}

            <div
              className="
                relative
                hidden
                min-h-[470px]
                overflow-hidden
                lg:block
              "
            >
              <Image
                src="https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern interior featuring plywood cabinetry and laminate finishes"
                fill
                priority
                sizes="58vw"
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
              />
            </div>
          </div>

          {/* =====================================================
              BOTTOM COLOR ACCENT
          ===================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              z-20
              h-1
              w-full
              bg-gradient-to-r
              from-[rgb(255,170,0)]
              via-[rgb(255,110,0)]
              to-[rgb(207,0,6)]
            "
          />
        </div>
      </div>
    </section>
  );
}