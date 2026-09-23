import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { fetchProductById } from "@/lib/product-query";
import { parseProductParam, productPath } from "@/lib/product-slug";
import ProductDetail from "@/app/products/detail/ProductDetail";

// Price/stock change often — always render fresh.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slugId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugId } = await params;
  const id = parseProductParam(slugId);
  const data = id ? await fetchProductById(id) : null;

  if (!data) return { title: "Product not found | Nterior" };

  const p = data.product;
  return {
    title: `${p.productName}${p.brand ? ` by ${p.brand}` : ""} | Nterior`,
    description:
      p.shortDescription ?? `Buy ${p.productName} online at the best price.`,
    alternates: { canonical: productPath(p) },
    openGraph: {
      title: p.productName,
      description: p.shortDescription ?? undefined,
      images: p.imageUrl ? [p.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slugId } = await params;
  const id = parseProductParam(slugId);
  if (!id) notFound();

  const data = await fetchProductById(id);
  if (!data) notFound();

  // Wrong / missing / outdated slug -> 301 to the one true URL.
  const correctPath = productPath(data.product);
  if (decodeURIComponent(`/product/${slugId}`) !== correctPath) {
    permanentRedirect(correctPath);
  }

  const p = data.product;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.productName,
    image: p.images.map((i) => i.url),
    description: p.shortDescription ?? undefined,
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: p.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="pt-[108px]">
      {/* This route lives outside /products, so it doesn't inherit
          products/layout.tsx — but the root layout's own Navbar (see
          src/app/layout.tsx) already covers every page, this one included,
          so only the matching top spacing needs reproducing here. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail key={id} productId={id} initialData={data} />
    </div>
  );
}