"use client";

/* ==========================================================
   Hero Section
   ----------------------------------------------------------
   Premium Marketplace Hero
   Inspired by Amazon + Flipkart + IKEA + Apple
   ========================================================== */

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  /* ==========================================================
      Hero Slides
      Later these can come from an API.
  ========================================================== */

  const heroSlides = [
    {
      id: 1,

      title: "Luxury Furniture",

      subtitle: "For Modern Living",

      description:
        "Discover premium furniture, modular kitchens, wardrobes, lighting, décor, and complete interior solutions crafted for elegant homes.",

      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop",

      buttonOne: {
        title: "Shop Collection",
        link: "/products",
      },

      buttonTwo: {
        title: "Book Consultation",
        link: "/contact",
      },
    },

    {
      id: 2,

      title: "Beautiful Interiors",

      subtitle: "Designed Around You",

      description:
        "Create timeless living spaces with curated furniture collections, premium décor, and bespoke interior solutions.",

      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2000&auto=format&fit=crop",

      buttonOne: {
        title: "Explore Collection",
        link: "/collections",
      },

      buttonTwo: {
        title: "Talk To Designer",
        link: "/contact",
      },
    },

    {
      id: 3,

      title: "Premium Home Décor",

      subtitle: "Made For Every Space",

      description:
        "From luxurious sofas to elegant lighting and décor, discover everything your dream home deserves.",

      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2000&auto=format&fit=crop",

      buttonOne: {
        title: "Discover More",
        link: "/products",
      },

      buttonTwo: {
        title: "View Designs",
        link: "/collections",
      },
    },
  ];

  return (
    <section className="relative w-full">

      {/* ==========================================================
          Hero Slider
      ========================================================== */}

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
        ]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        speed={900}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="h-[82vh] md:h-[88vh]"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>

            {/* ==========================================================
                Slide Wrapper
            ========================================================== */}

            <div className="relative h-full w-full overflow-hidden">

              {/* ==========================================================
                  Background Image
              ========================================================== */}

              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
              />

              {/* ==========================================================
                  Dark Overlay
              ========================================================== */}

              <div className="absolute inset-0 bg-black/55" />

              {/* ==========================================================
                  Decorative Gradient
              ========================================================== */}

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* ==========================================================
                  Hero Content
              ========================================================== */}

              <div className="relative z-20 flex h-full items-center">

                <div className="mx-auto w-full max-w-7xl px-6">

                  <div className="max-w-2xl">

                    {/* Premium Badge */}

                    <div className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-lg">

                      <span className="text-sm font-semibold tracking-wide text-white">

                        PREMIUM INTERIOR MARKETPLACE

                      </span>

                    </div>

                    {/* Heading */}

                    <h1 className="text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">

                      {slide.title}

                      <span className="mt-2 block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">

                        {slide.subtitle}

                      </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-8 max-w-xl text-lg leading-8 text-white/90 md:text-xl">

                      {slide.description}

                    </p>

                    {/* ==========================================================
                        CTA Buttons
                    ========================================================== */}

                    <div className="mt-10 flex flex-wrap gap-5">

                      <Link
                        href={slide.buttonOne.link}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
                      >
                        {slide.buttonOne.title}

                        <ArrowRight size={20} />
                      </Link>

                      <Link
                        href={slide.buttonTwo.link}
                        className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
                      >
                        {slide.buttonTwo.title}
                      </Link>

                    </div>
                    {/* ==========================================
                        Trust Stats
                    ========================================== */}

                    <div className="mt-14 flex flex-wrap items-center gap-10">

                      <div>
                        <h3 className="text-3xl font-bold text-white">
                          5000+
                        </h3>

                        <p className="mt-1 text-sm text-white/70">
                          Premium Products
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-white">
                          1200+
                        </h3>

                        <p className="mt-1 text-sm text-white/70">
                          Happy Customers
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-white">
                          25+
                        </h3>

                        <p className="mt-1 text-sm text-white/70">
                          Cities Served
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}

        {/* ==========================================
            Navigation Buttons
        ========================================== */}

        <button
          className="
            hero-prev
            absolute
            left-6
            top-1/2
            z-30
            flex
            h-14
            w-14
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-lg
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
          "
        >
          <ChevronLeft size={28} />
        </button>

        <button
          className="
            hero-next
            absolute
            right-6
            top-1/2
            z-30
            flex
            h-14
            w-14
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-lg
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
          "
        >
          <ChevronRight size={28} />
        </button>

      </Swiper>

      {/* ==========================================
          Category Navigation
      ========================================== */}

      <div className="relative z-30 -mt-12 mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-2xl sm:grid-cols-4 lg:grid-cols-8">

          {[
            "Sofa",
            "Bedroom",
            "Dining",
            "Kitchen",
            "Wardrobe",
            "Lighting",
            "Decor",
            "Office",
          ].map((category) => (

            <Link
              href={`/category/${category.toLowerCase()}`}
              key={category}
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                p-5
                transition-all
                duration-300
                hover:bg-gray-100
                hover:-translate-y-1
              "
            >

              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">

                🪑

              </div>

              <span className="text-sm font-semibold text-gray-700">
                {category}
              </span>

            </Link>

          ))}

        </div>

      </div>

      {/* ==========================================
          Trust Strip
      ========================================== */}

      <div className="mx-auto mt-10 max-w-7xl px-6">

        <div className="grid gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg md:grid-cols-4">

          <div className="flex items-center gap-3">

            <span className="text-2xl">🚚</span>

            <div>

              <h4 className="font-bold text-gray-900">
                Free Delivery
              </h4>

              <p className="text-sm text-gray-500">
                Across selected locations
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-2xl">🛠</span>

            <div>

              <h4 className="font-bold text-gray-900">
                Installation Included
              </h4>

              <p className="text-sm text-gray-500">
                Professional setup
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-2xl">⭐</span>

            <div>

              <h4 className="font-bold text-gray-900">
                Premium Brands
              </h4>

              <p className="text-sm text-gray-500">
                Trusted collections
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-2xl">💳</span>

            <div>

              <h4 className="font-bold text-gray-900">
                Easy EMI
              </h4>

              <p className="text-sm text-gray-500">
                Flexible payment options
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}