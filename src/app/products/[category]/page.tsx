import ProductListing from "../listing/ProductListing";
import ProductDetail from "../detail/ProductDetail";
import { slugToCategory } from "@/lib/category-slug";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

// This same URL segment (`/products/:value`) serves two different pages:
// a category landing page for a slug like "plywood", and — because
// ProductCard already links to `/products/${product.productId}` — the
// single-product buy page when the segment is a bare numeric id. Next.js
// only allows one dynamic segment name per path, so both are handled here
// rather than in a separate `[productId]` folder.
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (/^\d+$/.test(category)) {
    return <ProductDetail productId={Number(category)} />;
  }

  const categoryName = slugToCategory(category);

  return <ProductListing category={categoryName} />;
}
