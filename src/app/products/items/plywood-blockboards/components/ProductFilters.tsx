"use client";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import {
  ChevronDown,
  Search,
} from "lucide-react";

import Link from "next/link";

/* ==========================================================
   CATEGORY COUNTS
========================================================== */

type CategoryCounts = {
  Plywood: number;
  Blockboards: number;
};

/* ==========================================================
   FILTER SECTION
========================================================== */

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
};

function FilterSection({
  title,
  children,
  collapsible = false,
}: FilterSectionProps) {
  return (
    <section
      className="
        border-b
        border-gray-100
        py-4
        last:border-b-0
      "
    >
      <div
        className="
          mb-3
          flex
          h-[18px]
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-[12px]
            font-bold
            uppercase
            tracking-[0.05em]
            text-gray-900
          "
        >
          {title}
        </h3>

        {collapsible && (
          <ChevronDown
            size={15}
            strokeWidth={2}
            className="
              shrink-0
              text-gray-700
            "
          />
        )}
      </div>

      {children}
    </section>
  );
}

/* ==========================================================
   CHECKBOX
========================================================== */

type FilterCheckboxProps = {
  label: string;
  count?: number;
  disabled?: boolean;
  onChange?: () => void;
};

function FilterCheckbox({
  label,
  count,
  disabled = false,
  onChange,
}: FilterCheckboxProps) {
  return (
    <label
      className={`
        flex
        min-h-[25px]
        w-full
        items-center
        gap-2
        py-[2px]
        text-[12px]
        leading-[18px]

        ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
    >
      <input
        type="checkbox"
        disabled={disabled}
        onChange={onChange}
        className="
          h-[15px]
          w-[15px]
          shrink-0
          appearance-none
          rounded-[3px]
          border
          border-gray-300
          bg-white
          p-0
          outline-none
          transition-all

          checked:border-[rgb(207,0,6)]
          checked:bg-[rgb(207,0,6)]

          focus:outline-none
          focus:ring-2
          focus:ring-red-100
          focus:ring-offset-0

          disabled:cursor-not-allowed
          disabled:bg-gray-50
          disabled:border-gray-300
        "
      />

      <span
        className={`
          min-w-0
          flex-1
          truncate

          ${
            disabled
              ? "text-gray-300"
              : "text-gray-700"
          }
        `}
      >
        {label}
      </span>

      {typeof count === "number" && (
        <span
          className={`
            ml-auto
            w-[34px]
            shrink-0
            text-right
            text-[11px]
            leading-[18px]

            ${
              disabled
                ? "text-gray-300"
                : "text-gray-400"
            }
          `}
        >
          ({count})
        </span>
      )}
    </label>
  );
}

/* ==========================================================
   CATEGORY OPTION

   Normal clickable navigation item.
========================================================== */

function CategoryOption({
  name,
  href,
  count,
  active,
}: {
  name: string;
  href: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`
        flex
        min-h-[30px]
        w-full
        items-center
        rounded-md
        px-1
        py-1
        text-[12px]
        leading-[18px]
        transition-colors

        ${
          active
            ? "font-semibold text-[rgb(207,0,6)]"
            : "text-gray-700 hover:bg-gray-50 hover:text-[rgb(207,0,6)]"
        }
      `}
    >
      <span className="min-w-0 flex-1 truncate">
        {name}
      </span>

      <span
        className={`
          ml-auto
          w-[34px]
          shrink-0
          text-right
          text-[11px]
          leading-[18px]

          ${
            active
              ? "text-[rgb(207,0,6)]"
              : "text-gray-400"
          }
        `}
      >
        ({count})
      </span>
    </Link>
  );
}

/* ==========================================================
   SEARCH INPUT
========================================================== */

function FilterSearch({
  placeholder,
  disabled = false,
}: {
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative mb-2.5">
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className="
          block
          h-[34px]
          w-full
          rounded-[5px]
          border
          border-gray-200
          bg-white
          px-3
          pr-9
          text-[11px]
          leading-none
          text-gray-700
          outline-none

          placeholder:text-gray-400

          focus:border-gray-300
          focus:ring-1
          focus:ring-gray-100

          disabled:cursor-not-allowed
          disabled:bg-white
        "
      />

      <Search
        size={14}
        strokeWidth={2}
        className="
          pointer-events-none
          absolute
          right-2.5
          top-1/2
          -translate-y-1/2
          text-gray-500
        "
      />
    </div>
  );
}

/* ==========================================================
   MORE BUTTON
========================================================== */

function MoreButton() {
  return (
    <button
      type="button"
      className="
        mt-2
        block
        text-[11px]
        font-medium
        leading-4
        text-[rgb(207,0,6)]
        transition-colors
        hover:text-[rgb(170,0,5)]
        hover:underline
      "
    >
      + 2 more
    </button>
  );
}

/* ==========================================================
   PRODUCT FILTERS
========================================================== */

export default function ProductFilters({
  categoryCounts = {
    Plywood: 0,
    Blockboards: 0,
  },
}: {
  categoryCounts?: CategoryCounts;
}) {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const pathname =
    usePathname();

  /* ========================================================
     PRICE FILTER
  ======================================================== */

  function updatePriceRange(
    min?: string,
    max?: string
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (min) {
      params.set(
        "minPrice",
        min
      );
    } else {
      params.delete(
        "minPrice"
      );
    }

    if (max) {
      params.set(
        "maxPrice",
        max
      );
    } else {
      params.delete(
        "maxPrice"
      );
    }

    params.delete("page");

    router.push(
      `?${params.toString()}`,
      {
        scroll: false,
      }
    );
  }

  /* ========================================================
     CLEAR FILTERS
  ======================================================== */

  function clearFilters() {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    const query =
      params.toString();

    router.push(
      query
        ? `?${query}`
        : window.location.pathname,
      {
        scroll: false,
      }
    );
  }

  return (
    <aside
      className="
        w-[250px]
        min-w-[250px]
        max-w-[250px]
        shrink-0
      "
    >
      <div
        className="
          w-full
          overflow-hidden
          rounded-[8px]
          border
          border-gray-200
          bg-white
        "
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            min-h-[56px]
            items-center
            justify-between
            border-b
            border-gray-100
            px-5
            py-4
          "
        >
          <h2
            className="
              text-[13px]
              font-bold
              leading-none
              text-gray-900
            "
          >
            Filters
          </h2>

          <button
            type="button"
            onClick={clearFilters}
            className="
              text-[11px]
              font-semibold
              leading-none
              text-[rgb(207,0,6)]
              transition-colors
              hover:text-[rgb(170,0,5)]
            "
          >
            Clear all
          </button>
        </div>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="px-5">

          {/* =================================================
              CATEGORY
          ================================================= */}

          <FilterSection title="Category">
            <div className="w-full space-y-1">

              <CategoryOption
                name="Plywood"
                href="/products/items/plywood-blockboards/plywood"
                count={
                  categoryCounts.Plywood
                }
                active={pathname ===
                  "/products/items/plywood-blockboards/plywood"}
              />

              <CategoryOption
                name="Blockboards"
                href="/products/items/plywood-blockboards/blockboards"
                count={
                  categoryCounts.Blockboards
                }
                active={pathname ===
                  "/products/items/plywood-blockboards/blockboards"}
              />

            </div>
          </FilterSection>

          {/* =================================================
              BRAND
          ================================================= */}

          <FilterSection
            title="Brand"
            collapsible
          >
            <div className="w-full">

              <FilterCheckbox
                label="CenturyPly"
                count={19}
                disabled
              />

              <FilterCheckbox
                label="Greenply"
                count={19}
                disabled
              />

              <FilterCheckbox
                label="ACO"
                count={14}
                disabled
              />

              <FilterCheckbox
                label="Apple Ply"
                count={8}
                disabled
              />

              <FilterCheckbox
                label="BILTUS"
                count={8}
                disabled
              />

            </div>

            <MoreButton />
          </FilterSection>

          {/* =================================================
              PRICE RANGE
          ================================================= */}

          <FilterSection title="Price Range">
            <div className="w-full">

              <FilterCheckbox
                label="₹1,000 - ₹2,000"
                count={29}
                onChange={() =>
                  updatePriceRange(
                    "1000",
                    "2000"
                  )
                }
              />

              <FilterCheckbox
                label="₹2,000 - ₹3,000"
                count={22}
                onChange={() =>
                  updatePriceRange(
                    "2000",
                    "3000"
                  )
                }
              />

              <FilterCheckbox
                label="₹3,000 - ₹4,000"
                count={8}
                onChange={() =>
                  updatePriceRange(
                    "3000",
                    "4000"
                  )
                }
              />

              <FilterCheckbox
                label="₹4,000 - ₹6,000"
                count={3}
                onChange={() =>
                  updatePriceRange(
                    "4000",
                    "6000"
                  )
                }
              />

            </div>
          </FilterSection>

          {/* =================================================
              THICKNESS
          ================================================= */}

          <FilterSection
            title="Thickness"
            collapsible
          >
            <div className="w-full">

              <FilterCheckbox
                label="6 mm"
                count={15}
                disabled
              />

              <FilterCheckbox
                label="9 mm"
                count={9}
                disabled
              />

              <FilterCheckbox
                label="12 mm"
                count={15}
                disabled
              />

              <FilterCheckbox
                label="18 mm"
                count={9}
                disabled
              />

              <FilterCheckbox
                label="19 mm"
                count={10}
                disabled
              />

            </div>

            <MoreButton />
          </FilterSection>

          {/* =================================================
              MATERIAL
          ================================================= */}

          <FilterSection title="Material">

            <FilterCheckbox
              label="Hardwood"
              count={62}
              disabled
            />

            <FilterCheckbox
              label="Mix Hardwood"
              count={8}
              disabled
            />

            <FilterCheckbox
              label="Composed Core"
              count={4}
              disabled
            />

          </FilterSection>

          {/* =================================================
              SIZE
          ================================================= */}

          <FilterSection title="Size">

            <FilterCheckbox
              label="8 ft. x 4 ft."
              count={40}
              disabled
            />

            <FilterCheckbox
              label="7 ft. x 4 ft."
              count={34}
              disabled
            />

          </FilterSection>

          {/* =================================================
              GRADE
          ================================================= */}

          <FilterSection title="Grade">

            <FilterCheckbox
              label="BWP/Marine"
              count={39}
              disabled
            />

            <FilterCheckbox
              label="MR"
              count={35}
              disabled
            />

          </FilterSection>

          {/* =================================================
              COLOUR
          ================================================= */}

          <FilterSection title="Colour">

            <FilterCheckbox
              label="Brown"
              count={74}
              disabled
            />

          </FilterSection>

          {/* =================================================
              MR
          ================================================= */}

          <FilterSection title="MR">

            <FilterCheckbox
              label="MR"
              count={35}
              disabled
            />

          </FilterSection>

        </div>
      </div>
    </aside>
  );
}