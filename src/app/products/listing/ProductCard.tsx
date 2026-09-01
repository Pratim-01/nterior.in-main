"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/products";

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
      href={`/products/${product.productId}`}
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
      {/* IMAGE AREA — real fixed height */}
      <div
        className="relative block h-[220px] min-h-[220px] w-full overflow-hidden bg-[#f7f7f7]"
        style={{ height: "220px", minHeight: "220px" }}
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
            absolute left-3 top-3 z-10 rounded-full border border-[#dedede]
            bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase
            tracking-wide text-[#27304a] shadow-[0_1px_3px_rgba(0,0,0,0.08)]
          "
        >
          {product.category}
        </span>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="flex min-h-[220px] w-full flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        {product.brand && (
          <p className="m-0 truncate text-[10px] font-bold uppercase tracking-[0.08em] text-[#CF0006]">
            {product.brand}
          </p>
        )}

        <h3
          className="
            m-0 mt-1.5 line-clamp-2 min-h-[42px] text-[15px] font-semibold
            leading-[21px] text-[#111827] transition-colors duration-200
            group-hover:text-[#CF0006]
          "
        >
          {product.productName}
        </h3>

        {specLine ? (
          <p className="m-0 mt-1 text-[12px] leading-[18px] text-[#777]">{specLine}</p>
        ) : product.shortDescription ? (
          <p className="m-0 mt-2 line-clamp-2 min-h-[36px] text-[12px] leading-[18px] text-[#777]">
            {product.shortDescription}
          </p>
        ) : (
          <div className="min-h-[18px]" />
        )}

        {extraAttributes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {extraAttributes.map(([key, value]) => (
              <span
                key={key}
                className="rounded-full bg-[#f7f7f7] px-2 py-0.5 text-[10px] text-[#555]"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[19px] font-bold leading-none text-[#CF0006]">
              {formatPrice(product.price)}
            </span>

            {hasMrp && (
              <span className="text-[11px] leading-none text-[#777] line-through">
                {formatPrice(product.mrp as number)}
              </span>
            )}
          </div>

          {product.gstPercentage !== null && (
            <p className="m-0 mt-1.5 text-[10px] leading-4 text-[#777]">
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
