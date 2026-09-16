import { redirect } from "next/navigation";
import ProductListing from "../../../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";
import { getFolderBreadcrumb, isLeafItem } from "@/lib/category-taxonomy";

type PageProps = {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Marks a URL that has already gone through the one-time redirect below,
// so unchecking the pre-selected Sub Category filter (which removes
// `subCategory` from the URL entirely — see buildQueryString in
// product-query-params.ts) doesn't get silently re-applied on the next
// navigation. Not a real facet — never read by product-query.ts.
const DEFAULT_APPLIED_PARAM = "scDefault";

export default async function SubcategoryPage({ params, searchParams }: PageProps) {
  const { subcategory } = await params;
  const search = await searchParams;
  const categoryName = slugToCategory(subcategory);

  // Land with this item's own "Sub Category" checkbox already selected —
  // same convention as the EbcoShowcase tiles (see
  // hardware/components/EbcoShowcase.tsx), which link straight to
  // `?subCategory=<name>` so the sidebar reflects a real, removable
  // filter instead of an invisible lock. Only for genuine leaf items
  // (see isLeafItem) — a column-title/broad-category page (e.g. "Other
  // Hardware", linked from this folder's TopCategories.tsx) has no
  // single matching sub_category value, so it's left showing everything
  // under that category, same as before. Only runs once per visit (see
  // DEFAULT_APPLIED_PARAM above) so explicitly unchecking it afterwards
  // sticks instead of being re-applied on the next navigation.
  if (!(DEFAULT_APPLIED_PARAM in search) && isLeafItem("bathroom", categoryName)) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(search)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) value.forEach((v) => query.append(key, v));
      else query.append(key, value);
    }
    if (!query.has("subCategory")) {
      query.append("subCategory", categoryName);
    }
    query.set(DEFAULT_APPLIED_PARAM, "1");
    redirect(`/products/items/bathroom/${subcategory}?${query.toString()}`);
  }

  return (
    <ProductListing
      category={categoryName}
      breadcrumb={getFolderBreadcrumb("bathroom", categoryName)}
    />
  );
}
