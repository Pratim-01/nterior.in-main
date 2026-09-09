"use client";

/* ==========================================================
   Top Brands
   ----------------------------------------------------------
   Displays trusted brands across the store categories.

   Brand logos are stored locally inside:
   public/brands/

   The logos scroll continuously (a true seamless marquee,
   not a step-by-step autoplay slider).
   Brand cards are display-only and are not clickable.
========================================================== */

import Image from "next/image";

/* ==========================================================
   Brand Data
========================================================== */

const brands = [
  {
    id: 1,
    name: "Amulia Mica",
    logo: "/brands/amulia.png",
  },

  {
    id: 2,
    name: "Build Associates",
    logo: "/brands/buildassociates.jpeg",
  },

  {
    id: 3,
    name: "CenturyPly",
    logo: "/brands/century.jpg",
  },

  {
    id: 4,
    name: "Ebco",
    logo: "/brands/ebco.jpeg",
  },

  {
    id: 5,
    name: "Fevicol",
    logo: "/brands/fevicol.jpg",
  },

  {
    id: 6,
    name: "Finolex",
    logo: "/brands/finolex.png",
  },

  {
    id: 7,
    name: "Max",
    logo: "/brands/max.jpeg",
  },

  {
    id: 8,
    name: "Vir Laminates",
    logo: "/brands/vir.png",
  },
];

/* Duplicated once so the marquee loops seamlessly at
   translateX(-50%) — see .animate-scroll in globals.css. */
const marqueeBrands = [...brands, ...brands];

/* ==========================================================
   Top Brands Component
========================================================== */

export default function TopBrands() {
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
            SECTION HEADER
        ====================================================== */}

        <div
          className="
            mb-7
            max-w-3xl
            sm:mb-9
          "
        >
          {/* ====================================================
              EYEBROW
          ==================================================== */}

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
              Trusted Brands
            </span>
          </div>

          {/* ====================================================
              HEADING
          ==================================================== */}

          <h2
            className="
              max-w-2xl
              text-3xl
              font-black
              leading-[1]
              tracking-[-0.035em]
              text-[rgb(207,0,6)]
              sm:text-4xl
            "
          >
            Trusted Brands for Every Project
          </h2>

          {/* ====================================================
              DESCRIPTION
          ==================================================== */}

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-[rgb(120,90,0)]
              sm:text-base
              sm:leading-7
            "
          >
            Shop quality products from trusted brands across
            electricals, hardware, laminates, panels and more.
          </p>
        </div>

        {/* ======================================================
            BRAND SLIDER — continuous seamless marquee
            Kept inside the same max-w-7xl container as the
            header above, instead of bleeding full viewport width.
        ====================================================== */}

        {/* accessible list for screen readers — the marquee track
            below is decorative/duplicated and hidden from assistive tech */}
        <span className="sr-only">
          Brands we work with: {brands.map((brand) => brand.name).join(", ")}.
        </span>

        <div className="group relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="
              animate-scroll

              flex
              w-max
              items-stretch

              gap-3

              will-change-transform

              group-hover:[animation-play-state:paused]

              motion-reduce:animate-none

              sm:gap-4
            "
            style={{ animationDuration: "40s" }}
          >
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="
                  flex
                  w-[150px]
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  px-4
                  py-5
                  text-center
                  shadow-sm
                  sm:w-[180px]
                  sm:rounded-3xl
                "
              >
                {/* ==================================================
                    BRAND LOGO
                ================================================== */}

                <div
                  className="
                    relative
                    h-16
                    w-32
                    sm:h-20
                    sm:w-36
                  "
                >
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="
                      (max-width: 640px) 128px,
                      144px
                    "
                    className="
                      object-contain
                    "
                  />
                </div>

                {/* ==================================================
                    BRAND NAME
                ================================================== */}

                <h3
                  className="
                    mt-3
                    text-xs
                    font-semibold
                    text-gray-800
                    sm:text-sm
                  "
                >
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
