import ProductListing from "../../../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";
import { getColumnCategories, getFolderBreadcrumb } from "@/lib/category-taxonomy";

type PageProps = {
  params: Promise<{
    subcategory: string;
  }>;
};

export default async function SubcategoryPage({ params }: PageProps) {
  const { subcategory } = await params;
  const categoryName = slugToCategory(subcategory);

  return (
    <ProductListing
      category={categoryName}
      breadcrumb={getFolderBreadcrumb("tiles", categoryName)}
      categoryOptions={getColumnCategories("tiles", categoryName)}
    />
  );
}
