"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import type { ProductDetail as ProductDetailType, Product } from "@/types/products";
import { categoryToSlug } from "@/lib/category-slug";
import { useCart } from "@/lib/cart-context";
import Breadcrumb from "../listing/Breadcrumb";

interface ProductDetailData {
  product: ProductDetailType;
  relatedProducts: Product[];
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        <div className="mb-7 h-4 w-64 animate-pulse rounded bg-[#f0f0f0]" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-square w-full animate-pulse rounded-[10px] border border-[#eee] bg-[#f7f7f7] lg:aspect-auto lg:h-[560px]" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#f0f0f0]" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-[#f0f0f0]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-[#f0f0f0]" />
            <div className="h-10 w-40 animate-pulse rounded bg-[#f0f0f0]" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-[#f0f0f0]" />
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   NOT FOUND / ERROR
========================================================= */

function ProductDetailError({ message }: { message: string }) {
  const router = useRouter();
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-[26px]">
          We couldn&apos;t find this product
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#4b5563]">
          {message}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[rgb(207,0,6)] px-6 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[rgb(170,0,5)]"
          >
            Browse products
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dedede] bg-white px-6 text-sm font-semibold text-[#374151] transition-colors duration-150 hover:border-[#c7c7c7] hover:bg-[#fafafa]"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   GALLERY — vertical thumbnail rail (desktop) + main image.
   Always shows 4 thumbnail slots; real images fill the first
   slots, any remaining slots are plain placeholder boxes.
========================================================= */

const THUMBNAIL_SLOTS = 4;

function Gallery({ product }: { product: ProductDetailType }) {
  const images = product.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const thumbRailRef = useRef<HTMLDivElement>(null);

  const active = images[activeIndex];
  const mainSrc = images.length > 0 && !imageFailed ? active?.url : PLACEHOLDER_IMAGE;
  const mainAlt = active?.altText || product.productName;

  const slots = Array.from({ length: Math.max(THUMBNAIL_SLOTS, images.length) });

  function scrollThumbs(direction: -1 | 1) {
    thumbRailRef.current?.scrollBy({ left: direction * 100, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-4">
      {/* THUMBNAILS */}
      <div className="order-2 flex items-center gap-2 lg:order-1 lg:w-[92px] lg:shrink-0 lg:flex-col lg:items-stretch">
        {/* Prev/next arrows only make sense as a horizontal scroller — hidden once the
            rail becomes a vertical column on desktop. */}
        {images.length > THUMBNAIL_SLOTS && (
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => scrollThumbs(-1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#374151] transition-colors hover:bg-[#e5e5e5] lg:hidden"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div
          ref={thumbRailRef}
          className="flex flex-1 gap-2.5 overflow-x-auto scroll-smooth lg:flex-none lg:flex-col lg:overflow-visible"
        >
          {slots.map((_, i) => {
            const img = images[i];
            if (img) {
              return (
                <button
                  key={img.url + i}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setImageFailed(false);
                  }}
                  aria-label={`View image ${i + 1}`}
                  className={`h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[8px] border-2 bg-white transition-colors lg:h-[88px] lg:w-[88px] ${
                    i === activeIndex
                      ? "border-[rgb(207,0,6)]"
                      : "border-[#dedede] hover:border-[#bbb]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.altText}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            }
            // Placeholder slot — no real image at this position yet.
            return (
              <div
                key={`placeholder-${i}`}
                aria-hidden="true"
                className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[8px] border-2 border-dashed border-[#e2e2e2] bg-[#fafafa] lg:h-[88px] lg:w-[88px]"
              >
                <ImageIcon size={20} strokeWidth={1.5} className="text-[#c7c7c7]" />
              </div>
            );
          })}
        </div>

        {images.length > THUMBNAIL_SLOTS && (
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => scrollThumbs(1)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[#374151] transition-colors hover:bg-[#e5e5e5] lg:hidden"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* MAIN IMAGE */}
      <div className="order-1 flex-1 lg:order-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-[#dedede] bg-[#f7f7f7] lg:aspect-auto lg:h-[70vh] lg:max-h-[560px] lg:min-h-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainSrc || PLACEHOLDER_IMAGE}
            alt={mainAlt}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain"
          />
        </div>
        <p className="mt-2.5 text-[12px] italic text-[#9ca3af]">*{product.productName}</p>
      </div>
    </div>
  );
}

/* =========================================================
   RELATED PRODUCT CARD — badge + image + price. The whole
   card is a link to that product; no add-to-cart or wishlist
   here, purely a "browse more" card.
========================================================= */

function RelatedProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  const hasMrp = product.mrp !== null && product.mrp > product.price;
  const discountPercent = hasMrp
    ? Math.round((((product.mrp as number) - product.price) / (product.mrp as number)) * 100)
    : 0;

  const isNew =
    Boolean(product.createdAt) &&
    Date.now() - new Date(product.createdAt as string).getTime() < 1000 * 60 * 60 * 24 * 30;

  return (
    <Link
      href={`/products/${product.productId}`}
      className="group block overflow-hidden rounded-[10px] border border-[#eee] bg-white no-underline transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
    >
      <div className="relative h-[190px] w-full bg-[#f7f7f7]">
        {discountPercent > 0 ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[rgb(207,0,6)] px-2 py-0.5 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        ) : isNew ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#12805c] px-2 py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={!imageFailed && product.imageUrl ? product.imageUrl : PLACEHOLDER_IMAGE}
          alt={product.imageAltText || product.productName}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-2 p-3.5">
        <h3 className="m-0 line-clamp-2 min-h-[36px] text-[13px] font-semibold leading-tight text-[#111827] group-hover:text-[rgb(207,0,6)]">
          {product.productName}
        </h3>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-bold text-[#111827]">
            {formatPrice(product.price)}
          </span>
          {hasMrp && (
            <span className="text-[11px] text-[#9ca3af] line-through">
              {formatPrice(product.mrp as number)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   RELATED PRODUCTS SECTION — a swipeable, dot-indicated
   carousel on mobile (one card per "page"); a plain grid
   from the `sm` breakpoint up, where there's room to browse
   without scrolling sideways.
========================================================= */

function RelatedProductsSection({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    setActivePage(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goToPage(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="mt-16">
      <h2 className="mb-7 text-center text-[20px] font-bold text-[#111827] sm:text-[22px]">
        Related Products
      </h2>

      {/* Mobile: one card per screen, swipeable */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 sm:hidden [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.productId} className="w-full shrink-0 snap-center">
            <RelatedProductCard product={p} />
          </div>
        ))}
      </div>

      {products.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden">
          {products.map((p, i) => (
            <button
              key={p.productId}
              type="button"
              aria-label={`Go to related product ${i + 1}`}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activePage ? "w-5 bg-[rgb(207,0,6)]" : "w-1.5 bg-[#dedede]"
              }`}
            />
          ))}
        </div>
      )}

      {/* Tablet/desktop: plain grid, no need to swipe */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => (
          <RelatedProductCard key={p.productId} product={p} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function ProductDetail({ productId }: { productId: number }) {
  const [data, setData] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specification">("description");

  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setNotFound(false);

    fetch(`/api/products/${productId}`, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setNotFound(true);
          return null;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to load this product.");
        }
        return (await res.json()) as ProductDetailData;
      })
      .then((json) => {
        if (!cancelled && json) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  // Reset quantity + tab whenever a different product loads.
  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
  }, [data?.product.productId]);

  if (isLoading && !data) return <ProductDetailSkeleton />;
  if (notFound) {
    return (
      <ProductDetailError message="This product may have been removed or is no longer available." />
    );
  }
  if (error || !data) {
    return <ProductDetailError message={error ?? "Something went wrong."} />;
  }

  const { product, relatedProducts } = data;
  const hasMrp = product.mrp !== null && product.mrp > product.price;

  const unitSuffix = product.productType === "sqft" ? " / sq.ft." : "";
  const quantityLabel = product.productType === "sqft" ? "sq.ft." : "Qty";

  const availabilityText = product.showroomStock
    ? `Available in showroom${
        product.showroomStockNumber ? ` · ${product.showroomStockNumber}` : ""
      }`
    : "In stock, ready to ship";

  const featureBullets: string[] = (() => {
    const fromAttributes = Object.entries(product.attributes ?? {})
      .filter(([, value]) => value !== null && value !== "")
      .slice(0, 5)
      .map(([key, value]) => `${key}: ${String(value)}`);
    if (fromAttributes.length > 0) return fromAttributes;

    if (product.shortDescription) {
      return product.shortDescription
        .split(/[.;]\s*/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4);
    }
    return [];
  })();

  const specChips = [
    { label: "Size", value: product.size },
    { label: "Thickness", value: product.thickness },
    { label: "Grade", value: product.grade },
  ].filter((c) => c.value);

  const specRows: { label: string; value: string }[] = [
    { label: "Brand", value: product.brand ?? "" },
    { label: "Category", value: product.category },
    { label: "Sub-category", value: product.subCategory ?? "" },
    { label: "Size", value: product.size ?? "" },
    { label: "Thickness", value: product.thickness ?? "" },
    { label: "Grade", value: product.grade ?? "" },
    {
      label: "Sold as",
      value: product.productType === "sqft" ? "Per square foot" : "Per unit",
    },
    ...Object.entries(product.attributes ?? {})
      .filter(([, value]) => value !== null && value !== "")
      .map(([key, value]) => ({ label: key, value: String(value) })),
  ].filter((row) => row.value);

  const categorySlug = categoryToSlug(product.category);

  function handleAddToCart(andBuyNow: boolean) {
    addItem(product, quantity);
    if (andBuyNow) {
      router.push("/cart");
      return;
    }
    toast.success(`Added ${quantity} × ${product.productName} to cart`, {
      icon: <ShoppingCart size={16} />,
    });
  }

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1840px] px-5 pb-16 pt-6 sm:px-7 sm:pt-7 lg:px-9 lg:pt-7 xl:px-10">
        {/* BREADCRUMB */}
        <div className="mb-7">
          <Breadcrumb
            items={[
              { label: "Home", href: "/products" },
              { label: product.category, href: `/products/${categorySlug}` },
              ...(product.subCategory && product.subCategory !== product.category
                ? [{ label: product.subCategory }]
                : []),
              { label: product.productName },
            ]}
          />
        </div>

        {/* GALLERY + BUY BOX */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Gallery product={product} />

          <div className="flex flex-col">
            {/* META LINES */}
            <div className="flex flex-col gap-1 text-[13px]">
              {product.brand && (
                <p className="m-0">
                  <span className="font-semibold text-[#111827]">Brand: </span>
                  <span className="text-[#4b5563]">{product.brand}</span>
                </p>
              )}
              <p className="m-0">
                <span className="font-semibold text-[#111827]">Category: </span>
                <span className="text-[#4b5563]">{product.category}</span>
              </p>
              <p className="m-0">
                <span className="font-semibold text-[#111827]">Availability: </span>
                <span className="text-[#4b5563]">{availabilityText}</span>
              </p>
            </div>

            <h1 className="mt-3 text-[22px] font-bold uppercase leading-tight tracking-tight text-[#111827] sm:text-[25px] lg:text-[27px]">
              {product.productName}
            </h1>

            {/* FEATURE BULLETS */}
            {featureBullets.length > 0 && (
              <ul className="mt-4 flex flex-col gap-1.5 pl-5 text-[13px] leading-relaxed text-[#4b5563] sm:text-[14px]">
                {featureBullets.map((line) => (
                  <li key={line} className="list-disc marker:text-[#9ca3af]">
                    {line}
                  </li>
                ))}
              </ul>
            )}

            {/* SPEC CHIPS */}
            {specChips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[#eee] pt-5">
                {specChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="rounded-lg border border-[#dedede] px-4 py-2 text-center"
                  >
                    <div className="text-[10px] uppercase tracking-wide text-[#9ca3af]">
                      {chip.label}
                    </div>
                    <div className="text-[13px] font-semibold text-[#111827]">{chip.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className={`mt-5 pt-5 ${specChips.length > 0 ? "" : "border-t border-[#eee]"}`}>
              <p className="m-0 text-[12px] font-medium uppercase tracking-wide text-[#9ca3af]">
                INR {product.gstExclude ? "(+ GST extra)" : "(incl. of GST)"}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-2.5">
                <span className="text-[28px] font-bold leading-none text-[#111827] sm:text-[32px]">
                  {formatPrice(product.price)}
                </span>
                {unitSuffix && (
                  <span className="text-[13px] font-medium text-[#6b7280]">
                    {unitSuffix.trim()}
                  </span>
                )}
                {hasMrp && (
                  <span className="text-[15px] leading-none text-[#9ca3af] line-through">
                    {formatPrice(product.mrp as number)}
                  </span>
                )}
              </div>
            </div>

            {/* QUANTITY + ACTIONS */}
            <div className="mt-6 flex items-center gap-2 sm:gap-3 lg:flex-wrap lg:gap-4">
              <div className="flex shrink-0 items-center rounded-lg border border-[#dedede]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-9 items-center justify-center text-[#374151] transition-colors hover:bg-[#f7f7f7] lg:w-11"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-[14px] font-semibold text-[#111827] lg:w-10">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(999, q + 1))}
                  className="flex h-12 w-9 items-center justify-center text-[#374151] transition-colors hover:bg-[#f7f7f7] lg:w-11"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="h-12 min-w-0 flex-1 rounded-lg bg-[rgb(207,0,6)] px-3 text-[14px] font-semibold text-white transition-colors hover:bg-[rgb(170,0,5)] sm:text-[15px] lg:flex-none lg:px-8"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="flex h-12 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-[rgb(207,0,6)] bg-white px-3 text-[14px] font-semibold text-[rgb(207,0,6)] transition-colors hover:bg-[#fdf1f1] sm:gap-2 sm:text-[15px] lg:flex-none lg:px-6"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION / SPECIFICATION TABS */}
        <div className="mx-auto mt-14 max-w-[820px]">
          <div className="flex justify-center gap-8 border-b border-[#eee]">
            {(
              [
                { key: "description", label: "Description" },
                { key: "specification", label: "Specification" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`-mb-px border-b-2 pb-3 text-[15px] font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "border-[rgb(207,0,6)] text-[#111827]"
                    : "border-transparent text-[#9ca3af] hover:text-[#4b5563]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-6">
            {activeTab === "description" ? (
              <div className="whitespace-pre-line text-[14px] leading-relaxed text-[#4b5563] sm:text-[15px]">
                {product.aboutProduct ||
                  product.shortDescription ||
                  "No additional details available for this product yet."}
              </div>
            ) : specRows.length > 0 ? (
              <dl className="divide-y divide-[#eee] rounded-[10px] border border-[#eee]">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-4 py-2.5 text-[13px]"
                  >
                    <dt className="text-[#6b7280]">{row.label}</dt>
                    <dd className="text-right font-medium text-[#111827]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-[14px] text-[#9ca3af]">No specifications listed yet.</p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && <RelatedProductsSection products={relatedProducts} />}
      </div>
    </main>
  );
}
