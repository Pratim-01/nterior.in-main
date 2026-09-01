import type { Product } from "@/types/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  /** Whether at least one successful response has been received — tells
   *  "first load" skeletons apart from "refetching after a filter change"
   *  (where the previous grid stays visible, dimmed). */
  hasLoadedOnce: boolean;
  onClearFilters?: () => void;
}

function SkeletonCard() {
  return (
    <div className="h-[380px] animate-pulse rounded-[10px] border border-[#eee] bg-[#f7f7f7]" />
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
  onClearFilters,
}: ProductGridProps) {
  if (isLoading && !hasLoadedOnce) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[350px] items-center justify-center rounded-[10px] border border-dashed border-[#dedede] bg-[#fafafa] px-6 text-center">
        <div>
          <h2 className="text-[20px] font-semibold text-[#111]">No products found</h2>
          <p className="mt-2 text-[14px] text-[#777]">
            There are currently no products available with these filters.
          </p>
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#CF0006] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#aa0005]"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 transition-opacity duration-150 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:gap-8 ${
        isLoading ? "opacity-60" : "opacity-100"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
