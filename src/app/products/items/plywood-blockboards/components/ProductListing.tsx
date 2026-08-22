"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

export type Product = {
  product_id: number;
  product_name: string;
  category: string;
  product_type: "sqft" | "unit";
  short_description: string | null;
  sell_mrp: number | string | null;
  mrp: number | string | null;
  gst_percentage: number | string | null;
  gst_exclude: number | boolean | null;
  image_url: string | null;
  image_alt_text: string | null;
};

type ProductListingProps = {
  category: string;
  title: string;
  description: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;

  products?: Product[];

  categoryCounts?: {
    Plywood: number;
    Blockboards: number;
  };

  pagination?: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export default function ProductListing({
  category,
  title,
  description,
}: ProductListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ==========================================================
     URL STATE
  ========================================================== */

  const pageFromUrl = Number(
    searchParams.get("page") || "1"
  );

  const currentSort =
    searchParams.get("sort") || "newest";

  const currentPage =
    Number.isFinite(pageFromUrl) &&
    pageFromUrl > 0
      ? Math.floor(pageFromUrl)
      : 1;

  /* ==========================================================
     PRODUCT STATE
  ========================================================== */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * Number of pages for the current category.
   */
  const [totalPages, setTotalPages] =
    useState(0);

  /*
   * Total number of products for
   * the current category.
   */
  const [totalProducts, setTotalProducts] =
    useState(0);

  /*
   * Product counts for the sidebar category
   * buttons.
   */
  const [categoryCounts, setCategoryCounts] =
    useState({
      Plywood: 0,
      Blockboards: 0,
    });

  /* ==========================================================
     FETCH PRODUCTS

     12 products per page.

     Desktop:
     4 columns × 3 rows = 12 products.
  ========================================================== */

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const params =
          new URLSearchParams();

        params.set(
          "category",
          category
        );

        params.set(
          "page",
          String(currentPage)
        );

        /*
         * 12 products per page.
         *
         * Desktop:
         * 4 columns
         * 3 rows
         */
        params.set("limit", "12");

        params.set(
          "sort",
          currentSort
        );

        const response =
          await fetch(
            `/api/kayapalat-products?${params.toString()}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products"
          );
        }

        const data: ApiResponse =
          await response.json();

        if (!data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch products"
          );
        }

        if (cancelled) {
          return;
        }

        /* ====================================================
           PRODUCTS
        ==================================================== */

        setProducts(
          data.products || []
        );

        /* ====================================================
           PAGINATION
        ==================================================== */

        setTotalPages(
          data.pagination
            ?.totalPages || 0
        );

        /* ====================================================
           TOTAL PRODUCT COUNT
        ==================================================== */

        setTotalProducts(
          data.pagination
            ?.totalProducts || 0
        );

        /* ====================================================
           CATEGORY COUNTS
        ==================================================== */

        setCategoryCounts(
          data.categoryCounts || {
            Plywood: 0,
            Blockboards: 0,
          }
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Product listing error:",
          err
        );

        setError(
          "Unable to load products right now. Please try again later."
        );

        setProducts([]);

        setTotalPages(0);

        setTotalProducts(0);

        setCategoryCounts({
          Plywood: 0,
          Blockboards: 0,
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [
    category,
    currentPage,
    currentSort,
  ]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  function handlePageChange(
    page: number
  ) {
    if (page < 1) {
      return;
    }

    if (
      totalPages > 0 &&
      page > totalPages
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(page)
    );

    router.push(
      `?${params.toString()}`,
      {
        scroll: false,
      }
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ========================================================
          PAGE CONTAINER
      ======================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          pb-12
          pt-5

          sm:px-6
          sm:pb-16

          lg:px-7
          lg:pt-7

          xl:px-8
        "
      >
        {/* ======================================================
            BREADCRUMB
        ====================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="
            mb-5
            flex
            flex-wrap
            items-center
            gap-2
            text-[13px]
            text-gray-500

            sm:mb-6
            sm:text-sm
          "
        >
          <Link
            href="/products"
            className="
              transition-colors
              hover:text-[rgb(207,0,6)]
            "
          >
            Home
          </Link>

          <span className="text-gray-300">
            /
          </span>

          <Link
            href="/products/items/plywood-laminates"
            className="
              transition-colors
              hover:text-[rgb(207,0,6)]
            "
          >
            Plywood & Laminates
          </Link>

          <span className="text-gray-300">
            /
          </span>

          <span className="font-medium text-gray-900">
            {category}
          </span>
        </nav>

        {/* ======================================================
            PAGE HEADING
        ====================================================== */}

       

        {/* ======================================================
            MAIN LISTING LAYOUT
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-start
            lg:gap-8

            xl:gap-9
          "
        >
          {/* ====================================================
              LEFT FILTER SIDEBAR
          ==================================================== */}

          <div
            className="
              hidden
              shrink-0
              lg:block
              lg:w-[280px]
              xl:w-[290px]
            "
          >
            <div className="sticky top-28">
              <ProductFilters
                categoryCounts={
                  categoryCounts
                }
              />
            </div>
          </div>

          {/* ====================================================
              PRODUCTS AREA
          ==================================================== */}

          <section
            className="
              min-w-0
              flex-1
            "
          >
            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-4
              "
            >
              {/* PRODUCT COUNT */}

              <p
                className="
                  text-xs
                  text-gray-500

                  sm:text-sm
                "
              >
                {loading
                  ? "Loading products..."
                  : `${totalProducts} products`}
              </p>

              {/* SORT */}

              <SortDropdown />
            </div>

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3

                  sm:grid-cols-2
                  sm:gap-4

                  md:grid-cols-3

                  lg:grid-cols-4

                  xl:grid-cols-4
                  xl:gap-5
                "
              >
                {Array.from({
                  length: 12,
                }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-gray-100
                        bg-white
                      "
                    >
                      <div
                        className="
                          aspect-[4/4.6]
                          animate-pulse
                          bg-gray-100
                        "
                      />

                      <div className="space-y-3 p-4">
                        <div
                          className="
                            h-4
                            w-4/5
                            animate-pulse
                            rounded
                            bg-gray-100
                          "
                        />

                        <div
                          className="
                            h-3
                            w-1/2
                            animate-pulse
                            rounded
                            bg-gray-100
                          "
                        />

                        <div
                          className="
                            h-5
                            w-1/3
                            animate-pulse
                            rounded
                            bg-gray-100
                          "
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* ==================================================
                ERROR
            ================================================== */}

            {!loading &&
              error && (
                <div
                  className="
                    flex
                    min-h-[300px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-6
                    text-center
                  "
                >
                  <p className="text-sm font-medium text-red-600">
                    {error}
                  </p>
                </div>
              )}

            {/* ==================================================
                EMPTY
            ================================================== */}

            {!loading &&
              !error &&
              products.length === 0 && (
                <div
                  className="
                    flex
                    min-h-[350px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-gray-200
                    bg-gray-50
                    px-6
                    text-center
                  "
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      No{" "}
                      {category.toLowerCase()}{" "}
                      products found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      There are currently no
                      products available in
                      this category.
                    </p>

                    <Link
                      href="/products"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-[rgb(207,0,6)]
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition-colors
                        hover:bg-[rgb(170,0,5)]
                      "
                    >
                      <ArrowLeft
                        size={15}
                      />

                      Browse Products
                    </Link>
                  </div>
                </div>
              )}

            {/* ==================================================
                PRODUCTS
            ================================================== */}

            {!loading &&
              !error &&
              products.length > 0 && (
                <>
                  <ProductGrid
                    products={products}
                  />

                  {/* =================================================
                      PAGINATION
                  ================================================= */}

                  <Pagination
                    currentPage={
                      currentPage
                    }
                    totalPages={
                      totalPages
                    }
                    onPageChange={
                      handlePageChange
                    }
                  />
                </>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}