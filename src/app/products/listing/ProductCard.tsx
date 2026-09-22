"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/products";
import { productPath } from "@/lib/product-slug";

export type { Product };

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Renders exactly one product. Every field it shows (name, brand,
// size/thickness/grade, price, MRP, GST, image, and any extra attributes)
// comes from the `product` prop — this component never hardcodes anything
// about a specific brand or category, so the same card works for plywood,
// tiles, paints, electricals, or any other category in the store.
export default function ProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(product.imageUrl) && !imageFailed;

  const hasMrp = product.mrp !== null && product.mrp > product.price;

  const specLine = [product.size, product.thickness, product.grade]
    .filter(Boolean)
    .join(" · ");

  const extraAttributes = Object.entries(product.attributes ?? {})
    .filter(([, value]) => value !== null && value !== "")
    .slice(0, 4);

  return (
    <Link
      href={productPath(product)}
      className="
        group
        block
        w-full
        min-w-0
        overflow-hidden
        rounded-[10px]
        border
        border-[#dedede]
        bg-white
        no-underline
        transition-all
        duration-200
        hover:border-[#cfcfcf]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
      "
    >
      {/* IMAGE AREA — mobile unchanged; slightly shorter and no forced min-height on desktop */}
      <div
        className="relative block h-[200px] w-full overflow-hidden bg-[#f7f7f7] sm:h-[200px]"
      >
        <img
          src={hasImage ? (product.imageUrl as string) : PLACEHOLDER_IMAGE}
          alt={product.imageAltText || product.productName}
          onError={() => setImageFailed(true)}
          className="absolute left-0 top-0 block h-full w-full object-cover p-0 transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        <span
          className="
            absolute left-2 top-2 z-10 rounded-full border border-[#dedede]
            bg-white/90 px-2 py-[3px] text-[9px] font-bold uppercase
            tracking-wide text-[#27304a] shadow-[0_1px_3px_rgba(0,0,0,0.08)]
            sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]
          "
        >
          {product.category}
        </span>
      </div>

      {/* PRODUCT INFORMATION — mobile unchanged; desktop padding trimmed and forced min-heights removed so the card hugs its content instead of leaving blank space */}
      <div className="flex w-full flex-col px-2.5 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3.5">
        {product.brand && (
          <p className="m-0 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-[#CF0006] sm:text-[10px]">
            {product.brand}
          </p>
        )}

        <h3
          className="
            m-0 mt-1 line-clamp-2 min-h-[34px] text-[13px] font-semibold
            leading-[17px] text-[#111827] transition-colors duration-200
            group-hover:text-[#CF0006]
            sm:mt-1 sm:min-h-[40px] sm:text-[15px] sm:leading-[20px]
          "
        >
          {product.productName}
        </h3>

        {specLine ? (
          <p className="m-0 mt-0.5 text-[11px] leading-[15px] text-[#777] sm:mt-1 sm:text-[12px] sm:leading-[18px]">
            {specLine}
          </p>
        ) : product.shortDescription ? (
          <p className="m-0 mt-1 line-clamp-2 text-[11px] leading-[15px] text-[#777] sm:mt-1.5 sm:text-[12px] sm:leading-[18px]">
            {product.shortDescription}
          </p>
        ) : null}

        {extraAttributes.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1 sm:mt-1.5 sm:gap-1">
            {extraAttributes.map(([key, value]) => (
              <span
                key={key}
                className="rounded-full bg-[#f7f7f7] px-1.5 py-0.5 text-[9px] text-[#555] sm:px-1.5 sm:text-[10px]"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 sm:mt-2.5">
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-[15px] font-bold leading-none text-[#CF0006] sm:text-[19px]">
              {formatPrice(product.price)}
            </span>

            {hasMrp && (
              <span className="text-[10px] leading-none text-[#777] line-through sm:text-[11px]">
                {formatPrice(product.mrp as number)}
              </span>
            )}
          </div>

          {product.gstPercentage !== null && (
            <p className="m-0 mt-1 text-[9px] leading-[13px] text-[#777] sm:mt-1 sm:text-[10px] sm:leading-4">
              {product.gstExclude
                ? `GST ${product.gstPercentage}% extra`
                : `Incl. GST ${product.gstPercentage}%`}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}