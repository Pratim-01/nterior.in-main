import ProductListing from "../listing/ProductListing";
import { slugToCategory } from "@/lib/category-slug";
import { notFound, permanentRedirect } from "next/navigation";
import { fetchProductById } from "@/lib/product-query";
import { productPath } from "@/lib/product-slug";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

// This same URL segment (`/products/:value`) serves two different pages:
// a category landing page for a slug like "plywood", and — because
// ProductCard already links to `/products/${product.productId}` — the
// old numeric-id links, which now redirect to /product/<slug>-<id>. Next.js
// only allows one dynamic segment name per path, so both are handled here
// rather than in a separate `[productId]` folder.
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (/^\d+$/.test(category)) {
    // Old-style /products/76 links: send them (301) to the new SEO URL.
    const data = await fetchProductById(Number(category));
    if (!data) notFound();
    permanentRedirect(productPath(data.product));
  }

  const categoryName = slugToCategory(category);

  return <ProductListing category={categoryName} />;
}