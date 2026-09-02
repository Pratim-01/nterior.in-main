import ProductListing from "../../../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";
import { getFolderBreadcrumb } from "@/lib/category-taxonomy";

type PageProps = {
  params: Promise<{
    subcategory: string;
  }>;
};

// Plywood and Blockboards each have their own dedicated static page
// (../plywood/page.tsx, ../blockboards/page.tsx) which Next.js matches
// first since they're more specific. This dynamic route only catches any
// *other* subcategory under plywood-blockboards (e.g. "veneer", "mica") —
// same generic pattern as every other category group, so new subcategories
// just need matching `category` values in the database, no code changes.
export default async function SubcategoryPage({ params }: PageProps) {
  const { subcategory } = await params;
  const categoryName = slugToCategory(subcategory);

  return (
    <ProductListing
      category={categoryName}
      breadcrumb={getFolderBreadcrumb("plywood-blockboards")}
    />
  );
}
