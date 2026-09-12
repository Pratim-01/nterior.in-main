import type { Product } from "@/types/products";
import NoProductsFound from "../components/NoProductsFound";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  /** Whether at least one successful response has been received — tells
   *  "first load" skeletons apart from "refetching after a filter change"
   *  (where the previous grid stays visible, dimmed). */
  hasLoadedOnce: boolean;
  /** Category/page context shown in the empty state, e.g. "Plywood". */
  category?: string;
  /** Whether the empty result is caused by the visitor's own filter
   *  selection rather than the category having no catalogue at all —
   *  swaps in filter-specific copy in the empty state. */
  hasActiveFilters?: boolean;
  /** Clears every active filter in one step — enables the empty state's
   *  "Clear filters" action when `hasActiveFilters` is true. */
  onClearFilters?: () => void;
}

function SkeletonCard() {
  return (
    <div className="h-[320px] animate-pulse rounded-[10px] border border-[#eee] bg-[#f7f7f7] sm:h-[360px]" />
  );
}

// Renders the product grid for whatever page of results the API returned —
// it never knows or cares which category, brand, or filters produced that
// list. The same grid works for plywood, tiles, paints, or any category
// with 10 products or 10,000.
export default function ProductGrid({
  products,
  isLoading,
  hasLoadedOnce,
  category,
  hasActiveFilters = false,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading && !hasLoadedOnce) {
    return (
      <div className="grid grid-cols-2 items-start gap-2.5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <NoProductsFound
        category={category}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-2 items-start gap-2.5 transition-opacity duration-150 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-5 ${
        isLoading ? "opacity-60" : "opacity-100"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
