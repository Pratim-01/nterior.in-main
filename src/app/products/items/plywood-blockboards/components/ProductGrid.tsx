import ProductCard, {
  type Product,
} from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-200
          bg-gray-50
          px-6
          py-12
          text-center
        "
      >
        <div>
          <h3
            className="
              text-lg
              font-bold
              text-gray-900
            "
          >
            No products found
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >
            Try changing your filters or browse
            another category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid

        /* ==================================================
           MOBILE
           2 PRODUCTS PER ROW
        ================================================== */

        grid-cols-2
        gap-3

        /* ==================================================
           TABLET
           3 PRODUCTS PER ROW
        ================================================== */

        sm:grid-cols-3
        sm:gap-5

        /* ==================================================
           DESKTOP
           4 PRODUCTS PER ROW
        ================================================== */

        lg:grid-cols-4
        lg:gap-5

        /* ==================================================
           LARGE DESKTOP
        ================================================== */

        xl:grid-cols-4
        xl:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
        />
      ))}
    </div>
  );
}