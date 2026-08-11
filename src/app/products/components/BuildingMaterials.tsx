"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
      description:
        "Premium tiles for floors, walls and modern interiors.",
      slug: "tiles",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: 2,
      title: "Electricals",
      description:
        "Reliable electrical solutions for modern homes.",
      slug: "electricals",
      image:
        "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 3,
      title: "Panels & Boards",
      description:
        "Quality panels and boards for stylish interiors.",
      slug: "panels-boards",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 4,
      title: "Plywood & Laminates",
      description:
        "Durable plywood and premium laminates.",
      slug: "plywood-laminates",
      image:
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85",
    },
  ],

  /* ==========================================================
     SLIDE 2
  ========================================================== */

  [
    {
      id: 5,
      title: "Hardware",
      description:
        "Functional hardware for furniture and interiors.",
      slug: "hardware",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: 6,
      title: "Paints",
      description:
        "Premium colours and finishes for every room.",
      slug: "paints",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 7,
      title: "Lighting & Fans",
      description:
        "Lighting and ceiling fans for comfortable living.",
      slug: "lighting-fans",
      image:
        "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 8,
      title: "Bathroom",
      description:
        "Modern bathroom fixtures and interior essentials.",
      slug: "bathroom",
      image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=85",
    },
  ],

  /* ==========================================================
     SLIDE 3
  ========================================================== */

  [
    {
      id: 9,
      title: "Sofa and Dining",
      description:
        "Comfortable seating and elegant dining furniture.",
      slug: "sofa-dining",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: 10,
      title: "Kitchen",
      description:
        "Modern kitchen solutions for everyday living.",
      slug: "kitchen",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 11,
      title: "Appliances",
      description:
        "Smart appliances designed for modern homes.",
      slug: "appliances",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 12,
      title: "Rugs & Curtains",
      description:
        "Finishing touches for beautiful and comfortable spaces.",
      slug: "rugs-curtains",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
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
      href={`/category/${category.slug}`}
      className="
        group
        relative
        block
        h-full
        w-full
        overflow-hidden
        rounded-[18px]
        bg-gray-200
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-2xl
        sm:rounded-[22px]
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
          from-black/85
          via-black/20
          to-transparent
          transition-all
          duration-500
          group-hover:from-black/90
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

            ${featured
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
            text-white/75

            ${featured
              ? "mt-1 max-h-10 text-[10px] leading-4 sm:mt-2 sm:max-h-12 sm:text-sm sm:leading-5"
              : "hidden sm:mt-2 sm:max-h-12 sm:text-xs sm:leading-5 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-12 sm:group-hover:opacity-100"
            }
          `}
        >
          {category.description}
        </p>

        <div
          className="
            mt-1
            flex
            items-center
            gap-1
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-white
            transition-transform
            duration-300
            group-hover:translate-x-1
            sm:mt-3
            sm:text-[10px]
          "
        >
          Explore

          <ChevronRight
            size={12}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </div>
      </div>

      {/* HOVER BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[18px]
          border
          border-white/0
          transition-all
          duration-500
          group-hover:border-white/30
          sm:rounded-[22px]
        "
      />
    </Link>
  );
}

/* ==========================================================
   SLIDE 1
   LARGE LEFT
   3 SUPPORTING CARDS RIGHT
========================================================== */

function SlideOne({
  categories,
}: {
  categories: Category[];
}) {
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
      {/* ELECTRICALS */}

      <div
        className="
          order-1
          h-[105px]

          sm:h-[125px]

          lg:col-start-3
          lg:row-start-1
          lg:h-auto
        "
      >
        <CategoryCard category={categories[1]} />
      </div>

      {/* PANELS & BOARDS */}

      <div
        className="
          order-2
          h-[105px]

          sm:h-[125px]

          lg:col-start-4
          lg:row-start-1
          lg:h-auto
        "
      >
        <CategoryCard category={categories[2]} />
      </div>

      {/* TILES */}

      <div
        className="
          order-3
          col-span-2
          h-[205px]

          sm:h-[240px]

          lg:col-start-1
          lg:col-span-2
          lg:row-start-1
          lg:row-span-2
          lg:h-auto
        "
      >
        <CategoryCard
          category={categories[0]}
          featured
        />
      </div>

      {/* PLYWOOD */}

      <div
        className="
          order-4
          col-span-2
          h-[110px]

          sm:h-[135px]

          lg:col-start-3
          lg:col-span-2
          lg:row-start-2
          lg:h-auto
        "
      >
        <CategoryCard category={categories[3]} />
      </div>
    </div>
  );
}

/* ==========================================================
   SLIDE 2
   LARGE CENTER
   LEFT STACK
   RIGHT FULL HEIGHT

   DESKTOP:

   ┌───────────┬───────────────┬───────────┐
   │           │               │           │
   │   PAINTS  │               │           │
   ├───────────┤   HARDWARE    │ LIGHTING  │
   │ BATHROOM  │               │     &     │
   │           │               │   FANS    │
   └───────────┴───────────────┴───────────┘

   NO EMPTY GRID AREA
========================================================== */

function SlideTwo({
  categories,
}: {
  categories: Category[];
}) {
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
      {/* PAINTS */}

      <div
        className="
          order-1
          h-[105px]

          sm:h-[125px]

          lg:col-start-1
          lg:row-start-1
          lg:h-auto
        "
      >
        <CategoryCard category={categories[1]} />
      </div>

      {/* LIGHTING & FANS
          FIXED:
          SPANS BOTH DESKTOP ROWS
      */}

      <div
        className="
          order-2
          h-[105px]

          sm:h-[125px]

          lg:col-start-4
          lg:row-start-1
          lg:row-span-2
          lg:h-auto
        "
      >
        <CategoryCard category={categories[2]} />
      </div>

      {/* HARDWARE */}

      <div
        className="
          order-3
          col-span-2
          h-[205px]

          sm:h-[240px]

          lg:col-start-2
          lg:col-span-2
          lg:row-start-1
          lg:row-span-2
          lg:h-auto
        "
      >
        <CategoryCard
          category={categories[0]}
          featured
        />
      </div>

      {/* BATHROOM */}

      <div
        className="
          order-4
          col-span-2
          h-[110px]

          sm:h-[135px]

          lg:col-start-1
          lg:col-span-1
          lg:row-start-2
          lg:h-auto
        "
      >
        <CategoryCard category={categories[3]} />
      </div>
    </div>
  );
}

/* ==========================================================
   SLIDE 3
   LARGE RIGHT
   SMALL LEFT
========================================================== */

function SlideThree({
  categories,
}: {
  categories: Category[];
}) {
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
      {/* KITCHEN */}

      <div
        className="
          order-1
          h-[105px]

          sm:h-[125px]

          lg:col-start-1
          lg:col-span-1
          lg:row-start-1
          lg:h-auto
        "
      >
        <CategoryCard category={categories[1]} />
      </div>

      {/* APPLIANCES */}

      <div
        className="
          order-2
          h-[105px]

          sm:h-[125px]

          lg:col-start-2
          lg:col-span-1
          lg:row-start-1
          lg:h-auto
        "
      >
        <CategoryCard category={categories[2]} />
      </div>

      {/* SOFA & DINING */}

      <div
        className="
          order-3
          col-span-2
          h-[205px]

          sm:h-[240px]

          lg:col-start-3
          lg:col-span-2
          lg:row-start-1
          lg:row-span-2
          lg:h-auto
        "
      >
        <CategoryCard
          category={categories[0]}
          featured
        />
      </div>

      {/* RUGS & CURTAINS */}

      <div
        className="
          order-4
          col-span-2
          h-[110px]

          sm:h-[135px]

          lg:col-start-1
          lg:col-span-2
          lg:row-start-2
          lg:h-auto
        "
      >
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

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#f8f8f6]
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
            items-end
            justify-between
            gap-4
            sm:mb-8
          "
        >
          <div className="min-w-0">
            {/* LABEL */}

            <div className="mb-2 flex items-center gap-2">
              <span
                className="
                  h-px
                  w-7
                  bg-[rgb(255,170,0)]
                "
              />

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
              Discover quality products for building, interiors, and everyday living.
            </p>
          </div>

          {/* ==================================================
              DESKTOP CONTROLS
          ================================================== */}

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <Link
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
            </Link>

            <button
              type="button"
              aria-label="Previous category slide"
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
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
              onClick={() =>
                swiperRef.current?.slideNext()
              }
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

        {/* ====================================================
            SWIPER
        ==================================================== */}

        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={0}
            speed={900}
            loop
            allowTouchMove
            autoplay={{
              delay: 2300,
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
          <Link
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
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous category slide"
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
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
              onClick={() =>
                swiperRef.current?.slideNext()
              }
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
          </div>
        </div>
      </div>
    </section>
  );
}