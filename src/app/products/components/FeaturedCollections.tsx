"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
const collections = [
  {
    title: "Luxury Living Collection",
    subtitle: "Premium Sofas • TV Units • Coffee Tables",
    description:
      "Transform your living room with handcrafted furniture designed for elegance, comfort and timeless style.",
    image: "https://picsum.photos/1200/800?random=21",
    offer: "UP TO 40% OFF",
    reverse: false,
  },
  {
    title: "Modern Modular Kitchens",
    subtitle: "Smart Storage • Elegant Finish",
    description:
      "Experience functional luxury with modular kitchens customized for your lifestyle.",
    image: "https://picsum.photos/1200/800?random=22",
    offer: "FREE INSTALLATION",
    reverse: true,
  },
  {
    title: "Dream Bedroom",
    subtitle: "Beds • Wardrobes • Side Tables",
    description:
      "Create a peaceful retreat with premium bedroom furniture and designer wardrobes.",
    image: "https://picsum.photos/1200/800?random=23",
    offer: "BEST SELLER",
    reverse: false,
  },
  {
    title: "Workspace Essentials",
    subtitle: "Office Tables • Chairs",
    description:
      "Boost productivity with ergonomic office furniture.",
    image: "https://picsum.photos/1200/800?random=24",
    offer: "NEW ARRIVAL",
    reverse: true,
  },
];
export default function FeaturedCollections() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-2 font-semibold text-[rgb(207,0,6)]">
            <Sparkles size={16} />
            Featured Collections
          </span>
          <h2 className="mt-6 text-5xl font-black text-gray-900">
            Curated for
            <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
              {" "}Modern Living
            </span>
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
            Discover handpicked collections designed by interior experts
            to elevate every corner of your home.
          </p>
        </div>
        <div className="space-y-20">
          {collections.map((item) => (
            <div
              key={item.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                item.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative group">
                <div className="overflow-hidden rounded-[40px] shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Offer Badge */}
                <div className="absolute left-8 top-8 rounded-2xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-5 py-3 text-white shadow-xl">
                  <p className="text-xs uppercase tracking-widest">
                    Exclusive
                  </p>
                  <h4 className="font-black text-lg">
                    {item.offer}
                  </h4>
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-8 right-8 rounded-3xl bg-white p-6 shadow-2xl">
                  <p className="text-4xl font-black bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
                    4.9★
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer Rating
                  </p>
                </div>
              </div>
              {/* Text */}
              <div>
                <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-[rgb(207,0,6)]">
                  Premium Collection
                </span>
                <h3 className="mt-6 text-5xl font-black text-gray-900 leading-tight">
                  {item.title}
                </h3>
                <p className="mt-5 text-xl font-semibold text-[rgb(207,0,6)]">
                  {item.subtitle}
                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {item.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-8 py-4 font-bold text-white shadow-xl transition duration-300 hover:scale-105"
                  >
                    Shop Collection
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:border-[rgb(207,0,6)] hover:text-[rgb(207,0,6)]"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div className="rounded-2xl bg-orange-50 p-5">
                    <h4 className="text-3xl font-black text-[rgb(207,0,6)]">
                      10K+
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Products
                    </p>
                  </div>
                  <div className="rounded-2xl bg-yellow-50 p-5">
                    <h4 className="text-3xl font-black text-[rgb(255,170,0)]">
                      500+
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Designs
                    </p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-5">
                    <h4 className="text-3xl font-black text-[rgb(207,0,6)]">
                      4.9★
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}