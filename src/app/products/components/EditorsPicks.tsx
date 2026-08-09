"use client";

/* ==========================================================
   Editor's Picks
   Premium Furniture & Interior Product Carousel
========================================================== */

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/* ==========================================================
   Product Data
   Replace with API Later
========================================================== */

const products = [
  {
    id: 1,
    slug: "luxury-l-shape-sofa",
    title: "Luxury L Shape Sofa",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    price: "₹42,999",
    oldPrice: "₹54,999",
    discount: "22% OFF",
    rating: 4.8,
  },

  {
    id: 2,
    slug: "modern-dining-table",
    title: "Modern Dining Table",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    price: "₹24,999",
    oldPrice: "₹31,999",
    discount: "18% OFF",
    rating: 4.7,
  },

  {
    id: 3,
    slug: "premium-bed",
    title: "Premium King Size Bed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    price: "₹38,999",
    oldPrice: "₹47,999",
    discount: "20% OFF",
    rating: 5,
  },

  {
    id: 4,
    slug: "designer-chair",
    title: "Designer Lounge Chair",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1400&auto=format&fit=crop",
    price: "₹18,999",
    oldPrice: "₹23,999",
    discount: "15% OFF",
    rating: 4.6,
  },

  {
    id: 5,
    slug: "coffee-table",
    title: "Luxury Coffee Table",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400&auto=format&fit=crop",
    price: "₹14,999",
    oldPrice: "₹18,999",
    discount: "21% OFF",
    rating: 4.9,
  },
];

/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function EditorsPicks() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[rgb(255,255,255)]
        py-10
        sm:py-14
        md:pt-16
        md:pb-20
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
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-7
            flex
            flex-col
            gap-6
            sm:mb-9
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* ====================================================
              TEXT CONTENT
          ==================================================== */}

          <div className="max-w-3xl">
            {/* EYEBROW */}

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
                Curated For Your Home
              </span>
            </div>

            {/* SEO HEADING */}

            <h2
              className="
                max-w-3xl
                text-3xl
                font-black
                leading-[0.98]
                tracking-[-0.035em]
                text-[rgb(207,0,6)]
                sm:text-4xl
              "
            >
              Premium Furniture Picks for Modern Interiors
            </h2>

            {/* SEO DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-[rgb(120,90,0)]
                sm:text-lg
                sm:leading-7
              "
            >
              Discover designer-selected sofas, beds, dining furniture,
              accent chairs and home essentials curated to bring
              comfort and timeless style to every room.
            </p>
          </div>

          {/* ====================================================
              HEADER CONTROLS
          ==================================================== */}

          <div
            className="
              flex
              w-full
              items-center
              justify-end
              gap-3
              md:w-auto
            "
          >
            {/* VIEW ALL */}

            <Link
              href="/products"
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
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(202,0,6)]
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

            {/* PREVIOUS */}

            <button
              type="button"
              aria-label="Previous furniture products"
              className="
                editors-prev
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
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(207,0,6)]
                hover:text-white
                hover:shadow-lg
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              aria-label="Next furniture products"
              className="
                editors-next
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
                hover:border-[rgb(207,0,6)]
                hover:bg-[rgb(207,0,6)]
                hover:text-white
                hover:shadow-lg
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ======================================================
            PRODUCT SLIDER VIEWPORT

            IMPORTANT:
            overflow-hidden keeps cloned Swiper slides from
            appearing outside the left/right boundaries.

            Extra bottom padding gives the cards and shadows
            enough room vertically.
        ====================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            pb-8
            pt-1
          "
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".editors-prev",
              nextEl: ".editors-next",
            }}
            autoplay={{
              delay: 2300,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            loop={true}
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              /* ==================================================
                 MOBILE
              ================================================== */

              0: {
                slidesPerView: 1.25,
                spaceBetween: 12,
              },

              /* ==================================================
                 SMALL TABLET
              ================================================== */

              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },

              /* ==================================================
                 TABLET
              ================================================== */

              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },

              /* ==================================================
                 LARGE DESKTOP
              ================================================== */

              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="!h-auto"
              >
                {/* ==================================================
                    PRODUCT CARD
                ================================================== */}

                <article
                  className="
                    group
                    relative
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:rounded-3xl
                  "
                >
                  {/* ==================================================
                      PRODUCT IMAGE
                  ================================================== */}

                  <Link
                    href={`/product/${product.slug}`}
                    className="block"
                  >
                    <div
                      className="
                        relative
                        h-40
                        overflow-hidden
                        bg-gray-100
                        sm:h-44
                        lg:h-48
                      "
                    >
                      <Image
                        src={product.image}
                        alt={`${product.title} - premium furniture`}
                        fill
                        sizes="
                          (max-width: 640px) 80vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                      />

                      {/* IMAGE OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/15
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* DISCOUNT BADGE */}

                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          bg-[rgb(207,0,6)]
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          tracking-wide
                          text-white
                          shadow-sm
                        "
                      >
                        {product.discount}
                      </span>
                    </div>
                  </Link>

                  {/* ==================================================
                      WISHLIST
                  ================================================== */}

                  <button
                    type="button"
                    aria-label={`Add ${product.title} to wishlist`}
                    className="
                      absolute
                      right-3
                      top-3
                      z-20
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/80
                      bg-white/90
                      text-gray-700
                      shadow-md
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-[rgb(207,0,6)]
                      hover:text-white
                    "
                  >
                    <Heart size={16} />
                  </button>

                  {/* ==================================================
                      PRODUCT DETAILS
                  ================================================== */}

                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                    {/* PRODUCT TITLE */}

                    <Link href={`/product/${product.slug}`}>
                      <h3
                        className="
                          line-clamp-2
                          min-h-[40px]
                          text-sm
                          font-bold
                          leading-5
                          text-[rgb(207,0,6)]
                          transition-colors
                          duration-300
                          hover:text-[rgb(255,170,0)]
                          sm:text-base
                        "
                      >
                        {product.title}
                      </h3>
                    </Link>

                    {/* ==================================================
                        RATING
                    ================================================== */}

                    <div
                      className="
                        mt-0
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={13}
                            fill={
                              star <= Math.round(product.rating)
                                ? "currentColor"
                                : "none"
                            }
                            className="text-[rgb(255,170,0)]"
                          />
                        ))}
                      </div>

                      <span
                        className="
                          text-[11px]
                          font-medium
                          text-[rgb(120,90,0)]
                        "
                      >
                        {product.rating}
                      </span>
                    </div>

                    {/* ==================================================
                        PRICE
                    ================================================== */}

                    <div
                      className="
                        mt-3
                        flex
                        flex-wrap
                        items-baseline
                        gap-2
                      "
                    >
                      <span
                        className="
                          text-lg
                          font-black
                          text-gray-900
                        "
                      >
                        {product.price}
                      </span>

                      <span
                        className="
                          text-xs
                          text-gray-400
                          line-through
                        "
                      >
                        {product.oldPrice}
                      </span>
                    </div>

                    {/* ==================================================
                        DELIVERY
                    ================================================== */}

                    <p
                      className="
                        mt-1.5
                        text-[11px]
                        font-medium
                        text-green-600
                      "
                    >
                      Free Delivery
                    </p>

                    {/* ==================================================
                        ADD TO CART
                    ================================================== */}

                    <button
                      type="button"
                      className="
                        mt-3
                        flex
                        h-10
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[rgb(207,0,6)]
                        px-3
                        text-xs
                        font-bold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[rgb(180,0,5)]
                        active:scale-[0.98]
                        sm:text-sm
                      "
                    >
                      <ShoppingCart size={15} />

                      Add To Cart
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}