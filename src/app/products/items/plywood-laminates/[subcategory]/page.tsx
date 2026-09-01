import ProductListing from "../../../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";

type PageProps = {
  params: Promise<{
    subcategory: string;
  }>;
};

export default async function SubcategoryPage({ params }: PageProps) {
  const { subcategory } = await params;
  const categoryName = slugToCategory(subcategory);

  return <ProductListing category={categoryName} />;
}
