import Link from "next/link";
import { notFound } from "next/navigation";

import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";

type PageProps = {
  params: Promise<{
    subcategory: string;
  }>;

  searchParams: Promise<{
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    productType?: string;
  }>;
};

const VALID_SUBCATEGORIES = {
  plywood: "Plywood",
  blockboards: "Blockboards",
} as const;

type Subcategory =
  keyof typeof VALID_SUBCATEGORIES;

type ApiProduct = {
  product_id: number;
  product_name: string;
  category: string;
  product_type: "sqft" | "unit";
  short_description?: string;
  sell_mrp: number;
  mrp: number;
  gst_percentage: number;
  gst_exclude: boolean;
  image_url?: string;
  image_alt_text?: string;
};

type ApiResponse = {
  success: boolean;
  products: ApiProduct[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

async function getProducts(
  subcategory: string,
  searchParams: {
    page?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    productType?: string;
  }
): Promise<ApiResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const params = new URLSearchParams();

  params.set(
    "subcategory",
    subcategory
  );

  params.set(
    "page",
    searchParams.page || "1"
  );

  /*
   * 12 products keeps the API response
   * lightweight while the grid displays
   * four products per row.
   */
  params.set("limit", "12");

  if (searchParams.sort) {
    params.set(
      "sort",
      searchParams.sort
    );
  }

  if (searchParams.minPrice) {
    params.set(
      "minPrice",
      searchParams.minPrice
    );
  }

  if (searchParams.maxPrice) {
    params.set(
      "maxPrice",
      searchParams.maxPrice
    );
  }

  if (searchParams.productType) {
    params.set(
      "productType",
      searchParams.productType
    );
  }

  const response = await fetch(
    `${baseUrl}/api/products/plywood-blockboards?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return response.json();
}

export default async function ProductListingPage({
  params,
  searchParams,
}: PageProps) {
  const { subcategory } = await params;

  const filters = await searchParams;

  const normalized =
    subcategory.toLowerCase() as Subcategory;

  if (
    !VALID_SUBCATEGORIES[normalized]
  ) {
    notFound();
  }

  const categoryName =
    VALID_SUBCATEGORIES[normalized];

  const data = await getProducts(
    normalized,
    filters
  );

  const currentPage =
    data.pagination.page;

  return (
    <main className="min-h-screen bg-white">
      {/* ======================================================
          PAGE CONTAINER

          The container intentionally has space on the
          left and right side, matching the reference UI.
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1777px]
          px-7
          pb-16
          pt-6

          sm:px-8
          sm:pt-7

          lg:px-8
          lg:pt-7

          xl:px-10
        "
      >
        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="
            mb-6
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-gray-500
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

          <Link
            href="/products/items/plywood-blockboards"
            className="
              transition-colors
              hover:text-[rgb(207,0,6)]
            "
          >
            Plywood & Blockboards
          </Link>

          <span className="text-gray-300">
            /
          </span>

          <span className="font-semibold text-gray-900">
            {categoryName}
          </span>
        </nav>

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <header
          className="
            border-b
            border-gray-200
            pb-5
          "
        >
          {/* <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-gray-900

              sm:text-3xl
            "
          >
            Buy High-Quality {categoryName}
          </h1>

          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-gray-500

              sm:text-base
            "
          >
            Explore durable{" "}
            {categoryName.toLowerCase()} for
            furniture, kitchens, wardrobes and
            modern interior projects.
          </p> */}

          {/* ==================================================
              CATEGORY TABS
          ================================================== */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >
            <Link
              href="/products/items/plywood-blockboards/plywood"
              className={`
                inline-flex
                h-[44px]
                items-center
                justify-center
                rounded-full
                border
                px-7
                text-sm
                font-semibold
                transition-colors

                ${normalized === "plywood"
                  ? `
                      border-[rgb(207,0,6)]
                      bg-[rgb(207,0,6)]
                      text-white
                    `
                  : `
                      border-gray-200
                      bg-white
                      text-gray-700
                      hover:border-[rgb(207,0,6)]
                      hover:text-[rgb(207,0,6)]
                    `
                }
              `}
            >
              Plywood
            </Link>

            <Link
              href="/products/items/plywood-blockboards/blockboards"
              className={`
                inline-flex
                h-[44px]
                items-center
                justify-center
                rounded-full
                border
                px-7
                text-sm
                font-semibold
                transition-colors

                ${normalized === "blockboards"
                  ? `
                      border-[rgb(207,0,6)]
                      bg-[rgb(207,0,6)]
                      text-white
                    `
                  : `
                      border-gray-200
                      bg-white
                      text-gray-700
                      hover:border-[rgb(207,0,6)]
                      hover:text-[rgb(207,0,6)]
                    `
                }
              `}
            >
              Blockboards
            </Link>

            {/* <button
              type="button"
              disabled
              className="
                inline-flex
                h-[44px]
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white
                px-7
                text-sm
                font-semibold
                text-gray-700
                opacity-90
              "
            >
              Flexible Ply
            </button> */}
          </div>
        </header>

        {/* ==================================================
            PRODUCTS SECTION

            Fixed filter width + flexible product area.
        ================================================== */}

        <div
          className="
            mt-7
            flex
            items-start
            gap-7

            xl:gap-8
          "
        >
          {/* =================================================
              FILTER SIDEBAR
          ================================================= */}

          <ProductFilters />

          {/* =================================================
              PRODUCTS AREA
          ================================================= */}

          <section
            className="
              min-w-0
              flex-1
            "
          >
            {/* =================================================
                PRODUCT TOOLBAR
            ================================================= */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                <span className="font-medium">
                  {data.pagination.total}
                </span>{" "}
                products
              </p>

              <SortDropdown />
            </div>

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <ProductGrid
              products={data.products}
            />

            {/* =================================================
                PAGINATION
            ================================================= */}

            <Pagination
              currentPage={currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={(page) => {
                const params = new URLSearchParams();

                params.set("page", String(page));

                if (filters.sort) {
                  params.set("sort", filters.sort);
                }

                if (filters.minPrice) {
                  params.set(
                    "minPrice",
                    filters.minPrice
                  );
                }

                if (filters.maxPrice) {
                  params.set(
                    "maxPrice",
                    filters.maxPrice
                  );
                }

                if (filters.productType) {
                  params.set(
                    "productType",
                    filters.productType
                  );
                }

                window.location.href =
                  `?${params.toString()}`;
              }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}