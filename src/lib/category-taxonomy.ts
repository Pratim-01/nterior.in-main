/**
 * Maps each `/products/items/<folder>` route to the breadcrumb trail that
 * matches your real site navigation (`src/app/products/components/Navbar.tsx`)
 * exactly — same wording, same "&"s, same "and"s — rather than a generic
 * "Products" crumb or an auto-slugified guess.
 *
 * Every folder here is a top-level entry in the mega menu EXCEPT
 * `plywood-blockboards`, which the navbar actually nests as the
 * "Plywood & Blockboard" column inside the "Plywood & Laminates" group —
 * so its breadcrumb parent is that group, not itself.
 *
 * If you rename a group in the navbar, update its label here too — there's
 * no automatic sync between the two files.
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
   *  crumb on top of `parentTrail`. False for folders — today, only
   *  plywood-blockboards — that already represent one specific column of
   *  a bigger group, where drilling into "Plywood" specifically would be
   *  more detail than the navbar's own hierarchy shows. */
  subcategoryAddsOwnCrumb: boolean;
}

export const FOLDER_TAXONOMY: Record<string, FolderTaxonomy> = {
  tiles: {
    parentTrail: [{ label: "Tiles", href: "/products/items/tiles" }],
    subcategoryAddsOwnCrumb: true,
  },
  electricals: {
    parentTrail: [{ label: "Electricals", href: "/products/items/electricals" }],
    subcategoryAddsOwnCrumb: true,
  },
  "power-hand-tools": {
    parentTrail: [
      { label: "Power & Hand Tools", href: "/products/items/power-hand-tools" },
    ],
    subcategoryAddsOwnCrumb: true,
  },
  "plywood-laminates": {
    parentTrail: [
      { label: "Plywood & Laminates", href: "/products/items/plywood-laminates" },
    ],
    subcategoryAddsOwnCrumb: true,
  },
  hardware: {
    parentTrail: [{ label: "Hardware", href: "/products/items/hardware" }],
    subcategoryAddsOwnCrumb: true,
  },
  paints: {
    parentTrail: [{ label: "Paints", href: "/products/items/paints" }],
    subcategoryAddsOwnCrumb: true,
  },
  "lighting-fans": {
    parentTrail: [{ label: "Lighting & Fans", href: "/products/items/lighting-fans" }],
    subcategoryAddsOwnCrumb: true,
  },
  bathroom: {
    parentTrail: [{ label: "Bathroom", href: "/products/items/bathroom" }],
    subcategoryAddsOwnCrumb: true,
  },
  "sofa-dining": {
    parentTrail: [{ label: "Sofa and Dining", href: "/products/items/sofa-dining" }],
    subcategoryAddsOwnCrumb: true,
  },
  plumbing: {
    parentTrail: [{ label: "Plumbing", href: "/products/items/plumbing" }],
    subcategoryAddsOwnCrumb: true,
  },
  kitchen: {
    parentTrail: [{ label: "Kitchen", href: "/products/items/kitchen" }],
    subcategoryAddsOwnCrumb: true,
  },
  appliances: {
    parentTrail: [{ label: "Appliances", href: "/products/items/appliances" }],
    subcategoryAddsOwnCrumb: true,
  },
  // Legacy folder: nested under "Plywood & Laminates" in the real navbar as
  // the "Plywood & Blockboard" column, not a top-level group of its own.
  "plywood-blockboards": {
    parentTrail: [
      { label: "Plywood & Laminates", href: "/products/items/plywood-laminates" },
      { label: "Plywood & Blockboard" },
    ],
    subcategoryAddsOwnCrumb: false,
  },
};

/**
 * Builds the breadcrumb trail (everything after "Home") for a given
 * `items/<folder>` page.
 *
 * @param folderSlug     e.g. "hardware", "plywood-blockboards"
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
