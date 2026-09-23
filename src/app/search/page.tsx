import type { Metadata } from "next";
import ProductListing from "@/app/products/listing/ProductListing";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const term = q?.trim();
  return {
    title: term ? `Search results for "${term}" | Nterior` : "Search | Nterior",
  };
}

// /search?q=<term> — the destination the navbar's search box (desktop and
// mobile, both in src/components/Navbar.tsx) submits to. No `category`
// prop is passed to ProductListing, so the Category filter itself stays
// visible and the search term (`?q=`) drives the heading — see the
// `displayTitle` logic in ProductListing.tsx. Every existing filter, the
// sort dropdown, and pagination all keep working exactly as they do on a
// normal category listing, scoped down to whatever matched the search
// term (see buildSearchClause in lib/product-query.ts).
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const term = q?.trim();

  return (
    <div className="pt-[108px]">
      <ProductListing
        breadcrumb={[
          { label: "Search" },
          ...(term ? [{ label: `"${term}"` }] : []),
        ]}
      />
    </div>
  );
}
