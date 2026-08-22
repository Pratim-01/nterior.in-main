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

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [categoryCounts, setCategoryCounts] =
    useState({
      Plywood: 0,
      Blockboards: 0,
    });

  /* ==========================================================
     FETCH PRODUCTS
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

        setProducts(
          data.products || []
        );

        setTotalPages(
          data.pagination
            ?.totalPages || 0
        );

        setTotalProducts(
          data.pagination
            ?.totalProducts || 0
        );

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
    <main className="min-h-screen w-full bg-white">
      {/* ========================================================
          PAGE CONTAINER
      ======================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]

          px-0

          pb-12
          pt-3

          sm:px-6
          sm:pb-16
          sm:pt-5

          lg:px-7
          lg:pt-7

          xl:px-8
        "
      >

        {/* ======================================================
            BREADCRUMB

            Desktop only.
        ====================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="
            mb-5
            hidden
            flex-wrap
            items-center
            gap-2
            px-5
            text-[13px]
            text-gray-500

            sm:flex
            sm:px-0
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

            Kept for desktop.
        ====================================================== */}

        <div className="hidden">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {/* ======================================================
            MAIN LISTING
        ====================================================== */}

        <div
          className="
            flex
            w-full
            flex-col

            lg:flex-row
            lg:items-start
            lg:gap-8

            xl:gap-9
          "
        >

          {/* ====================================================
              DESKTOP FILTER SIDEBAR

              Completely hidden below lg.
          ==================================================== */}

          <aside
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
          </aside>

          {/* ====================================================
              PRODUCTS AREA

              IMPORTANT:
              width is 100% on mobile.
          ==================================================== */}

          <section
            className="
              min-w-0
              w-full
              flex-1
            "
          >

            {/* ==================================================
                MOBILE CATEGORY HEADER
            ================================================== */}

            <div
              className="
                block
                border-b
                border-gray-200
                px-4
                pb-3

                sm:hidden
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <h1
                  className="
                    truncate
                    text-lg
                    font-bold
                    tracking-tight
                    text-gray-900
                  "
                >
                  {category}
                </h1>

                <span
                  className="
                    shrink-0
                    text-xs
                    text-gray-500
                  "
                >
                  {totalProducts} products
                </span>
              </div>
            </div>

            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <div
              className="
                flex
                w-full
                items-center
                justify-between
                gap-3

                border-b
                border-gray-100

                px-4
                py-3

                sm:mb-5
                sm:border-0
                sm:px-0
                sm:py-0
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
                <span className="font-medium">
                  {loading
                    ? "Loading..."
                    : totalProducts}
                </span>{" "}
                products
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
                  w-full

                  sm:grid
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
                        flex
                        h-[108px]
                        w-full
                        border-b
                        border-gray-200
                        bg-white

                        sm:h-auto
                        sm:flex-col
                        sm:overflow-hidden
                        sm:rounded-xl
                        sm:border
                        sm:border-gray-100
                      "
                    >
                      {/* MOBILE IMAGE */}

                      <div
                        className="
                          h-[108px]
                          w-[108px]
                          min-w-[108px]
                          animate-pulse
                          bg-gray-100

                          sm:h-[280px]
                          sm:w-full
                        "
                      />

                      {/* MOBILE CONTENT */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                          gap-2
                          px-3
                          py-2

                          sm:p-4
                        "
                      >
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
                            h-3
                            w-2/5
                            animate-pulse
                            rounded
                            bg-gray-100
                          "
                        />

                        <div
                          className="
                            mt-auto
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
                    mx-4
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

                    sm:mx-0
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
                    mx-4
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

                    sm:mx-0
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