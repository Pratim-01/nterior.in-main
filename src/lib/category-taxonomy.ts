import { NAV_CATEGORIES } from "@/lib/product-navigation";
import { categoryToSlug } from "@/lib/category-slug";

/**
 * Maps each `/products/items/<folder>` route to the breadcrumb trail that
 * matches your real site navigation (`src/app/products/components/Navbar.tsx`)
 * exactly — same wording, same "&"s, same "and"s — rather than a generic
 * "Products" crumb or an auto-slugified guess.
 *
 * Every folder here corresponds to exactly one top-level group in the mega
 * menu, and serves every column/item within that group generically via
 * `[subcategory]/page.tsx` — no per-category folder needed.
 *
 * If you rename a group in the navbar, update `groupName` here to match —
 * both the breadcrumb and the category switcher (getColumnCategories
 * below) key off it to find the right group in NAV_CATEGORIES.
 */

export interface BreadcrumbCrumb {
  label: string;
  /** Omit for a crumb that isn't a real clickable page (e.g. a menu
   *  column that has no landing page of its own). */
  href?: string;
}

interface FolderTaxonomy {
  /** The crumb(s) between "Home" and the current page's own crumb. */
  parentTrail: BreadcrumbCrumb[];
  /** Whether a subcategory page under this folder (e.g.
   *  /products/items/hardware/door-hardware) should add its own extra
   *  crumb on top of `parentTrail`. True for every folder today — each
   *  one IS its own top-level group in the navbar. */
  subcategoryAddsOwnCrumb: boolean;
  /** The exact `NAV_CATEGORIES[].name` this folder corresponds to in the
   *  real navbar — used by `getColumnCategories` to find the right
   *  group's columns (e.g. "hardware" → "Hardware"). */
  groupName: string;
  /** Restricts this folder, for leaf-item routing (see
   *  `LEAF_ITEM_TO_FOLDER` below), to ONLY these column titles within its
   *  group — for a folder that should represent just one column of a
   *  bigger group rather than the whole thing. Leave undefined (the
   *  normal case) for a folder that IS its whole group: it then claims
   *  every column not already claimed by another folder's
   *  `claimedColumns`. */
  claimedColumns?: string[];
}

export const FOLDER_TAXONOMY: Record<string, FolderTaxonomy> = {
  tiles: {
    parentTrail: [{ label: "Tiles", href: "/products/items/tiles" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Tiles",
  },
  electricals: {
    parentTrail: [{ label: "Electricals", href: "/products/items/electricals" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Electricals",
  },
  "power-hand-tools": {
    parentTrail: [
      { label: "Power & Hand Tools", href: "/products/items/power-hand-tools" },
    ],
    subcategoryAddsOwnCrumb: true,
    groupName: "Power & Hand Tools",
  },
  "plywood-laminates": {
    parentTrail: [
      { label: "Plywood & Laminates", href: "/products/items/plywood-laminates" },
    ],
    subcategoryAddsOwnCrumb: true,
    groupName: "Plywood & Laminates",
  },
  hardware: {
    parentTrail: [{ label: "Hardware", href: "/products/items/hardware" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Hardware",
  },
  paints: {
    parentTrail: [{ label: "Paints", href: "/products/items/paints" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Paints",
  },
  "lighting-fans": {
    parentTrail: [{ label: "Lighting & Fans", href: "/products/items/lighting-fans" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Lighting & Fans",
  },
  bathroom: {
    parentTrail: [{ label: "Bathroom", href: "/products/items/bathroom" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Bathroom",
  },
  "sofa-dining": {
    parentTrail: [{ label: "Sofa and Dining", href: "/products/items/sofa-dining" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Sofa and Dining",
  },
  plumbing: {
    parentTrail: [{ label: "Plumbing", href: "/products/items/plumbing" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Plumbing",
  },
  kitchen: {
    parentTrail: [{ label: "Kitchen", href: "/products/items/kitchen" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Kitchen",
  },
  appliances: {
    parentTrail: [{ label: "Appliances", href: "/products/items/appliances" }],
    subcategoryAddsOwnCrumb: true,
    groupName: "Appliances",
  },
};

/**
 * Returns the sibling category values that live in the same navbar column
 * as `categoryName`, for use as `ProductListing`'s `categoryOptions` prop
 * (see ProductListing.tsx / ProductFilters.tsx) — e.g.
 * `getColumnCategories("plywood-laminates", "Plywood")` returns
 * `["Plywood", "Blockboards"]`, both from the "Plywood & Blockboard"
 * column; `getColumnCategories("hardware", "Door Hardware")` returns
 * whatever other items sit in Hardware's own matching column.
 *
 * This works for every folder generically because it searches
 * `NAV_CATEGORIES` (the real mega-menu data, see product-navigation.ts) at
 * call time rather than relying on a hand-written per-folder list — a
 * folder's landing page (where `categoryName` is the group's own name,
 * e.g. "Hardware") naturally returns `undefined` since no column is
 * titled that, so landing pages are unaffected and only genuine
 * column/leaf-level pages get a switcher.
 *
 * Returns `undefined` when there's nothing meaningful to switch between:
 * unknown folder, category not found in the taxonomy at all (e.g. an
 * ad-hoc category not in the mega menu), or a column with only one item.
 */
export function getColumnCategories(
  folderSlug: string,
  categoryName: string
): string[] | undefined {
  const taxonomy = FOLDER_TAXONOMY[folderSlug];
  if (!taxonomy) return undefined;

  const group = NAV_CATEGORIES.find((g) => g.name === taxonomy.groupName);
  if (!group) return undefined;

  const column = group.columns.find(
    (c) => c.items.includes(categoryName) || c.title === categoryName
  );

  if (!column || column.items.length <= 1) return undefined;

  return column.items;
}

/**
 * Builds the breadcrumb trail (everything after "Home") for a given
 * `items/<folder>` page.
 *
 * @param folderSlug     e.g. "hardware", "plywood-laminates"
 * @param ownLabel       the current page's own display name, e.g. "Door
 *                        Hardware" — added as a final crumb only when the
 *                        folder's taxonomy says to (see
 *                        `subcategoryAddsOwnCrumb`), and only if provided.
 */
export function getFolderBreadcrumb(
  folderSlug: string,
  ownLabel?: string
): BreadcrumbCrumb[] {
  const taxonomy = FOLDER_TAXONOMY[folderSlug];

  if (!taxonomy) {
    // Unknown folder (shouldn't happen for real routes) — fall back to a
    // generic, still-correct trail rather than crashing.
    return ownLabel
      ? [{ label: "Products", href: "/products" }, { label: ownLabel }]
      : [{ label: "Products", href: "/products" }];
  }

  if (taxonomy.subcategoryAddsOwnCrumb && ownLabel) {
    return [...taxonomy.parentTrail, { label: ownLabel }];
  }

  return taxonomy.parentTrail;
}

/**
 * Every leaf item in the navbar taxonomy, mapped to the folder slug whose
 * `/products/items/<folder>/...` pages actually serve it — built once at
 * module load from `FOLDER_TAXONOMY` + `NAV_CATEGORIES` so a new folder or
 * a new item in an existing column is picked up automatically, with no
 * per-item list to maintain by hand.
 *
 * Two passes handle folders that share a group, if that's ever needed
 * again (no folder uses `claimedColumns` today — every folder claims its
 * whole group):
 * 1. Folders with `claimedColumns` grab exactly those columns first.
 * 2. Every other folder for that group (the group's own default/catch-all
 *    folder) picks up whatever columns are left.
 */
const LEAF_ITEM_TO_FOLDER: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  const claimed = new Set<string>(); // `${groupName}::${columnTitle}`

  const folderEntries = Object.entries(FOLDER_TAXONOMY);

  for (const [folderSlug, taxonomy] of folderEntries) {
    if (!taxonomy.claimedColumns) continue;
    const group = NAV_CATEGORIES.find((g) => g.name === taxonomy.groupName);
    if (!group) continue;

    for (const column of group.columns) {
      if (!taxonomy.claimedColumns.includes(column.title)) continue;
      claimed.add(`${taxonomy.groupName}::${column.title}`);
      for (const item of column.items) map[item] = folderSlug;
    }
  }

  for (const [folderSlug, taxonomy] of folderEntries) {
    if (taxonomy.claimedColumns) continue;
    const group = NAV_CATEGORIES.find((g) => g.name === taxonomy.groupName);
    if (!group) continue;

    for (const column of group.columns) {
      const key = `${taxonomy.groupName}::${column.title}`;
      if (claimed.has(key)) continue;
      claimed.add(key);
      for (const item of column.items) map[item] = folderSlug;
    }
  }

  return map;
})();

/**
 * The URL a navbar leaf item (e.g. "Plywood", "LED Bulb", "Overhead Tank")
 * should link to. Every leaf item in `NAV_CATEGORIES` already has a real
 * page to land on via its folder's generic `[subcategory]` catch-all — so
 * this always resolves to a proper `/products/items/<folder>/<slug>`
 * listing page (with its own filters, facets, etc.) rather than the bare
 * `/products?category=` fallback.
 *
 * Only a category that isn't in the navbar taxonomy at all (shouldn't
 * happen for a real menu click, but possible for an ad-hoc/legacy link)
 * falls back to `/products?category=<name>`.
 */
export function getLeafItemHref(itemName: string): string {
  const folderSlug = LEAF_ITEM_TO_FOLDER[itemName];
  if (!folderSlug) {
    return `/products?category=${encodeURIComponent(itemName)}`;
  }
  return `/products/items/${folderSlug}/${categoryToSlug(itemName)}`;
}
