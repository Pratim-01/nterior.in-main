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
          min-h-[350px]
          items-center
          justify-center
          rounded-xl
          border
          border-dashed
          border-gray-200
          bg-gray-50
          p-8
          text-center
        "
      >
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            No products found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
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
        grid-cols-1
        gap-3

        sm:grid-cols-1
        sm:gap-4

        md:grid-cols-3
        md:gap-4

        lg:grid-cols-4

        xl:grid-cols-4
        xl:gap-5
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