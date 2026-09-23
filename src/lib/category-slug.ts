import { NAV_CATEGORIES } from "@/lib/product-navigation";

/**
 * Turns a display name like "Engineered Board" or "HDHMR HDF Board" into a
 * URL-safe slug: lowercase, spaces/punctuation collapsed to single hyphens,
 * no leading/trailing hyphens. Used to build links to a specific category
 * or item (see getCategorySwitcher in category-taxonomy.ts) — the inverse
 * of `slugToCategory` below.
 */
export function categoryToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Every group name, column title, and leaf item in the real navbar
 * taxonomy (src/lib/product-navigation.ts), keyed by its slug — built once
 * at module load. This is what lets `slugToCategory` round-trip exact
 * capitalization and acronyms ("HDHMR HDF Board", "uPVC" if it's ever
 * added, etc.) automatically, without hand-maintaining an override for
 * every single one.
 */
const TAXONOMY_NAME_BY_SLUG: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const group of NAV_CATEGORIES) {
    map[categoryToSlug(group.name)] = group.name;
    for (const column of group.columns) {
      map[categoryToSlug(column.title)] = column.title;
      for (const item of column.items) {
        map[categoryToSlug(item)] = item;
      }
    }
  }
  return map;
})();

/**
 * Manual slug → exact category name overrides. Use this for:
 * - Shorter/friendlier aliases you want to also work (e.g. "eng-board" as
 *   a shortcut for "Engineered Board").
 * - A category that isn't in the navbar taxonomy at all and doesn't
 *   follow simple Title Case.
 *
 * Anything in the navbar taxonomy already round-trips correctly on its
 * own (see TAXONOMY_NAME_BY_SLUG above) — you only need an entry here for
 * exceptions on top of that.
 */
const CATEGORY_OVERRIDES: Record<string, string> = {
  "eng-board": "Engineered Board",

  // "plywood" is the slug used by the Plywood & Laminates landing page's
  // TopCategories card (see plywood-laminates/components/TopCategories.tsx)
  // to link to the *column* — "Plywood" and "Blockboards" together — not
  // to the "Plywood" leaf item alone. Without this override,
  // TAXONOMY_NAME_BY_SLUG would resolve "plywood" to the leaf item
  // "Plywood" (since categoryToSlug("Plywood") is also "plywood"), which
  // would make isLeafItem() true and trigger the one-time
  // subCategory=Plywood redirect in [subcategory]/page.tsx — narrowing
  // the page down to Plywood only instead of showing both Plywood and
  // Blockboards, unlike every other column-title page (e.g.
  // hardware/other-hardware).
  // plywood: "Plywood & Blockboard",
  "plywood-blockboard": "Plywood & Blockboard",

  // Ebco brand showcase (src/app/products/items/hardware/components/
  // EbcoShowcase.tsx) — these 7 category lines are also now real navbar
  // leaf items (see product-navigation.ts's Hardware group), so most
  // round-trip fine on their own. Only the ones where the showcase uses a
  // shorter/cleaner slug than the auto-generated one (which would spell
  // out "&" as "-and-") need an explicit override here.
  "drawer-slides-hinges": "Drawer Slides & Hinges",
  "joinery-screws": "Joinery & Screws",
  "window-door-glass-hardware": "Window, Door & Glass Hardware",
};

/**
 * Turns a URL slug like "plywood", "sofa-dining", "hdhmr-hdf-board", or
 * "power-hand-tools" into the value expected in `product_details.category`
 * ("Plywood", "Sofa Dining", "HDHMR HDF Board", "Power Hand Tools"). This
 * is only a display/routing heuristic — it never touches the database.
 *
 * Resolution order: manual overrides → known navbar taxonomy name (exact
 * casing) → generic Title Case fallback for anything not in the taxonomy
 * at all (e.g. a category you added straight to the database that isn't
 * in the mega menu).
 */
export function slugToCategory(slug: string): string {
  const normalized = slug.toLowerCase();

  if (CATEGORY_OVERRIDES[normalized]) return CATEGORY_OVERRIDES[normalized];
  if (TAXONOMY_NAME_BY_SLUG[normalized]) return TAXONOMY_NAME_BY_SLUG[normalized];

  return normalized
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
