import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export type PlywoodProduct = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  href?: string;
  unit?: string;
};

type FeaturedProductsProps = {
  products: PlywoodProduct[];
  title?: string;
  viewAllHref?: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedProducts({
  products,
  title = "Explore Our Range of Plywood",
  viewAllHref = "/products/items/plywood-laminates/plywood",
}: FeaturedProductsProps) {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            {/* EYEBROW */}

            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-8 bg-[rgb(255,170,0)]" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[rgb(207,0,6)]
                  sm:text-xs
                "
              >
                Featured Products
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-[#202020]
                sm:text-3xl
                lg:text-4xl
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-2
                hidden
                max-w-xl
                text-sm
                leading-6
                text-gray-500
                sm:block
              "
            >
              Discover quality materials selected for furniture,
              kitchens, wardrobes and modern interior projects.
            </p>
          </div>

          {/* ===================================================
              VIEW ALL
          =================================================== */}

          <Link
            href={viewAllHref}
            className="
              group
              flex
              shrink-0
              items-center
              gap-2
              text-sm
              font-bold
              text-[rgb(207,0,6)]
              transition-colors
              duration-200
              hover:text-[rgb(170,0,5)]
            "
          >
            <span className="hidden sm:inline">View All</span>

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-red-100
                bg-red-50
                transition-all
                duration-300
                group-hover:bg-[rgb(207,0,6)]
                group-hover:text-white
              "
            >
              <ArrowRight
                size={17}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>
        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        {products.length > 0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-4
            "
          >
            {products.slice(0, 4).map((product) => {
              const productHref =
                product.href ||
                `/products/${product.id}`;

              return (
                <Link
                  key={product.id}
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
                  "
                >
                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      bg-[#f7f7f7]
                    "
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="
                        (max-width: 639px) 50vw,
                        (max-width: 1023px) 50vw,
                        25vw
                      "
                      className="
                        object-contain
                        p-4
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.04]
                        sm:p-6
                      "
                    />

                    {/* IMAGE OVERLAY */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/5
                        to-transparent
                      "
                    />

                    {/* QUICK VIEW ICON */}

                    <div
                      className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-9
                        w-9
                        translate-y-1
                        items-center
                        justify-center
                        rounded-full
                        bg-white/95
                        text-[rgb(207,0,6)]
                        opacity-0
                        shadow-md
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <ShoppingBag
                        size={16}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* =================================================
                      PRODUCT INFORMATION
                  ================================================= */}

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* PRODUCT NAME */}

                    <h3
                      className="
                        line-clamp-2
                        min-h-[42px]
                        text-sm
                        font-bold
                        leading-5
                        text-gray-900
                        transition-colors
                        duration-200
                        group-hover:text-[rgb(207,0,6)]
                        sm:text-base
                        sm:leading-6
                      "
                    >
                      {product.name}
                    </h3>

                    {/* PRICE */}

                    <div className="mt-5">
                      <div
                        className="
                          text-lg
                          font-black
                          text-[rgb(207,0,6)]
                          sm:text-xl
                        "
                      >
                        {formatPrice(product.price)}
                      </div>

                      {/* GST */}

                      <div className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                        Incl. GST
                        {product.unit && ` • ${product.unit}`}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM ACCENT
                  ================================================= */}

                  <div
                    aria-hidden="true"
                    className="
                      h-1
                      w-full
                      bg-gradient-to-r
                      from-[rgb(255,170,0)]
                      via-[rgb(255,110,0)]
                      to-[rgb(207,0,6)]
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-gray-50
              px-6
              py-14
              text-center
            "
          >
            <p className="text-sm font-medium text-gray-500">
              No products available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}