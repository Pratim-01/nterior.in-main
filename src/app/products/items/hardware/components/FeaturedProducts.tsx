"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "@/types/products";
import ProductCard from "../../../listing/ProductCard";

function SkeletonCard() {
  return (
    <div className="h-[380px] animate-pulse rounded-[10px] border border-[#eee] bg-[#f7f7f7]" />
  );
}

interface FeaturedProductsProps {
  /** Exact `product_details.category` value to fetch, e.g. "Cabinet
   *  Hardware" or "Display". */
  category: string;
  /** Optional exact `product_details.sub_category` value to narrow further
   *  within `category`, e.g. "Furniture Locks" within "Cabinet Hardware" or
   *  "Retail Display System" within "Display". Omit to show every
   *  subcategory under `category`. */
  subCategory?: string;
  /** Heading shown above the strip, e.g. "Explore Our Range of Plywood". */
  title: string;
  /** Where "View All" and the empty/error state's link (if any) should
   *  point, e.g. "/products/items/plywood-laminates/plywood". */
  viewAllHref: string;
  /** Background color class for the section. Defaults to the same soft
   *  pink used by the original plywood strip; pass a different one so a
   *  second strip on the same page (e.g. Laminates) is visually distinct
   *  rather than blending into the one above it. */
  sectionClassName?: string;
}

// Uses the exact same ProductCard used by the full listing (src/app/
// products/listing/ProductCard.tsx) and the exact same /api/products
// endpoint, just capped to 5 results sorted newest-first — so this strip
// always looks and behaves identically to the dynamic catalogue below it,
// with zero duplicated card markup or fetch logic. `category`, `title`,
// and `viewAllHref` are props so the same component can show a "Explore
// Our Range of Plywood" strip and a "Explore Our Range of Laminates"
// strip (or any other category) without copy-pasting this file.
export default function FeaturedProducts({
  category,
  subCategory,
  title,
  viewAllHref,
  sectionClassName = "bg-[#FFF5F5]",
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          category,
          sort: "newest",
          pageSize: "5",
        });
        if (subCategory) params.set("subCategory", subCategory);

        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${subCategory ?? category} products`);
        }

        const data: ProductsResponse = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error(`${subCategory ?? category} products fetch error:`, error);

        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, subCategory]);

  return (
    <section
      className={`w-full ${sectionClassName} px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-16 lg:px-10 lg:pt-8 lg:pb-20`}
    >
      <div className="mx-auto w-full max-w-[1400px]">
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
                font-[Candal]
                text-2xl
                tracking-tight
                text-[#202020]
                sm:text-3xl
                lg:text-4xl
              "
            >
              {title}
            </h2>
          </div>

          {/* ===================================================
              VIEW ALL
          =================================================== */}

          <Link
            href={viewAllHref}
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
              flex
              gap-4
              overflow-x-auto
              pb-1
              snap-x
              snap-mandatory
              [&::-webkit-scrollbar]:hidden
              sm:grid
              sm:grid-cols-3
              sm:gap-5
              sm:overflow-visible
              sm:pb-0
              sm:snap-none
              lg:grid-cols-5
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-[44%] max-w-[220px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                <SkeletonCard />
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
              No {(subCategory ?? category).toLowerCase()} products are available right now.
            </p>
          </div>
        )}

        {/* =====================================================
            PRODUCT GRID — same ProductCard the dynamic listing uses
        ===================================================== */}

        {!loading && !error && products.length > 0 && (
          <div
            className="
              flex
              gap-4
              overflow-x-auto
              pb-1
              snap-x
              snap-mandatory
              [&::-webkit-scrollbar]:hidden
              sm:grid
              sm:grid-cols-3
              sm:gap-5
              sm:overflow-visible
              sm:pb-0
              sm:snap-none
              lg:grid-cols-5
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.productId}
                className="w-[44%] max-w-[220px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
