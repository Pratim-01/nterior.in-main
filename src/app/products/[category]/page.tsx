import ProductListing from "../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = slugToCategory(category);

  return <ProductListing category={categoryName} />;
}
