"use client";
import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    city: "Kolkata",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "The complete experience was amazing. From design consultation to installation, everything was handled professionally. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Gupta",
    city: "Bengaluru",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Our modular kitchen exceeded expectations. The quality, finishing and service were excellent. Worth every penny.",
  },
  {
    id: 3,
    name: "Amit Roy",
    city: "Mumbai",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "Nterior completely transformed our apartment. Excellent customer support and beautiful furniture collection.",
  },
];
export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-[rgb(207,0,6)]">
            CUSTOMER STORIES
          </span>
          <h2 className="mt-6 text-5xl font-black text-gray-900">
            Loved by
            <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
              {" "}Thousands of Families
            </span>
          </h2>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
            Our customers are at the heart of everything we build.
            Here is what they say about their Nterior experience.
          </p>
        </div>
        {/* Stats */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {[
            ["1200+", "Happy Families"],
            ["5000+", "Products"],
            ["4.9★", "Average Rating"],
            ["98%", "Satisfaction"],
          ].map(([number, text]) => (
            <div
              key={text}
              className="rounded-3xl bg-white p-8 text-center shadow-lg border border-gray-100"
            >
              <h3 className="text-5xl font-black bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
                {number}
              </h3>
              <p className="mt-3 text-gray-500">
                {text}
              </p>
            </div>
          ))}
        </div>
        {/* Reviews */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[34px] bg-white p-8 shadow-xl border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition duration-500"
            >
              {/* Quote */}
              <div className="absolute right-8 top-8 opacity-10">
                <Quote
                  size={90}
                  className="text-[rgb(207,0,6)]"
                />
              </div>
              {/* User */}
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover border-4 border-orange-100"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-gray-500">
                    {item.city}
                  </p>
                </div>
              </div>
              {/* Stars */}
              <div className="mt-6 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#facc15"
                    className="text-yellow-400"
                  />
                ))}
              </div>
              {/* Review */}
              <p className="mt-6 leading-8 text-gray-600">
                "{item.review}"
              </p>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-20 rounded-[40px] bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] p-12 text-center text-white shadow-2xl">
          <h3 className="text-4xl font-black">
            Ready to Transform Your Home?
          </h3>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-white/90">
            Join thousands of happy homeowners who trusted Nterior for
            their dream interiors.
          </p>
          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-[rgb(207,0,6)] shadow-xl transition hover:scale-105"
          >
            Start Your Journey
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}