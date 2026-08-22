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

  const hasPrice =
    product.sell_mrp !== null &&
    product.sell_mrp !== undefined &&
    product.sell_mrp !== "" &&
    !Number.isNaN(Number(product.sell_mrp));

  return (
    <Link
      href={productHref}
      className="
        group
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-gray-300
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)]
      "
    >

      {/* ======================================================
          IMAGE
      ====================================================== */}

      <div
        className="
          relative
          h-[260px]
          shrink-0
          overflow-hidden
          bg-[#f7f7f7]

          sm:h-[280px]

          lg:h-[300px]

          xl:h-[320px]
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
              block
              h-full
              w-full
              object-contain
              p-2

              transition-transform
              duration-300
              ease-out

              group-hover:scale-[1.02]
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
              text-xs
              text-gray-400
            "
          >
            No image
          </div>
        )}
      </div>

      {/* ======================================================
          PRODUCT INFORMATION

          Fixed minimum height keeps every card aligned.
      ====================================================== */}

      <div
        className="
          flex
          min-h-[158px]
          flex-1
          flex-col
          p-3

          sm:min-h-[164px]
          sm:p-4
        "
      >

        {/* ====================================================
            PRODUCT NAME
        ==================================================== */}

        <h3
          className="
            line-clamp-2
            min-h-[40px]
            text-sm
            font-semibold
            leading-5
            text-gray-900
            transition-colors
            duration-200

            group-hover:text-[rgb(207,0,6)]

            sm:text-[15px]
            sm:leading-5
          "
        >
          {product.product_name}
        </h3>

        {/* ====================================================
            OPTIONS

            Keep this at a fixed height so products with and
            without options remain aligned.
        ==================================================== */}

        {/* <div
          className="
            mt-2
            min-h-[18px]
            text-xs
            font-medium
            text-[rgb(207,0,6)]
          "
        >
          Available options
        </div> */}

        {/* ====================================================
            PRICE

            mt-auto keeps pricing aligned at the bottom.
        ==================================================== */}

        <div
          className="
            mt-auto
            pt-3
          "
        >
          <p
            className="
              truncate
              text-lg
              font-bold
              leading-6
              text-[rgb(207,0,6)]

              sm:text-xl
            "
          >
            {hasPrice
              ? formatPrice(
                    product.sell_mrp
                )
              : "Price unavailable"}
          </p>

          <p
            className="
              mt-0.5
              text-[11px]
              leading-4
              text-gray-500

              sm:text-xs
            "
          >
            {/* {product.gst_exclude
              ? "GST excluded"
              : "Incl. GST"} */}
          </p>
        </div>
      </div>
    </Link>
  );
}