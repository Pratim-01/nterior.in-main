"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, SlidersHorizontal, Search } from "lucide-react";

type NoProductsFoundProps = {
  /** Category / page context to show, e.g. "Plywood" or "Gas Stove". */
  category?: string;
  /** True when the empty result is caused by the visitor's own filter
   *  selection (brand/size/price/etc.) rather than the category itself
   *  having no catalogue yet — swaps in filter-specific copy and gives a
   *  working "Clear filters" action instead of just "Go back". */
  hasActiveFilters?: boolean;
  /** Clears every active filter in one step. Required to show the "Clear
   *  filters" action — without it, only "Go back" / "Browse all products"
   *  are shown. */
  onClearFilters?: () => void;
};

// Three empty "shelf slots" shaped exactly like a real ProductCard
// (src/app/products/listing/ProductCard.tsx) — same radius, same border
// color — so the empty state reads as "this shelf has nothing on it yet"
// rather than a generic system icon unrelated to what's missing. Fades in
// once on mount; reduced-motion visitors see it appear instantly instead.
function EmptyShelf() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-hidden="true"
      className={`mb-8 flex items-end justify-center gap-3 transition-opacity duration-500 motion-reduce:duration-0 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-[88px] w-[64px] rounded-[10px] border-2 border-dashed border-[#e2e2e2] bg-[#fafafa] opacity-70 sm:h-[104px] sm:w-[76px]" />

      <div className="flex h-[112px] w-[80px] items-center justify-center rounded-[10px] border-2 border-dashed border-[rgb(207,0,6)]/35 bg-[#fbeae6] sm:h-[132px] sm:w-[96px]">
        <Search size={26} strokeWidth={1.75} className="text-[rgb(207,0,6)]" />
      </div>

      <div className="h-[88px] w-[64px] rounded-[10px] border-2 border-dashed border-[#e2e2e2] bg-[#fafafa] opacity-70 sm:h-[104px] sm:w-[76px]" />
    </div>
  );
}

export default function NoProductsFound({
  category,
  hasActiveFilters = false,
  onClearFilters,
}: NoProductsFoundProps) {
  const router = useRouter();

  const heading = hasActiveFilters
    ? "No products match your filters"
    : "No products found";

  const description = hasActiveFilters
    ? category
      ? `None of the ${category} products match your current filters.`
      : "None of the products match your current filters."
    : category
      ? `We're still adding ${category} to our catalogue. Check back soon.`
      : "We couldn't find any products here right now. Check back soon.";

  const showClearFilters = hasActiveFilters && Boolean(onClearFilters);

  return (
    <section className="flex w-full items-center justify-center px-4 py-14 sm:px-6 sm:py-0">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <EmptyShelf />

        {category && (
          <span className="mb-4 inline-flex max-w-full items-center truncate rounded-full border border-[#dedede] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#27304a]">
            {category}
          </span>
        )}

        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[26px]">
          {heading}
        </h1>

        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#4b5563]">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          {showClearFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[rgb(170,0,5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(207,0,6)]"
            >
              <SlidersHorizontal size={15} />
              Clear filters
            </button>
          ) : (
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[rgb(170,0,5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(207,0,6)]"
            >
              Go to home
            </Link>
          )}

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dedede] bg-white px-6 text-sm font-semibold text-[#374151] transition-colors duration-150 hover:border-[#c7c7c7] hover:bg-[#fafafa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ca3af]"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </div>
    </section>
  );
}
