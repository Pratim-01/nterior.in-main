"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type {
  FacetKey,
  FacetOption,
  Facets,
  FilterState,
  PriceRange,
} from "@/types/products";

/* ==========================================================
   FILTER SECTION
========================================================== */

function FilterSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-gray-100 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className="mb-3 flex h-[18px] w-full items-center justify-between text-left"
      >
        <h3 className="text-[12px] font-bold uppercase tracking-[0.05em] text-gray-900">
          {title}
        </h3>

        {collapsible && (
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={`shrink-0 text-gray-700 transition-transform ${open ? "" : "-rotate-90"}`}
          />
        )}
      </button>

      {(!collapsible || open) && children}
    </section>
  );
}

/* ==========================================================
   CHECKBOX
========================================================== */

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
  variant = "checkbox",
  name,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  /** "radio" renders a single-select circular control (same visual
   *  language as the checkbox) for groups where only one option can be
   *  active at a time, e.g. the Category switcher on a column landing
   *  page — selecting one sibling category should replace the current
   *  selection rather than add to it. */
  variant?: "checkbox" | "radio";
  /** Shared `name` for a "radio" group so the browser treats the options
   *  as one exclusive set (keyboard arrow-key navigation, correct
   *  screen-reader "1 of N" announcements) — checked state is still fully
   *  controlled by `checked`/`onChange`, this only affects native/AT
   *  grouping behaviour. Unused for "checkbox". */
  name?: string;
}) {
  return (
    <label className="flex min-h-[25px] w-full cursor-pointer items-center gap-2 py-[2px] text-[12px] leading-[18px]">
      <input
        type={variant}
        name={variant === "radio" ? name : undefined}
        checked={checked}
        onChange={onChange}
        className={`
          h-[15px] w-[15px] shrink-0 appearance-none border
          border-gray-300 bg-white p-0 outline-none transition-all
          checked:border-[rgb(207,0,6)] checked:bg-[rgb(207,0,6)]
          focus:outline-none focus:ring-2 focus:ring-red-100 focus:ring-offset-0
          ${variant === "radio" ? "rounded-full" : "rounded-[3px]"}
        `}
      />

      <span className="min-w-0 flex-1 truncate text-gray-700">{label}</span>

      {typeof count === "number" && (
        <span className="ml-auto w-[34px] shrink-0 text-right text-[11px] leading-[18px] text-gray-400">
          ({count})
        </span>
      )}
    </label>
  );
}

/* ==========================================================
   EXPANDABLE OPTION LIST — driven by live facet data
========================================================== */

const INITIAL_VISIBLE = 5;

function ExpandableList({
  options,
  selected,
  onToggle,
  variant = "checkbox",
  name,
}: {
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
  variant?: "checkbox" | "radio";
  name?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? options : options.slice(0, INITIAL_VISIBLE);
  const remaining = options.length - INITIAL_VISIBLE;

  if (options.length === 0) {
    return <p className="text-[12px] text-gray-400">No options available</p>;
  }

  return (
    <div className="w-full">
      {visible.map((opt) => (
        <FilterCheckbox
          key={opt.value}
          label={opt.label}
          count={opt.count}
          checked={selected.includes(opt.value)}
          onChange={() => onToggle(opt.value)}
          variant={variant}
          name={name}
        />
      ))}

      {remaining > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 block text-[11px] font-medium leading-4 text-[rgb(207,0,6)] transition-colors hover:text-[rgb(170,0,5)] hover:underline"
        >
          + {remaining} more
        </button>
      )}

      {expanded && options.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="mt-2 block text-[11px] font-medium leading-4 text-gray-500 hover:underline"
        >
          Show less
        </button>
      )}
    </div>
  );
}

/* ==========================================================
   SEARCHABLE OPTION LIST (used for Thickness, which can have
   many values across categories)
========================================================== */

function SearchableList({
  options,
  selected,
  onToggle,
  placeholder,
}: {
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <>
      <div className="relative mb-2.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            block h-[34px] w-full rounded-[5px] border border-gray-200
            bg-white px-3 pr-9 text-[11px] leading-none text-gray-700
            outline-none placeholder:text-gray-400
            focus:border-gray-300 focus:ring-1 focus:ring-gray-100
          "
        />
        <Search
          size={14}
          strokeWidth={2}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
      <ExpandableList options={filtered} selected={selected} onToggle={onToggle} />
    </>
  );
}

/* ==========================================================
   PRICE RANGE INPUTS
========================================================== */

function PriceRangeInputs({
  minPrice,
  maxPrice,
  bounds,
  onApply,
}: {
  minPrice: number | null;
  maxPrice: number | null;
  bounds?: PriceRange;
  onApply: (range: { minPrice: number | null; maxPrice: number | null }) => void;
}) {
  const [minInput, setMinInput] = useState(minPrice !== null ? String(minPrice) : "");
  const [maxInput, setMaxInput] = useState(maxPrice !== null ? String(maxPrice) : "");

  useEffect(() => {
    setMinInput(minPrice !== null ? String(minPrice) : "");
  }, [minPrice]);

  useEffect(() => {
    setMaxInput(maxPrice !== null ? String(maxPrice) : "");
  }, [maxPrice]);

  function apply() {
    const nextMin = minInput.trim() === "" ? null : Number(minInput);
    const nextMax = maxInput.trim() === "" ? null : Number(maxInput);
    onApply({
      minPrice: nextMin !== null && Number.isFinite(nextMin) ? nextMin : null,
      maxPrice: nextMax !== null && Number.isFinite(nextMax) ? nextMax : null,
    });
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          onBlur={apply}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder={bounds ? `₹${bounds.min.toLocaleString("en-IN")}` : "Min"}
          className="w-full rounded-[6px] border border-gray-200 bg-white px-2.5 py-2 text-[12px] text-gray-700 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-100"
          aria-label="Minimum price"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          onBlur={apply}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder={bounds ? `₹${bounds.max.toLocaleString("en-IN")}` : "Max"}
          className="w-full rounded-[6px] border border-gray-200 bg-white px-2.5 py-2 text-[12px] text-gray-700 outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-100"
          aria-label="Maximum price"
        />
      </div>
      <button
        type="button"
        onClick={apply}
        className="mt-2 w-full rounded-[6px] border border-gray-200 bg-white py-1.5 text-[11px] font-medium text-gray-600 transition-colors hover:border-[rgb(207,0,6)] hover:text-[rgb(207,0,6)]"
      >
        Apply
      </button>
    </div>
  );
}

/* ==========================================================
   FACET LABELS
========================================================== */

const FACET_LABELS: Record<FacetKey, string> = {
  category: "Category",
  subCategory: "Sub Category",
  brand: "Brand",
  productType: "Product Type",
  size: "Size",
  thickness: "Thickness",
  grade: "Grade",
};

/* ==========================================================
   PRODUCT FILTERS (dynamic filter sidebar)

   Every group below is driven entirely by `facets`, which the API
   computed in MySQL from live product data for the current selection —
   nothing here names a specific brand, size, thickness, category, or
   grade. A group only renders when it actually has options, so this same
   sidebar works unchanged for plywood, tiles, paints, electricals, or any
   other category — a category with no "thickness" values simply doesn't
   show a Thickness group.
========================================================== */

export default function ProductFilters({
  facets,
  filters,
  minPrice,
  maxPrice,
  priceRange,
  onFilterChange,
  onPriceChange,
  onClearAll,
  /** When the page is already scoped to a single category (e.g. a
   *  category landing page), hide the redundant Category group. Ignored
   *  when `categoryOptions` is passed — that case still wants a (narrowed)
   *  Category group so the visitor can switch between sibling categories. */
  hideCategory = false,
  /** Restricts the Category group to a fixed, known set of sibling
   *  category values (e.g. ["Plywood", "Blockboards"]) instead of the
   *  full catalogue-wide `facets.category` list — used by category
   *  landing pages that belong to one navbar column, so only categories
   *  in that column are offered. Live counts are still pulled from
   *  `facets.category` when available; a sibling with no matching
   *  products yet simply shows a count of 0 rather than disappearing. */
  categoryOptions,
  /** Used inside the mobile full-screen drawer, which already provides its
   *  own header, close button, and scroll container — drop the fixed
   *  250px desktop width, the card border, and the duplicate "Filters"
   *  header/Clear-all row so the content fills the drawer edge-to-edge. */
  fullWidth = false,
}: {
  facets?: Facets;
  filters: FilterState;
  minPrice: number | null;
  maxPrice: number | null;
  priceRange?: PriceRange;
  onFilterChange: (filters: FilterState) => void;
  onPriceChange: (range: { minPrice: number | null; maxPrice: number | null }) => void;
  /** Clears every filter and the price range in a single URL update. Pass
   *  the parent's own combined handler here rather than letting this
   *  component call onFilterChange + onPriceChange separately — two
   *  back-to-back URL updates race against the same stale search params
   *  and only the second one wins, silently dropping the first. */
  onClearAll: () => void;
  hideCategory?: boolean;
  categoryOptions?: string[];
  fullWidth?: boolean;
}) {
  const hasActiveFilters =
    (
      ["subCategory", "brand", "productType", "size", "thickness", "grade"] as FacetKey[]
    ).some((key) => filters[key].length > 0) ||
    minPrice !== null ||
    maxPrice !== null;

  function toggle(key: FacetKey, value: string) {
    const current = filters[key];
    const exists = current.includes(value);
    const next = exists ? current.filter((v) => v !== value) : [...current, value];
    onFilterChange({ ...filters, [key]: next });
  }

  // The Category group on a column landing page (categoryOptions set) is
  // single-select: picking "Blockboards" should show Blockboards, not
  // Plywood + Blockboards together. Clicking the already-selected option
  // is a no-op rather than deselecting it, so the page never ends up with
  // nothing chosen.
  function selectSingleCategory(value: string) {
    onFilterChange({ ...filters, category: [value] });
  }

  const showCategory = Boolean(categoryOptions) || !hideCategory;
  const groupOrder: FacetKey[] = showCategory
    ? ["category", "subCategory", "brand", "productType"]
    : ["subCategory", "brand", "productType"];

  const filterGroups = (
    <>
      {groupOrder.map((key) => {
        // A category landing page tied to one navbar column (e.g.
        // "Plywood & Blockboard") gets a fixed, known option list — its
        // siblings in that column — rather than every category value in
        // the whole catalogue. Counts still come from the live facet data
        // when available; a sibling with 0 matching products keeps its
        // spot instead of disappearing, since the set of columns is fixed
        // regardless of current stock.
        const options: FacetOption[] =
          key === "category" && categoryOptions
            ? categoryOptions.map((name) => ({
                value: name,
                label: name,
                count: facets?.category.find((o) => o.value === name)?.count ?? 0,
              }))
            : facets?.[key] ?? [];

        if (facets && options.length === 0) return null;

        const isSingleSelectCategory = key === "category" && Boolean(categoryOptions);

        return (
          <FilterSection key={key} title={FACET_LABELS[key]} collapsible={key !== "category"}>
            <ExpandableList
              options={options}
              selected={filters[key]}
              onToggle={isSingleSelectCategory ? selectSingleCategory : (v) => toggle(key, v)}
              variant={isSingleSelectCategory ? "radio" : "checkbox"}
              name={isSingleSelectCategory ? "category-filter" : undefined}
            />
          </FilterSection>
        );
      })}

      <FilterSection title="Price Range">
        <PriceRangeInputs
          minPrice={minPrice}
          maxPrice={maxPrice}
          bounds={priceRange}
          onApply={onPriceChange}
        />
      </FilterSection>

      {(!facets || facets.thickness.length > 0) && (
        <FilterSection title="Thickness" collapsible>
          <SearchableList
            options={facets?.thickness ?? []}
            selected={filters.thickness}
            onToggle={(v) => toggle("thickness", v)}
            placeholder="Search for thickness"
          />
        </FilterSection>
      )}

      {(!facets || facets.size.length > 0) && (
        <FilterSection title="Size" collapsible>
          <ExpandableList
            options={facets?.size ?? []}
            selected={filters.size}
            onToggle={(v) => toggle("size", v)}
          />
        </FilterSection>
      )}

      {(!facets || facets.grade.length > 0) && (
        <FilterSection title="Grade" collapsible>
          <ExpandableList
            options={facets?.grade ?? []}
            selected={filters.grade}
            onToggle={(v) => toggle("grade", v)}
          />
        </FilterSection>
      )}
    </>
  );

  if (fullWidth) {
    return (
      <div className="w-full">
        {hasActiveFilters && (
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={onClearAll}
              className="text-[12px] font-semibold text-[rgb(207,0,6)] transition-colors hover:text-[rgb(170,0,5)]"
            >
              Clear all
            </button>
          </div>
        )}
        {filterGroups}
      </div>
    );
  }

  return (
    <aside className="w-[250px] min-w-[250px] max-w-[250px] shrink-0">
      <div className="w-full overflow-hidden rounded-[8px] border border-gray-200 bg-white">
        {/* HEADER */}
        <div className="flex min-h-[56px] items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-[13px] font-bold leading-none text-gray-900">Filters</h2>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] font-semibold leading-none text-[rgb(207,0,6)] transition-colors hover:text-[rgb(170,0,5)]"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="px-5">{filterGroups}</div>
      </div>
    </aside>
  );
}
