"use client";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";
const products = [
  {
    id: 1,
    title: "Luxury Fabric Sofa",
    category: "Living Room",
    image: "https://picsum.photos/600/600?random=101",
    price: "₹49,999",
    oldPrice: "₹64,999",
    rating: 4.9,
    discount: "23% OFF",
  },
  {
    id: 2,
    title: "Modern TV Unit",
    category: "Living Room",
    image: "https://picsum.photos/600/600?random=102",
    price: "₹18,999",
    oldPrice: "₹24,999",
    rating: 4.8,
    discount: "24% OFF",
  },
  {
    id: 3,
    title: "Modular Kitchen",
    category: "Kitchen",
    image: "https://picsum.photos/600/600?random=103",
    price: "Starting ₹1.8L",
    oldPrice: "",
    rating: 5.0,
    discount: "Premium",
  },
  {
    id: 4,
    title: "Designer Wardrobe",
    category: "Bedroom",
    image: "https://picsum.photos/600/600?random=104",
    price: "₹72,999",
    oldPrice: "₹89,999",
    rating: 4.9,
    discount: "18% OFF",
  },
  {
    id: 5,
    title: "Luxury Bed",
    category: "Bedroom",
    image: "https://picsum.photos/600/600?random=105",
    price: "₹39,999",
    oldPrice: "₹49,999",
    rating: 4.8,
    discount: "20% OFF",
  },
  {
    id: 6,
    title: "Dining Table Set",
    category: "Dining",
    image: "https://picsum.photos/600/600?random=106",
    price: "₹29,999",
    oldPrice: "₹36,999",
    rating: 4.7,
    discount: "19% OFF",
  },
];
export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-[rgb(207,0,6)]">
              FEATURED PRODUCTS
            </span>
            <h2 className="mt-6 text-5xl font-black text-gray-900">
              Trending
              <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
                {" "}Collections
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-gray-600">
              Handpicked premium furniture and interior products
              loved by thousands of homeowners.
            </p>
          </div>
          <Link
            href="#"
            className="mt-8 lg:mt-0 inline-flex items-center gap-2 font-bold text-[rgb(207,0,6)] hover:gap-3 transition"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
        {/* Products */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-lg transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
                />
                {/* Discount */}
                <span className="absolute left-5 top-5 rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-4 py-2 text-xs font-bold text-white shadow-lg">
                  {product.discount}
                </span>
                {/* Wishlist */}
                <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-red-50">
                  <Heart
                    size={18}
                    className="text-gray-700 hover:text-red-600"
                  />
                </button>
                {/* Hover Buttons */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 translate-y-16 gap-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-100">
                    <Eye size={18} />
                  </button>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="p-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                  {product.category}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>
                {/* Rating */}
                <div className="mt-4 flex items-center gap-2">
                  <Star
                    size={18}
                    fill="#facc15"
                    className="text-yellow-400"
                  />
                  <span className="font-bold">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    (250+ Reviews)
                  </span>
                </div>
                {/* Price */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-3xl font-black text-gray-900">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                {/* Button */}
                <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] py-4 font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}