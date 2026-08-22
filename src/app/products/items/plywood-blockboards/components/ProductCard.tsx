import Link from "next/link";

export type Product = {
  product_id: number;
  product_name: string;
  category: string;
  product_type: "sqft" | "unit";
  short_description?: string | null;
  sell_mrp: number | string | null;
  mrp: number | string | null;
  gst_percentage: number | string | null;
  gst_exclude: boolean | number | null;
  image_url?: string | null;
  image_alt_text?: string | null;
};

/* ==========================================================
   PRICE FORMATTER
========================================================== */

function formatPrice(
  price: number | string | null
) {
  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return "Price unavailable";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

/* ==========================================================
   PRODUCT CARD
========================================================== */

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const productHref =
    `/products/${product.product_id}`;

  const price =
    product.sell_mrp !== null &&
    product.sell_mrp !== undefined &&
    product.sell_mrp !== ""
      ? Number(product.sell_mrp)
      : NaN;

  const mrp =
    product.mrp !== null &&
    product.mrp !== undefined &&
    product.mrp !== ""
      ? Number(product.mrp)
      : NaN;

  const hasPrice =
    !Number.isNaN(price);

  const hasMrp =
    !Number.isNaN(mrp) &&
    mrp > price;

  return (
    <Link
      href={productHref}
      className="
        group
        relative
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-red-100
        hover:shadow-[0_14px_35px_rgba(0,0,0,0.10)]

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[rgb(207,0,6)]
        focus-visible:ring-offset-2
      "
    >

      {/* ======================================================
          PRODUCT IMAGE
      ====================================================== */}

      <div
        className="
          relative
          aspect-square
          w-full
          overflow-hidden
          bg-[#f7f7f7]
        "
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={
              product.image_alt_text ||
              product.product_name
            }
            loading="lazy"
            decoding="async"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
              p-3

              transition-transform
              duration-500
              ease-out

              group-hover:scale-[1.05]

              sm:p-5
              lg:p-6
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >
            <span
              className="
                text-[10px]
                text-gray-400

                sm:text-xs
              "
            >
              No image available
            </span>
          </div>
        )}

        {/* ====================================================
            IMAGE OVERLAY
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/5
            to-transparent
          "
        />

        {/* ====================================================
            PRODUCT TYPE
        ==================================================== */}

        <span
          className="
            absolute
            left-2
            top-2
            rounded-full
            bg-white/95
            px-2
            py-0.5
            text-[8px]
            font-bold
            uppercase
            tracking-wide
            text-gray-700
            shadow-sm
            backdrop-blur-sm

            sm:left-3
            sm:top-3
            sm:px-2.5
            sm:py-1
            sm:text-[10px]
          "
        >
          {product.product_type}
        </span>
      </div>

      {/* ======================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          p-3

          sm:p-4
          lg:p-5
        "
      >

        {/* ====================================================
            CATEGORY
        ==================================================== */}

        <p
          className="
            truncate
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[rgb(207,0,6)]

            sm:text-[10px]
            lg:text-xs
          "
        >
          {product.category}
        </p>

        {/* ====================================================
            PRODUCT NAME
        ==================================================== */}

        <h3
          className="
            mt-1
            line-clamp-2
            min-h-[32px]
            text-[11px]
            font-bold
            leading-4
            text-gray-900

            transition-colors
            duration-200

            group-hover:text-[rgb(207,0,6)]

            sm:min-h-[40px]
            sm:text-sm
            sm:leading-5

            lg:text-base
            lg:leading-6
          "
        >
          {product.product_name}
        </h3>

        {/* ====================================================
            DESCRIPTION

            Hidden on mobile to keep cards compact.
        ==================================================== */}

        {product.short_description && (
          <p
            className="
              mt-2
              hidden
              line-clamp-2
              text-xs
              leading-5
              text-gray-500

              sm:block
            "
          >
            {product.short_description}
          </p>
        )}

        {/* ====================================================
            PRICE
        ==================================================== */}

        <div
          className="
            mt-auto
            pt-3

            sm:pt-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-baseline
              gap-1.5

              sm:gap-2
            "
          >
            <span
              className="
                text-sm
                font-black
                text-[rgb(207,0,6)]

                sm:text-lg
                lg:text-xl
              "
            >
              {hasPrice
                ? formatPrice(price)
                : "Price unavailable"}
            </span>

            {hasMrp && (
              <span
                className="
                  text-[9px]
                  text-gray-400
                  line-through

                  sm:text-xs
                  lg:text-sm
                "
              >
                {formatPrice(mrp)}
              </span>
            )}
          </div>

          {/* ==================================================
              GST
          ================================================== */}

          <p
            className="
              mt-0.5
              text-[8px]
              text-gray-500

              sm:mt-1
              sm:text-[11px]

              lg:text-xs
            "
          >
            {product.gst_exclude
              ? `GST ${product.gst_percentage}% extra`
              : `Incl. GST ${product.gst_percentage}%`}
          </p>
        </div>
      </div>

      {/* ======================================================
          BOTTOM ACCENT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          h-0.5
          w-full

          bg-gradient-to-r
          from-[rgb(255,170,0)]
          via-[rgb(255,110,0)]
          to-[rgb(207,0,6)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100

          sm:h-1
        "
      />
    </Link>
  );
}