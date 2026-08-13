"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* ==========================================================
   PRODUCT TYPE
========================================================== */

type Product = {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
};

/* ==========================================================
   TILES PRODUCTS
========================================================== */

const tileProducts: Product[] = [
  {
    id: 1,
    slug: "premium-porcelain-tiles",
    title: "Premium Porcelain Tiles",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
  {
    id: 2,
    slug: "designer-ceramic-tiles",
    title: "Designer Ceramic Tiles",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 3,
    slug: "modern-wall-floor-tiles",
    title: "Modern Wall & Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹799",
    oldPrice: "₹1,049",
    discount: "24% OFF",
  },
  {
    id: 4,
    slug: "marble-finish-floor-tiles",
    title: "Marble Finish Floor Tiles",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 5,
    slug: "wood-look-wall-tiles",
    title: "Wood Look Wall Tiles",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹749",
    oldPrice: "₹999",
    discount: "25% OFF",
  },
];

/* ==========================================================
   PAINT PRODUCTS
========================================================== */

const paintProducts: Product[] = [
  {
    id: 1,
    slug: "premium-interior-wall-paint",
    title: "Premium Interior Wall Paint",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 2,
    slug: "weatherproof-exterior-paint",
    title: "Weatherproof Exterior Paint",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,299",
    oldPrice: "₹1,699",
    discount: "24% OFF",
  },
  {
    id: 3,
    slug: "luxury-matt-finish-paint",
    title: "Luxury Matt Finish Paint",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
  {
    id: 4,
    slug: "easy-clean-emulsion-paint",
    title: "Easy Clean Emulsion Paint",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 5,
    slug: "decorative-texture-paint",
    title: "Decorative Texture Paint",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹799",
    oldPrice: "₹1,049",
    discount: "24% OFF",
  },
];

/* ==========================================================
   PLYWOOD & LAMINATES PRODUCTS
========================================================== */

const plywoodProducts: Product[] = [
  {
    id: 1,
    slug: "premium-plywood-sheets",
    title: "Premium Plywood Sheets",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,299",
    oldPrice: "₹1,699",
    discount: "24% OFF",
  },
  {
    id: 2,
    slug: "decorative-laminates",
    title: "Decorative Laminates",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
  },
  {
    id: 3,
    slug: "wood-finish-laminates",
    title: "Wood Finish Laminates",
    image:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1400&auto=format&fit=crop",
    price: "₹999",
    oldPrice: "₹1,299",
    discount: "23% OFF",
  },
  {
    id: 4,
    slug: "interior-grade-plywood",
    title: "Interior Grade Plywood",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,499",
    oldPrice: "₹1,899",
    discount: "21% OFF",
  },
  {
    id: 5,
    slug: "high-pressure-laminates",
    title: "High Pressure Laminates",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1400&auto=format&fit=crop",
    price: "₹1,099",
    oldPrice: "₹1,399",
    discount: "21% OFF",
  },
];

/* ==========================================================
   PRODUCT CARD
========================================================== */

function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article
      className="
        group
        flex
        h-full
        w-full
        flex-col
        overflow-hidden

        rounded-[18px]

        border
        border-[#e9e6e1]

        bg-[#fcfbf9]

        shadow-[0_4px_16px_rgba(24,34,53,0.055)]

        transition-shadow
        duration-300

        hover:shadow-[0_8px_24px_rgba(24,34,53,0.09)]
      "
    >
      {/* IMAGE */}

      <Link
        href={`/product/${product.slug}`}
        className="block"
      >
        <div
          className="
            relative
            h-[145px]
            w-full
            overflow-hidden
            bg-[#ebe8e2]

            sm:h-[155px]

            lg:h-[165px]
          "
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="
              (max-width: 639px) 88vw,
              (max-width: 1023px) 42vw,
              25vw
            "
            className="
              object-cover

              transition-transform
              duration-700
              ease-out

              group-hover:scale-[1.035]
            "
          />
        </div>
      </Link>

      {/* PRODUCT DETAILS */}

      <div
        className="
          flex
          flex-1
          flex-col

          bg-[#fcfbf9]

          px-4
          pb-4
          pt-3.5

          sm:px-4
          sm:pb-5
          sm:pt-4
        "
      >
        <Link
          href={`/product/${product.slug}`}
          className="block"
        >
          <h3
            className="
              line-clamp-2

              min-h-[40px]

              text-[14px]
              font-semibold
              leading-[1.4]

              tracking-[-0.015em]

              text-[#202938]

              transition-colors
              duration-200

              group-hover:text-[#c90006]

              sm:text-[15px]
            "
          >
            {product.title}
          </h3>
        </Link>

        {/* PRICE */}

        <div
          className="
            mt-4

            border-t
            border-[#e9e7e3]

            pt-3.5
          "
        >
          <div
            className="
              flex
              items-end
              justify-between
              gap-3
            "
          >
            {/* CURRENT PRICE */}

            <div className="min-w-0">
              <span
                className="
                  block

                  text-[21px]
                  font-bold
                  leading-none

                  tracking-[-0.035em]

                  text-[#182235]

                  sm:text-[22px]
                "
              >
                {product.price}
              </span>

              <span
                className="
                  mt-1
                  block

                  text-[10px]
                  font-medium

                  text-[#929aa6]
                "
              >
                incl. GST
              </span>
            </div>

            {/* MRP + DISCOUNT */}

            <div
              className="
                flex
                min-w-0
                flex-col
                items-end

                pb-0.5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <span
                  className="
                    text-[13px]
                    font-medium
                    text-[#929aa6]
                  "
                >
                  MRP
                </span>

                <span
                  className="
                    text-[13px]
                    text-[#9ba2ad]
                    line-through
                  "
                >
                  {product.oldPrice}
                </span>
              </div>

              <span
                className="
                  mt-1.5

                  rounded-full

                  bg-[#fff0f0]

                  px-2.5
                  py-1

                  text-[10px]
                  font-bold

                  tracking-wide

                  text-[#c90006]
                "
              >
                {product.discount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   NAVIGATION BUTTONS
========================================================== */

function NavigationButtons({
  title,
  navigationId,
}: {
  title: string;
  navigationId: string;
}) {
  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-1.5

        sm:gap-2
      "
    >
      <button
        type="button"
        aria-label={`Previous ${title}`}
        className={`
          ${navigationId}-prev

          flex
          h-8
          w-8

          items-center
          justify-center

          rounded-full

          border
          border-[#e7e4df]

          bg-white

          text-[#283447]

          shadow-[0_3px_10px_rgba(24,34,53,0.06)]

          transition-all
          duration-200

          hover:bg-[#f8f7f4]

          active:scale-95

          sm:h-9
          sm:w-9
        `}
      >
        <ChevronLeft
          size={16}
          strokeWidth={1.8}
        />
      </button>

      <button
        type="button"
        aria-label={`Next ${title}`}
        className={`
          ${navigationId}-next

          flex
          h-8
          w-8

          items-center
          justify-center

          rounded-full

          border
          border-[#e7e4df]

          bg-white

          text-[#283447]

          shadow-[0_3px_10px_rgba(24,34,53,0.06)]

          transition-all
          duration-200

          hover:bg-[#f8f7f4]

          active:scale-95

          sm:h-9
          sm:w-9
        `}
      >
        <ChevronRight
          size={16}
          strokeWidth={1.8}
        />
      </button>
    </div>
  );
}

/* ==========================================================
   CATEGORY HEADER
========================================================== */

function CategoryHeader({
  title,
  category,
  navigationId,
}: {
  title: string;
  category: string;
  navigationId: string;
}) {
  return (
    <div
      className="
        mb-4

        flex
        items-center
        justify-between
        gap-3

        sm:mb-5
      "
    >
      <Link
        href={`/products?category=${category}`}
        aria-label={`View all ${title}`}
        className="
          group
          flex
          min-w-0
          items-center
          gap-1
        "
      >
        <h2
          className="
            truncate

            text-[21px]
            font-bold
            leading-none

            tracking-[-0.035em]

            text-[#CF0006]

            sm:text-[24px]

            lg:text-[26px]
          "
        >
          {title}
        </h2>

        <span
          className="
            shrink-0

            text-[25px]
            font-medium
            leading-none

            text-[#c90006]

            transition-transform
            duration-200

            group-hover:translate-x-0.5

            sm:text-[27px]
          "
        >
          ›
        </span>
      </Link>

      <NavigationButtons
        title={title}
        navigationId={navigationId}
      />
    </div>
  );
}

/* ==========================================================
   50/50 CATEGORY SECTION
========================================================== */

function HalfCategory({
  title,
  category,
  products,
  navigationId,
}: {
  title: string;
  category: string;
  products: Product[];
  navigationId: string;
}) {
  /*
   * For an odd number of products, duplicate the first
   * product so the desktop 50/50 carousel always has
   * an even number of slides.
   *
   * Example:
   *
   * 5 products:
   * 1, 2, 3, 4, 5
   *
   * becomes:
   * 1, 2, 3, 4, 5, 1
   *
   * IMPORTANT:
   * We keep id as a NUMBER because Product.id is number.
   */
  const swiperProducts: Product[] =
    products.length % 2 !== 0 && products.length > 1
      ? [
        ...products,
        {
          ...products[0],
        },
      ]
      : products;

  return (
    <section
      className="
        min-w-0
        overflow-hidden

        rounded-[22px]

        border
        border-[#e8e5df]

        bg-[#faf9f6]

        p-4

        shadow-[0_6px_24px_rgba(24,34,53,0.07)]

        sm:p-5
      "
    >
      <CategoryHeader
        title={title}
        category={category}
        navigationId={navigationId}
      />

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[
            Navigation,
            Autoplay,
          ]}

          navigation={{
            prevEl: `.${navigationId}-prev`,
            nextEl: `.${navigationId}-next`,
          }}

          /* AUTOMATIC SCROLLING */
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          speed={700}

          /* INFINITE LOOP */
          loop={swiperProducts.length > 2}

          /*
           * We manually handle odd product counts,
           * so Swiper should never create blank slides.
           */
          loopAddBlankSlides={false}

          watchOverflow
          observer
          observeParents

          spaceBetween={12}

          /* MOBILE */
          slidesPerView={1}
          slidesPerGroup={1}

          breakpoints={{
            /*
             * MOBILE
             * One card at a time.
             */
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 12,
            },

            /*
             * DESKTOP
             * Two cards side by side = 50/50.
             */
            1024: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 12,
            },
          }}

          className="!w-full !overflow-visible"
        >
          {swiperProducts.map((product, index) => (
            <SwiperSlide
              key={`${product.id}-${index}`}
              className="!h-auto"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* ==========================================================
   PLYWOOD & LAMINATES
========================================================== */

function PlywoodSection() {
  const navigationId = "plywood-carousel";

  return (
    <section
      className="
        mt-5
        w-full

        border-t
        border-[#eeeae5]

        bg-white

        py-6

        sm:mt-6
        sm:py-7

        lg:py-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl

          px-4

          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-4

            flex
            items-center
            justify-between
            gap-4

            sm:mb-5
          "
        >
          <Link
            href="/products?category=plywood-laminates"
            aria-label="View all Ply Wood and Laminates"
            className="
              group
              flex
              min-w-0
              items-center
              gap-1
            "
          >
            <h2
              className="
                truncate

                text-[21px]
                font-bold
                leading-tight

                tracking-[-0.03em]

                text-[#CF0006]

                sm:text-[24px]

                lg:text-[26px]
              "
            >
              Ply Wood & Laminates
            </h2>

            <span
              className="
                shrink-0

                text-[25px]
                font-medium
                leading-none

                text-[#c90006]

                transition-transform
                duration-200

                group-hover:translate-x-0.5

                sm:text-[27px]
              "
            >
              ›
            </span>
          </Link>

          {/* NAVIGATION */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            <button
              type="button"
              aria-label="Previous Ply Wood and Laminates"
              className="
                plywood-carousel-prev

                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                border
                border-[#e7e4df]

                bg-white

                text-[#283447]

                shadow-[0_3px_12px_rgba(24,34,53,0.06)]

                transition-all
                duration-200

                hover:bg-[#f8f7f4]

                active:scale-95

                sm:h-10
                sm:w-10
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              aria-label="Next Ply Wood and Laminates"
              className="
                plywood-carousel-next

                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                border
                border-[#e7e4df]

                bg-white

                text-[#283447]

                shadow-[0_3px_12px_rgba(24,34,53,0.06)]

                transition-all
                duration-200

                hover:bg-[#f8f7f4]

                active:scale-95

                sm:h-10
                sm:w-10
              "
            >
              <ChevronRight
                size={17}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* PLYWOOD CAROUSEL */}

        <div className="w-full overflow-hidden">
          <Swiper
            modules={[
              Navigation,
              Autoplay,
            ]}
            navigation={{
              prevEl:
                ".plywood-carousel-prev",
              nextEl:
                ".plywood-carousel-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={650}
            loop
            watchOverflow
            observer
            observeParents
            spaceBetween={14}

            /*
             * MOBILE
             * One complete centered card.
             */
            slidesPerView={1}
            centeredSlides

            breakpoints={{
              0: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 12,
              },

              /*
               * DESKTOP
               * Existing plywood layout preserved.
               */
              640: {
                slidesPerView: "auto",
                centeredSlides: false,
                spaceBetween: 14,
              },
            }}
            className="
              !w-full
              !overflow-visible
            "
          >
            {plywoodProducts.map(
              (product) => (
                <SwiperSlide
                  key={product.id}
                  className="
                    !h-auto

                    !w-full

                    sm:!w-[calc(50%-7px)]

                    md:!w-[calc(40%-10px)]

                    lg:!w-[calc(33.333%-12px)]

                    xl:!w-[calc(25%-14px)]
                  "
                >
                  <ProductCard
                    product={product}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function Tiles() {
  return (
    <section
      className="
        w-full
        overflow-hidden

        bg-white

        py-5

        sm:py-6
      "
    >
      {/* TILES + PAINTS */}

      <div
        className="
          mx-auto
          w-full
          max-w-7xl

          px-4

          sm:px-6
        "
      >
        <div
          className="
            grid
            grid-cols-1

            gap-5

            lg:grid-cols-2
            lg:gap-6
          "
        >
          <HalfCategory
            title="Tiles"
            category="tiles"
            products={tileProducts}
            navigationId="tiles-carousel"
          />

          <HalfCategory
            title="Paints"
            category="paints"
            products={paintProducts}
            navigationId="paints-carousel"
          />
        </div>
      </div>

      {/* PLYWOOD & LAMINATES */}

      <PlywoodSection />
    </section>
  );
}