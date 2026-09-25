"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import type { FilterState } from "@/types/products";
import type { BreadcrumbCrumb } from "@/lib/category-taxonomy";
import { buildQueryString } from "@/lib/product-query-params";
import AuroraBackground from "@/components/AuroraBackground";
import { useProductUrlState } from "./useProductUrlState";
import { useProducts } from "./useProducts";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import Breadcrumb from "./Breadcrumb";

/* =========================================================
   PROPS
========================================================= */

type ProductListingProps = {
  /** Locks the listing to a single category (e.g. "Plywood") — used by
   *  category landing pages. Leave undefined for a catalogue-wide listing
   *  where the Category filter itself is shown. */
  category?: string;
  title?: string;
  description?: string;
  /** Trail shown after "Home", matching the real navbar's wording (see
   *  src/lib/category-taxonomy.ts). Falls back to a generic "Home /
   *  Products / <title>" trail when omitted, e.g. on the catalogue-wide
   *  listing where there's no single fixed category. */
  breadcrumb?: BreadcrumbCrumb[];
  /** Sibling category values from the same navbar column as `category`
   *  (see `getColumnCategories` in src/lib/category-taxonomy.ts), e.g.
   *  ["Plywood", "Blockboards"]. When set, `category` is only the
   *  *default* selection rather than a hard lock: the filter sidebar
   *  shows a Category group scoped to just these siblings, above Brand,
   *  and the visitor can switch between them (or select more than one)
   *  without leaving the page. Leave undefined for pages that should
   *  stay locked to a single category. */
  categoryOptions?: string[];
};

/* =========================================================
   PRODUCT LISTING

   MySQL → /api/products → ProductListing → ProductGrid → ProductCard,
   with dynamic filters/sort/pagination computed entirely by the database.
   This same component serves every category in the store — plywood,
   blockboards, tiles, paints, electricals, hardware, kitchen, bathroom,
   appliances, sofa & dining, lighting & fans, power & hand tools, and any
   future category — because none of the filtering logic lives here or in
   the browser.
========================================================= */

/**
 * Next.js requires any component that calls `useSearchParams()` (which
 * `useProductUrlState` does, transitively) to sit under a `<Suspense>`
 * boundary, or static prerendering fails with "useSearchParams() should be
 * wrapped in a suspense boundary". Every category page renders
 * `ProductListing` directly, so the boundary lives here once rather than
 * being duplicated in every page.tsx that uses it.
 */
export default function ProductListing(props: ProductListingProps) {
  return (
    <Suspense fallback={<ProductListingFallback />}>
      <ProductListingContent {...props} />
    </Suspense>
  );
}

function ProductListingFallback() {
  return (
    <main className="relative min-h-screen w-full">
      <AuroraBackground />
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[380px] animate-pulse rounded-[10px] border border-[#eee] bg-white/60"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductListingContent({
  category,
  title,
  description,
  breadcrumb,
  categoryOptions,
}: ProductListingProps) {
  const { filters, minPrice, maxPrice, sort, page, pageSize, q, update } =
    useProductUrlState();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // A category prop (from a category landing page's route) always wins
  // over whatever is in the URL, so /products/plywood can never show
  // anything but Plywood, while still letting brand/size/thickness/grade/
  // price/sort/page vary freely via the query string.
  //
  // When `categoryOptions` is set, `category` is only a *default* — the
  // visitor picks exactly one sibling from `categoryOptions` via the
  // single-select Category group instead (see ProductFilters). Only the
  // first valid, in-column value from the URL is kept (guards against a
  // stray multi-value ?category= from elsewhere or an older link), and no
  // valid selection falls back to the page's own default category rather
  // than silently expanding to the entire catalogue.
  const effectiveFilters: FilterState = useMemo(() => {
    if (categoryOptions && categoryOptions.length > 0) {
      const selected = filters.category.find((c) => categoryOptions.includes(c));
      return {
        ...filters,
        category: selected ? [selected] : category ? [category] : [categoryOptions[0]],
      };
    }
    return category ? { ...filters, category: [category] } : filters;
  }, [filters, category, categoryOptions]);

  const queryString = useMemo(
    () =>
      buildQueryString({
        filters: effectiveFilters,
        minPrice,
        maxPrice,
        sort,
        page,
        pageSize,
        q,
      }),
    [effectiveFilters, minPrice, maxPrice, sort, page, pageSize, q]
  );

  const { data, isLoading, error } = useProducts(queryString);
  const pagination = data?.pagination;

  // If a filter change leaves fewer pages than the URL's current page,
  // snap back to the last real page instead of showing an empty grid.
  useEffect(() => {
    if (pagination && page > pagination.totalPages) {
      update({ page: pagination.totalPages });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination?.totalPages]);

  // Prevent the page behind the full-screen mobile filter drawer from
  // scrolling while it's open.
  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileFiltersOpen]);

  const activeFilterCount =
    (
      ["subCategory", "brand", "productType", "size", "thickness", "grade"] as (keyof FilterState)[]
    ).reduce((sum, key) => sum + filters[key].length, 0) +
    (category && !categoryOptions ? 0 : q ? 0 : filters.category.length) +
    (minPrice !== null ? 1 : 0) +
    (maxPrice !== null ? 1 : 0);

  function handleFilterChange(next: FilterState) {
    const nextFilters = category && !categoryOptions ? { ...next, category: [category] } : next;
    update({ filters: nextFilters, page: 1 });
  }

  function handlePriceChange(next: { minPrice: number | null; maxPrice: number | null }) {
    update({ minPrice: next.minPrice, maxPrice: next.maxPrice, page: 1 });
  }

  function handlePageChange(next: number) {
    update({ page: next });
  }

  function clearAllFilters() {
    update({
      filters: {
        ...filters,
        category: category ? [category] : [],
        subCategory: [],
        brand: [],
        productType: [],
        size: [],
        thickness: [],
        grade: [],
      },
      minPrice: null,
      maxPrice: null,
      page: 1,
    });
  }

  const products = data?.products ?? [];
  const totalProducts = pagination?.totalItems ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const safeCurrentPage = pagination?.page ?? page;

  // The catalogue-wide `/search` route has no fixed `category` (it needs
  // to be able to match a term across every category at once), but a
  // Category filter there does more harm than good: a plain word like
  // "door" or "light" also happens to be the start of a real category
  // name, so showing a Category group next to a free-text search
  // encourages exactly the confusing state this page used to fall into
  // by itself (see resolveSearchFilters in lib/search-resolve.ts) — a
  // narrow, easy-to-misread slice of the results instead of everything
  // that actually matched. Category-locked and column-landing pages
  // (categoryOptions set) are unaffected — they hide/show the group for
  // their own, unrelated reasons below.
  const hideCategoryFilter = Boolean(category) || Boolean(q);

  // On a column landing page (categoryOptions set), switching to a
  // sibling category should update the heading to match what's actually
  // showing — the static `title` prop was written for the page's default
  // category and would otherwise go stale the moment the visitor picks a
  // different sibling.
  const isDefaultCategorySelection =
    !categoryOptions ||
    (category ? effectiveFilters.category.length === 1 && effectiveFilters.category[0] === category : false);

  // A search term takes over the heading on the catalogue-wide listing
  // (no fixed `category` prop, e.g. /search) — a category landing page's
  // own title always wins, since that page's category lock stays active
  // even if a stray ?q= ends up in its URL.
  const displayTitle =
    q && !category
      ? `Search results for "${q}"`
      : isDefaultCategorySelection
      ? title ?? category ?? (filters.category.length === 1 ? filters.category[0] : "All Products")
      : effectiveFilters.category.join(" & ");

  return (
    <main className="relative min-h-screen w-full">
      <AuroraBackground />
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        {/* BREADCRUMB */}
        <div className="mb-7">
          <Breadcrumb
            items={[
              { label: "Home", href: "/products" },
              ...(breadcrumb ?? [
                { label: "Products", href: "/products" },
                { label: displayTitle },
              ]),
            ]}
          />
        </div>

        {/* SEO */}
        <div className="hidden">
          <h1>{displayTitle}</h1>
          {description && <p>{description}</p>}
        </div>

        {/* TITLE + DESKTOP SORT */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-medium leading-tight text-[#111] sm:text-[24px] lg:text-[26px]">
              {displayTitle}
            </h1>
            <p className="mt-1 text-[14px] leading-5 text-[#777]">
              {isLoading && !data ? "Loading…" : `${totalProducts} products`}
            </p>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <SortDropdown />
          </div>
        </div>

        {/* MOBILE TOOLBAR */}
        <div className="mb-5 flex items-center justify-between gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-white/85 px-4 py-2.5 text-[13px] font-medium text-gray-900 shadow-sm backdrop-blur-md"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(207,0,6)] px-1 text-[11px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <SortDropdown />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex w-full items-start gap-6 lg:gap-7 xl:gap-8">
          {/* FILTER SIDEBAR — inline/sticky on sm+ screens */}
          <div className="hidden shrink-0 sm:block">
            <div className="sticky top-28">
              <ProductFilters
                facets={data?.facets}
                filters={effectiveFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={data?.priceRange}
                onFilterChange={handleFilterChange}
                onPriceChange={handlePriceChange}
                onClearAll={clearAllFilters}
                hideCategory={hideCategoryFilter}
                categoryOptions={categoryOptions}
              />
            </div>
          </div>

          {/* FILTER SIDEBAR — full-screen overlay on mobile, below the fixed header */}
          {mobileFiltersOpen && (
            <div className="fixed inset-x-0 bottom-0 top-[108px] z-40 sm:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />

              {/* Full-screen panel */}
              <div className="absolute inset-0 flex flex-col overflow-hidden bg-white">
                <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
                  <h2 className="text-[15px] font-bold text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                  <ProductFilters
                    facets={data?.facets}
                    filters={effectiveFilters}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    priceRange={data?.priceRange}
                    onFilterChange={handleFilterChange}
                    onPriceChange={handlePriceChange}
                    onClearAll={clearAllFilters}
                    hideCategory={hideCategoryFilter}
                    categoryOptions={categoryOptions}
                    fullWidth
                  />
                </div>

                <div className="shrink-0 border-t border-gray-100 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full rounded-[8px] bg-[rgb(207,0,6)] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[rgb(170,0,5)]"
                  >
                    Show {totalProducts} results
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* PRODUCT AREA */}
          <section className="min-w-0 flex-1">
            {error ? (
              <div className="flex min-h-[350px] items-center justify-center rounded-[10px] border border-dashed border-[#dedede] bg-[#fafafa] px-6 text-center">
                <div>
                  <h2 className="text-[20px] font-semibold text-[#111]">
                    Couldn&apos;t load products
                  </h2>
                  <p className="mt-2 text-[14px] text-[#777]">{error}</p>
                  <Link
                    href="/products"
                    className="mt-5 inline-flex items-center gap-2 rounded-[8px] bg-[rgb(207,0,6)] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[rgb(170,0,5)]"
                  >
                    <ArrowLeft size={15} />
                    Browse Products
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  isLoading={isLoading}
                  hasLoadedOnce={data !== null}
                  category={displayTitle}
                  hasActiveFilters={activeFilterCount > 0}
                  onClearFilters={clearAllFilters}
                />

                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
