// Product data always comes from MySQL (`product_details` + `product_images`
// in the Kayapalat DB), through /api/products — nothing in this file is a
// fixed list of "the brands/sizes/grades we happen to have today". Every
// filterable attribute is a plain string discovered dynamically from
// whatever the database contains. Adding a new category, brand, size,
// thickness, or grade in MySQL never requires touching this file or any
// component — see scripts/migrations/2026_08_29_add_product_facets.sql.

export interface Product {
  productId: number;
  productName: string;
  category: string;
  subCategory: string | null;
  brand: string | null;
  productType: "sqft" | "unit" | string;
  size: string | null;
  thickness: string | null;
  grade: string | null;
  shortDescription: string | null;
  price: number;
  mrp: number | null;
  gstPercentage: number | null;
  gstExclude: boolean;
  imageUrl: string | null;
  imageAltText: string | null;
  /**
   * Anything else that doesn't need its own filter column (category-specific
   * specs: finish, coverage, voltage, warranty, colour, material, etc).
   * Rendered generically on the product card — a component must never
   * assume any particular key exists here, since it varies per category.
   */
  attributes: Record<string, string | number | boolean | null>;
  createdAt: string | null;
}

export type SortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];

export const DEFAULT_SORT: SortOption = "newest";

// The multi-select filter facets shown in the sidebar. Every one of these
// maps 1:1 to a real column on `product_details` (see FACET_COLUMNS in
// lib/product-query.ts) and to a query-string parameter of the same name —
// the API route and the URL-state hook both iterate this same list, so
// adding a facet is a single change made in one place.
export const FACET_KEYS = [
  "category",
  "subCategory",
  "brand",
  "productType",
  "size",
  "thickness",
  "grade",
] as const;

export type FacetKey = (typeof FACET_KEYS)[number];

export type FilterState = Record<FacetKey, string[]>;

export function createEmptyFilterState(): FilterState {
  return {
    category: [],
    subCategory: [],
    brand: [],
    productType: [],
    size: [],
    thickness: [],
    grade: [],
  };
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

/** One option list per facet key, with live counts computed in MySQL against
 *  every *other* currently-active filter — never hardcoded, never computed
 *  in the browser. */
export type Facets = Record<FacetKey, FacetOption[]>;

export interface PriceRange {
  min: number;
  max: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
  facets: Facets;
  priceRange: PriceRange;
}

export interface ProductsErrorResponse {
  error: string;
}

// -----------------------------------------------------------------------
// Single product ("buy page") types. `/api/products/[productId]` returns
// every field `Product` already has, plus the full image gallery (not just
// the one primary image the listing grid uses) and a handful of related
// products from the same category so the page can show "You may also
// like" without a second round trip from the browser.
// -----------------------------------------------------------------------

export interface ProductImage {
  url: string;
  altText: string;
  isPrimary: boolean;
}

export interface ProductDetail extends Product {
  images: ProductImage[];
  /** Full long-form write-up (`product_details.about_product`) — distinct
   *  from the one-line `shortDescription` shown on cards; only fetched for
   *  the single-product page, not the listing grid. */
  aboutProduct: string | null;
  /** Whether this product can also be seen/bought in person at a physical
   *  showroom (`product_details.showroom_stock`), and which showroom/aisle
   *  reference to show if so (`showroom_stock_number`). */
  showroomStock: boolean;
  showroomStockNumber: string | null;
}

export interface ProductDetailResponse {
  product: ProductDetail;
  relatedProducts: Product[];
}

export interface ProductDetailErrorResponse {
  error: string;
}
