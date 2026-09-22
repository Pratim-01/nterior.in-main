import { categoryToSlug } from "@/lib/category-slug";

/**
 * Builds the public URL for a product: /product/<keyword-slug>-<id>
 * e.g. /product/greenply-marine-plywood-18mm-76
 *
 * The trailing numeric id is what the database lookup uses; the slug is
 * only there for SEO and readable links, and is generated from the product
 * name at runtime (no DB column needed).
 */
export function productPath(p: { productId: number; productName: string }): string {
  const slug = categoryToSlug(p.productName ?? "").slice(0, 80).replace(/-+$/g, "");
  return slug ? `/product/${slug}-${p.productId}` : `/product/${p.productId}`;
}

/** Extracts the product id from "<slug>-76" or a bare "76". */
export function parseProductParam(param: string): number | null {
  const match = param.match(/(?:^|-)(\d+)$/);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isInteger(id) && id > 0 ? id : null;
}