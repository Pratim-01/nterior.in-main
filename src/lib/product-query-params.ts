import {
  DEFAULT_SORT,
  FACET_KEYS,
  FilterState,
  SortOption,
  createEmptyFilterState,
} from "@/types/products";

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 60;

const VALID_SORTS: SortOption[] = [
  "newest",
  "price-low",
  "price-high",
  "name-asc",
  "name-desc",
];

export interface ParsedProductQuery {
  filters: FilterState;
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOption;
  page: number;
  pageSize: number;
}

function parsePriceParam(raw: string | null): number | null {
  if (raw === null || raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/**
 * Parses a `URLSearchParams` into a fully-typed, validated query. Works for
 * both the browser's `window.location.search` (via useProductUrlState) and
 * Next's server-side `request.nextUrl.searchParams` (in /api/products) —
 * this is the single source of truth for what every query param means, so
 * the two call sites can never read a param differently.
 */
export function parseProductQuery(
  params: URLSearchParams
): ParsedProductQuery {
  const filters = createEmptyFilterState();

  FACET_KEYS.forEach((key) => {
    const raw = params.get(key);
    filters[key] = raw
      ? raw
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];
  });

  const sortRaw = params.get("sort");
  const sort: SortOption = VALID_SORTS.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : DEFAULT_SORT;

  const pageRaw = Number(params.get("page"));
  const page =
    Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;

  const pageSizeRaw = Number(params.get("pageSize"));
  const pageSize =
    Number.isFinite(pageSizeRaw) && pageSizeRaw >= 1
      ? Math.min(Math.floor(pageSizeRaw), MAX_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  return {
    filters,
    minPrice: parsePriceParam(params.get("minPrice")),
    maxPrice: parsePriceParam(params.get("maxPrice")),
    sort,
    page,
    pageSize,
  };
}

/**
 * Serializes a partial query update back into a query string, merged on top
 * of `base` (the current URL's params) and dropping default values so the
 * address bar stays clean. This is what makes every filtered/sorted/
 * paginated view shareable and back/forward-button friendly, e.g.:
 * `/products/plywood?brand=Greenply&thickness=18mm&minPrice=1000&maxPrice=5000&sort=price-low&page=2`
 */
export function buildQueryString(
  query: Partial<ParsedProductQuery>,
  base?: URLSearchParams
): string {
  const params = new URLSearchParams(base?.toString());

  if (query.filters) {
    FACET_KEYS.forEach((key) => {
      const values = query.filters![key];
      if (values && values.length > 0) params.set(key, values.join(","));
      else params.delete(key);
    });
  }

  if ("minPrice" in query) {
    if (query.minPrice !== null && query.minPrice !== undefined) {
      params.set("minPrice", String(query.minPrice));
    } else {
      params.delete("minPrice");
    }
  }

  if ("maxPrice" in query) {
    if (query.maxPrice !== null && query.maxPrice !== undefined) {
      params.set("maxPrice", String(query.maxPrice));
    } else {
      params.delete("maxPrice");
    }
  }

  if (query.sort) {
    if (query.sort === DEFAULT_SORT) params.delete("sort");
    else params.set("sort", query.sort);
  }

  if (query.page !== undefined) {
    if (query.page <= 1) params.delete("page");
    else params.set("page", String(query.page));
  }

  // Filter/sort/price changes invalidate whatever page the user was on.
  // Callers that only change `page` itself pass nothing else, so this only
  // fires on real filter/sort/price changes.
  if (
    (query.filters || query.sort || "minPrice" in query || "maxPrice" in query) &&
    query.page === undefined
  ) {
    params.delete("page");
  }

  return params.toString();
}
