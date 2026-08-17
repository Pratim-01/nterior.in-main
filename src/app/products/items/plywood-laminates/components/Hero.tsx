"use client";

import Image from "next/image";
import Link from "next/link";

export default function PlywoodLaminatesHero() {
  return (
    <section className="w-full bg-white">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1600px] px-4 pt-5 sm:px-6 lg:px-8">
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
            Plywood & Laminates
          </span>
        </nav>
      </div>

      {/* =====================================================
          HERO BANNER
      ===================================================== */}

      <div className="mx-auto mt-15 w-full max-w-[1600px] px-0 sm:px-4 lg:px-6">
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
              grid
              min-h-[430px]
              lg:grid-cols-[42%_58%]
              lg:min-h-[470px]
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="
                relative
                flex
                flex-col
                justify-center
                px-6
                py-12
                sm:px-10
                sm:py-14
                lg:px-14
                xl:px-16
              "
            >
              {/* Soft decorative background */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-24
                  top-1/2
                  h-72
                  w-72
                  -translate-y-1/2
                  rounded-full
                  bg-orange-100/60
                  blur-3xl
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
                      text-[rgb(207,0,6)]
                      sm:text-xs
                    "
                  >
                    Explore Plywood & Laminates
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
                    text-[#202020]
                    sm:text-5xl
                    lg:text-[52px]
                    xl:text-[58px]
                  "
                >
                  Strong Boards.
                  <br />

                  <span className="text-[rgb(207,0,6)]">
                    Beautiful Surfaces.
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
                    text-gray-600
                    sm:text-base
                    sm:leading-7
                  "
                >
                  From durable plywood to contemporary laminates, find
                  materials designed for everyday performance and made to
                  complement modern interiors.
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
                        text-gray-700
                      "
                    >
                      Fast Delivery
                    </span>
                  </div>

                  {/* AUTHENTIC */}

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
                        text-gray-700
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
            ================================================= */}

            <div
              className="
                relative
                min-h-[280px]
                overflow-hidden
                sm:min-h-[360px]
                lg:min-h-[470px]
              "
            >
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                alt="Modern interior featuring plywood cabinetry and laminate finishes"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
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