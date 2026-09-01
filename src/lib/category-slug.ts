/**
 * Turns a URL slug like "plywood", "sofa-dining", "switch-socket", or
 * "power-hand-tools" into the Title Case value expected in
 * `product_details.category` ("Plywood", "Sofa Dining", "Switch Socket",
 * "Power Hand Tools"). This is only a display/routing heuristic — it never
 * touches the database.
 *
 * Used by every dynamic category/subcategory route in the app, so a
 * product's `category` value in MySQL just needs to be the Title Case
 * version of whatever slug you want it to appear under — no code changes
 * needed to add a new category or subcategory.
 *
 * If a real category name doesn't follow simple Title Case (e.g. "uPVC
 * Pipes"), add the slug → exact name mapping here rather than special-
 * casing it in any individual page.
 */
const CATEGORY_OVERRIDES: Record<string, string> = {
  "eng-board": "Engineered Board",
};

export function slugToCategory(slug: string): string {
  const normalized = slug.toLowerCase();
  if (CATEGORY_OVERRIDES[normalized]) return CATEGORY_OVERRIDES[normalized];

  return normalized
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
