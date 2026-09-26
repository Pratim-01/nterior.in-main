"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  product_id: number;
  product_name: string;
  category: string;
  product_type: "sqft" | "unit";
  short_description: string | null;
  sell_mrp: number | string;
  mrp: number | string;
  gst_percentage: number | string;
  gst_exclude: number;
  discount_percent: number;
  image_url: string | null;
  image_alt_text: string | null;
};

type ApiResponse = {
  success: boolean;
  products: Product[];
  message?: string;
};

function formatPrice(price: number | string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/kayapalat-products?category=Plywood"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tile products");
        }

        const data: ApiResponse = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch tile products"
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error("Tile products fetch error:", error);

        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            {/* EYEBROW */}

            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-8 bg-[rgb(255,170,0)]" />

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
                Featured Products
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-[#202020]
                sm:text-3xl
                lg:text-4xl
              "
            >
              Explore Our Lighting & Fan Range
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                hidden
                max-w-xl
                text-sm
                leading-6
                text-gray-500
                sm:block
              "
            >
              Discover premium lighting and fans selected to combine style, performance and comfort for every interior.
            </p>
          </div>

          {/* ===================================================
              VIEW ALL
          =================================================== */}

          <Link
            href="/products/items/tiles"
            className="
              group
              flex
              shrink-0
              items-center
              gap-2
              text-sm
              font-bold
              text-[rgb(207,0,6)]
              transition-colors
              duration-200
              hover:text-[rgb(170,0,5)]
            "
          >
            <span className="hidden sm:inline">
              View All
            </span>

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-red-100
                bg-red-50
                transition-all
                duration-300
                group-hover:bg-[rgb(207,0,6)]
                group-hover:text-white
              "
            >
              <ArrowRight
                size={17}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>
        </div>

        {/* =====================================================
            LOADING STATE
        ===================================================== */}

        {loading && (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-5
              lg:grid-cols-5
            "
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                "
              >
                <div
                  className="
                    aspect-square
                    animate-pulse
                    bg-gray-100
                  "
                />

                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />

                  <div className="h-5 w-2/5 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div
            className="
              rounded-2xl
              border
              border-red-100
              bg-red-50
              px-6
              py-12
              text-center
            "
          >
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!loading && !error && products.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-gray-50
              px-6
              py-14
              text-center
            "
          >
            <p className="text-sm font-medium text-gray-500">
              No tile products are available right now.
            </p>
          </div>
        )}

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        {!loading && !error && products.length > 0 && (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              sm:gap-5
              lg:grid-cols-5
            "
          >
            {products.slice(0, 5).map((product) => {
              const price = Number(product.sell_mrp);
              const mrp = Number(product.mrp);
              const discountPercent = Number(product.discount_percent) || 0;

              return (
                <Link
                  key={product.product_id}
                  href={`/products/${product.product_id}`}
                  className="
                    group
                    relative
                    flex
                    min-w-0
                    flex-col
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
                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      bg-[#f7f7f7]
                    "
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={
                          product.image_alt_text ||
                          product.product_name
                        }
                        loading="lazy"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-contain
                          p-4
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:scale-[1.05]
                          sm:p-6
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                        "
                      >
                        <span className="text-xs text-gray-400">
                          No image available
                        </span>
                      </div>
                    )}

                    {/* IMAGE OVERLAY */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/5
                        to-transparent
                      "
                    />

                    {/* PRODUCT TYPE */}

                    <span
                      className="
                        absolute
                        left-3
                        top-3
                        rounded-full
                        bg-white/95
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-700
                        shadow-sm
                        backdrop-blur-sm
                      "
                    >
                      {product.product_type}
                    </span>

                    {/* SHOP ICON */}

                    <span
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
                      <ShoppingBag
                        size={16}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* CATEGORY */}

                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-[rgb(207,0,6)]
                        sm:text-xs
                      "
                    >
                      {product.category}
                    </p>

                    {/* PRODUCT NAME */}

                    <h3
                      className="
                        mt-1
                        line-clamp-2
                        min-h-[40px]
                        text-sm
                        font-bold
                        leading-5
                        text-gray-900
                        transition-colors
                        duration-200
                        group-hover:text-[rgb(207,0,6)]
                        sm:text-base
                        sm:leading-6
                      "
                    >
                      {product.product_name}
                    </h3>

                    {/* DESCRIPTION */}

                    {product.short_description && (
                      <p
                        className="
                          mt-2
                          hidden
                          line-clamp-2
                          text-xs
                          leading-5
                          text-gray-500
                          sm:block
                        "
                      >
                        {product.short_description}
                      </p>
                    )}

                    {/* PRICE */}

                    <div className="mt-auto pt-4">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span
                          className="
                            text-lg
                            font-black
                            text-[rgb(207,0,6)]
                            sm:text-xl
                          "
                        >
                          {formatPrice(price)}
                        </span>

                        {mrp > 0 && (
                          <span
                            className="
                              text-xs
                              text-gray-400
                              line-through
                              sm:text-sm
                            "
                          >
                            {formatPrice(mrp)}
                          </span>
                        )}

                        {discountPercent > 0 && (
                          <span
                            className="
                              text-xs
                              font-bold
                              text-[rgb(207,0,6)]
                              sm:text-sm
                            "
                          >
                            {discountPercent}% off
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM ACCENT
                  ================================================= */}

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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}