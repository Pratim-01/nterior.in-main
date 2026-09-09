"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ==========================================================
   CATEGORY PAGE URL
   Same slug map + `/products/items/<slug>` pattern as the
   Navbar, so clicking a card opens the exact same page as
   clicking the matching item in the Navbar.
========================================================== */

function getCategoryHref(categoryName: string) {
  const slugMap: Record<string, string> = {
    Tiles: "tiles",
    Electricals: "electricals",
    "Power & Hand Tools": "power-hand-tools",
    "Plywood & Laminates": "plywood-laminates",
    Hardware: "hardware",
    Paints: "paints",
    "Lighting & Fans": "lighting-fans",
    Bathroom: "bathroom",
    "Sofa and Dining": "sofa-dining",
    Plumbing: "plumbing",
    Kitchen: "kitchen",
    Appliances: "appliances",
  };

  const slug =
    slugMap[categoryName] ??
    categoryName
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");

  return `/products/items/${slug}`;
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

/* ==========================================================
   TYPES
========================================================== */

type Category = {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string;
};

/* ==========================================================
   CATEGORY DATA
========================================================== */

const categoryGroups: Category[][] = [
  /* ==========================================================
     SLIDE 1
  ========================================================== */

  [
    {
      id: 1,
      title: "Tiles",
      description: "Premium tiles for floors, walls and modern interiors.",
      slug: "tiles",
      image:
        "https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Electricals",
      description: "Reliable electrical solutions for modern homes.",
      slug: "electricals",
      image:
        "https://images.unsplash.com/photo-1607631755187-298a3f9a640a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Power & Hand Tools",
      description: "Reliable power and hand tools for every job.",
      slug: "power-hand-tools",
      image:
        "https://images.unsplash.com/photo-1683115098516-9b8d5c643b5b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Plywood & Laminates",
      description: "Durable plywood and premium laminates.",
      slug: "plywood-laminates",
      image:
        "https://images.unsplash.com/photo-1632969722694-8b158f876904?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],

  /* ==========================================================
     SLIDE 2
  ========================================================== */

  [
    {
      id: 5,
      title: "Hardware",
      description: "Functional hardware for furniture and interiors.",
      slug: "hardware",
      image:
        "https://images.unsplash.com/photo-1722348673537-2681be7b4b88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "Paints",
      description: "Premium colours and finishes for every room.",
      slug: "paints",
      image:
        "https://images.unsplash.com/photo-1674376360445-2996327553e7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Lighting & Fans",
      description: "Lighting and ceiling fans for comfortable living.",
      slug: "lighting-fans",
      image:
        "https://images.unsplash.com/photo-1718221621618-e477ce33485a?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      title: "Bathroom",
      description: "Modern bathroom fixtures and interior essentials.",
      slug: "bathroom",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],

  /* ==========================================================
     SLIDE 3
  ========================================================== */

  [
    {
      id: 9,
      title: "Sofa and Dining",
      description: "Comfortable seating and elegant dining furniture.",
      slug: "sofa-dining",
      image:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 10,
      title: "Kitchen",
      description: "Modern kitchen solutions for everyday living.",
      slug: "kitchen",
      image:
        "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      title: "Appliances",
      description: "Smart appliances designed for modern homes.",
      slug: "appliances",
      image:
        "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 12,
      title: "Plumbing",
      description: "Pipes, fittings and plumbing essentials that last.",
      slug: "plumbing",
      image:
        "https://images.unsplash.com/photo-1454988501794-2992f706932e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
];

/* ==========================================================
   CATEGORY CARD
========================================================== */

function CategoryCard({
  category,
  featured = false,
}: {
  category: Category;
  featured?: boolean;
}) {
  return (
    <Link
      href={getCategoryHref(category.title)}
      className="
        group
        relative
        block
        h-full
        w-full
        overflow-hidden
        rounded-2xl
        bg-gray-200

        ring-1
        ring-black/5

        shadow-[0_1px_2px_rgba(0,0,0,0.06)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:shadow-[0_16px_32px_-8px_rgba(207,0,6,0.25)]
        hover:ring-black/0
      "
    >
      {/* IMAGE */}

      <Image
        src={category.image}
        alt={`${category.title} for modern interiors`}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 1024px) 50vw, 25vw"
        }
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
          transition-all
          duration-500
          group-hover:from-black/90
        "
      />

      {/* TOP-LEFT ACCENT DOT — small brand touch */}

      <div
        className="
          absolute
          left-3
          top-3

          h-1.5
          w-1.5

          rounded-full

          bg-[rgb(255,170,0)]

          opacity-0

          shadow-[0_0_0_3px_rgba(255,170,0,0.25)]

          transition-opacity
          duration-500

          group-hover:opacity-100

          sm:left-4
          sm:top-4
        "
      />

      {/* CONTENT */}

      <div
        className={`
          absolute
          inset-x-0
          bottom-0
          p-3
          sm:p-5
          ${featured ? "sm:p-6 lg:p-7" : ""}
        `}
      >
        <h3
          className={`
            font-bold
            leading-tight
            tracking-tight
            text-white

            ${
              featured
                ? "text-xl sm:text-2xl lg:text-4xl"
                : "text-sm sm:text-lg lg:text-xl"
            }
          `}
        >
          {category.title}
        </h3>

        <p
          className={`
            max-w-md
            overflow-hidden
            text-white/80

            ${
              featured
                ? "mt-1 max-h-10 text-[10px] leading-4 sm:mt-2 sm:max-h-12 sm:text-sm sm:leading-5"
                : "hidden sm:mt-2 sm:max-h-12 sm:text-xs sm:leading-5 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-12 sm:group-hover:opacity-100"
            }
          `}
        >
          {category.description}
        </p>

        <div
          className="
            mt-1.5

            inline-flex
            items-center
            gap-1

            rounded-full

            bg-white/10

            px-2
            py-0.5

            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-white

            backdrop-blur-sm

            transition-all
            duration-300

            group-hover:gap-1.5
            group-hover:bg-[rgb(207,0,6)]

            sm:mt-3
            sm:px-2.5
            sm:py-1
            sm:text-[10px]
          "
        >
          Explore
          <ChevronRight
            size={12}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </Link>
  );
}

/* ==========================================================
   SLIDE 1 — LARGE LEFT, 3 SUPPORTING CARDS RIGHT
========================================================== */

function SlideOne({ categories }: { categories: Category[] }) {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-2
        gap-2

        sm:gap-4

        lg:h-[430px]
        lg:grid-cols-4
        lg:grid-rows-[1fr_1fr]
        lg:gap-4
      "
    >
      <div className="order-1 h-[105px] sm:h-[125px] lg:col-start-3 lg:row-start-1 lg:h-auto">
        <CategoryCard category={categories[1]} />
      </div>

      <div className="order-2 h-[105px] sm:h-[125px] lg:col-start-4 lg:row-start-1 lg:h-auto">
        <CategoryCard category={categories[2]} />
      </div>

      <div className="order-3 col-span-2 h-[205px] sm:h-[240px] lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:h-auto">
        <CategoryCard category={categories[0]} featured />
      </div>

      <div className="order-4 col-span-2 h-[110px] sm:h-[135px] lg:col-start-3 lg:col-span-2 lg:row-start-2 lg:h-auto">
        <CategoryCard category={categories[3]} />
      </div>
    </div>
  );
}

/* ==========================================================
   SLIDE 2 — LARGE CENTER
========================================================== */

function SlideTwo({ categories }: { categories: Category[] }) {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-2
        gap-2

        sm:gap-4

        lg:h-[430px]
        lg:grid-cols-4
        lg:grid-rows-2
        lg:gap-4
      "
    >
      <div className="order-1 h-[105px] sm:h-[125px] lg:col-start-1 lg:row-start-1 lg:h-auto">
        <CategoryCard category={categories[1]} />
      </div>

      <div className="order-2 h-[105px] sm:h-[125px] lg:col-start-4 lg:row-start-1 lg:row-span-2 lg:h-auto">
        <CategoryCard category={categories[2]} />
      </div>

      <div className="order-3 col-span-2 h-[205px] sm:h-[240px] lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:h-auto">
        <CategoryCard category={categories[0]} featured />
      </div>

      <div className="order-4 col-span-2 h-[110px] sm:h-[135px] lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:h-auto">
        <CategoryCard category={categories[3]} />
      </div>
    </div>
  );
}

/* ==========================================================
   SLIDE 3 — LARGE RIGHT
========================================================== */

function SlideThree({ categories }: { categories: Category[] }) {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-2
        gap-2

        sm:gap-4

        lg:h-[430px]
        lg:grid-cols-4
        lg:grid-rows-2
        lg:gap-4
      "
    >
      <div className="order-1 h-[105px] sm:h-[125px] lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:h-auto">
        <CategoryCard category={categories[1]} />
      </div>

      <div className="order-2 h-[105px] sm:h-[125px] lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:h-auto">
        <CategoryCard category={categories[2]} />
      </div>

      <div className="order-3 col-span-2 h-[205px] sm:h-[240px] lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2 lg:h-auto">
        <CategoryCard category={categories[0]} featured />
      </div>

      <div className="order-4 col-span-2 h-[110px] sm:h-[135px] lg:col-start-1 lg:col-span-2 lg:row-start-2 lg:h-auto">
        <CategoryCard category={categories[3]} />
      </div>
    </div>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function Categories() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideCount = categoryGroups.length;

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#FFF5F5]
        py-10

        sm:py-14

        md:py-16
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
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            mb-6

            flex
            flex-wrap
            items-end
            justify-between
            gap-4

            sm:mb-8
          "
        >
          <div className="min-w-0">
            {/* LABEL */}

            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-7 bg-[rgb(255,170,0)]" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[rgb(255,170,0)]

                  sm:text-[11px]
                "
              >
                Explore Our Collections
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                text-3xl
                font-black
                leading-none
                tracking-tight
                text-[rgb(207,0,6)]

                sm:text-4xl

                lg:text-5xl
              "
            >
              Building Materials &amp; Essentials
            </h2>

            {/* PARAGRAPH */}

            <p
              className="
                mt-2

                max-w-3xl

                text-xs
                leading-5

                text-[rgb(120,90,0)]

                sm:text-lg
                sm:leading-6
              "
            >
              Discover quality products for building, interiors, and everyday
              living.
            </p>
          </div>

          {/* ==================================================
              DESKTOP CONTROLS
          ================================================== */}

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            {/* <Link
              href="/categories"
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
                hover:border-gray-900
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
            </Link> */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous category slide"
                onClick={() => swiperRef.current?.slidePrev()}
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
                  hover:border-gray-900
                  hover:bg-[rgb(207,0,6)]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                aria-label="Next category slide"
                onClick={() => swiperRef.current?.slideNext()}
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
                  hover:border-gray-900
                  hover:bg-[rgb(207,0,6)]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            SWIPER
        ==================================================== */}

        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.realIndex);
            }}
            slidesPerView={1}
            spaceBetween={0}
            speed={900}
            loop
            allowTouchMove
            autoplay={{
              delay: 3800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="w-full"
          >
            <SwiperSlide className="!w-full">
              <SlideOne categories={categoryGroups[0]} />
            </SwiperSlide>

            <SwiperSlide className="!w-full">
              <SlideTwo categories={categoryGroups[1]} />
            </SwiperSlide>

            <SwiperSlide className="!w-full">
              <SlideThree categories={categoryGroups[2]} />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* ====================================================
            PILL DOT PAGINATION — same visual language as Hero
        ==================================================== */}

        <div className="mt-4 flex items-center justify-center sm:mt-6">
          <div
            className="
              flex
              items-center
              gap-1.5

              rounded-full

              border
              border-gray-200

              bg-white

              px-2.5
              py-1.5

              shadow-sm
            "
          >
            {Array.from({ length: slideCount }).map((_, index) => {
              const isActive = activeSlide === index;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
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
            MOBILE CONTROLS
        ==================================================== */}

        <div
          className="
            mt-5

            flex
            w-full
            items-center
            justify-between
            gap-4

            sm:hidden
          "
        >
          {/* <Link
            href="/categories"
            className="
              group
              inline-flex
              h-10

              items-center
              justify-center

              gap-2

              rounded-full

              border
              border-gray-200

              bg-white

              px-5

              text-sm
              font-semibold
              text-gray-900

              shadow-sm

              transition-all
              duration-300

              active:scale-95
            "
          >
            View All
            <ArrowRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link> */}

          {/* <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous category slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="
                flex
                h-10
                w-10

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

                active:scale-90
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Next category slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="
                flex
                h-10
                w-10

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

                active:scale-90
              "
            >
              <ChevronRight size={18} />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
