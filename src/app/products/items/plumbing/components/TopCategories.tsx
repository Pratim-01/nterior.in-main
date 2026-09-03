"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Accessories",
    description: "Essential accessories for reliable plumbing solutions",
    image:
      "https://images.unsplash.com/photo-1598996544594-8e2deb84f1f8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    // Updated route
    href: "/products/items/plumbing/accessories",
  },
  {
    id: 2,
    name: "Tapes,Adhesives and Cleaner",
    description: "Durable sealing tapes for secure connections",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/products/items/plumbing/tapes-adhesives-and-cleaners",
  },
  {
    id: 3,
    name: "Pumps",
    description: "Efficient pumps for dependable water flow.",
    image:
      "https://images.unsplash.com/photo-1722710070506-eb16da390855?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/products/items/plumbing/pumps",
  },
  {
    id: 4,
    name: "Fittings",
    description: "Quality fittings for secure plumbing connections",
    image:
      "https://images.unsplash.com/photo-1560636201-c08c2b24e147?q=80&w=1324&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/products/items/plumbing/fittings",
  },
  {
    id: 5,
    name: "Tanks",
    description: "Durable tanks for safe water storage",
    image:
      "https://images.unsplash.com/photo-1630732347607-3a89a66447e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/products/items/plumbing/tanks",
  },
];

export default function TopCategories() {
  return (
    <section className="w-full bg-white px-4 pt-10 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-10 lg:pt-10 lg:pb-20">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* HEADER */}

        <div className="mb-8 sm:mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-9 bg-[rgb(255,170,0)]" />

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
              Explore Our Range
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-[#202020]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Shop Plumbing Accessories
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
              sm:text-base
              sm:leading-7
            "
          >
            Explore essential plumbing fittings and accessories designed to support modern bathrooms, kitchens and everyday plumbing needs.
          </p>
        </div>

        {/* CATEGORY CARDS */}

        <div
          className="
            grid
            grid-cols-3
            gap-3
            sm:gap-5
            md:grid-cols-3
            lg:grid-cols-5
            justify-center
          "
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-100
                hover:shadow-[0_14px_35px_rgba(0,0,0,0.10)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[rgb(207,0,6)]
                focus-visible:ring-offset-2
              "
            >
              {/* IMAGE */}

              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 sm:aspect-[5/4]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* IMAGE GRADIENT */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/65
                    via-black/10
                    to-transparent
                    opacity-80
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* ARROW */}

                <div
                  className="
                    absolute
                    right-3
                    top-3
                    flex
                    h-9
                    w-9
                    translate-y-1
                    items-center
                    justify-center
                    rounded-full
                    bg-white/95
                    text-[rgb(207,0,6)]
                    opacity-0
                    shadow-md
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                  />
                </div>

                {/* CARD CONTENT */}

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3
                    className="
                      text-base
                      font-bold
                      text-white
                      sm:text-lg
                    "
                  >
                    {category.name}
                  </h3>

                  <p
                    className="
                      mt-1
                      hidden
                      text-xs
                      leading-5
                      text-white
                      sm:block
                    "
                  >
                    {category.description}
                  </p>
                </div>
              </div>

              {/* THEME ACCENT */}

              <div
                aria-hidden="true"
                className="
                  h-1
                  w-full
                  bg-gradient-to-r
                  from-[rgb(255,170,0)]
                  via-[rgb(255,110,0)]
                  to-[rgb(207,0,6)]
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}