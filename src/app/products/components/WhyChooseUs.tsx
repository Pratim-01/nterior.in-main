"use client";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Wrench,
  CreditCard,
  Headphones,
} from "lucide-react";
const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "Every product is carefully selected from trusted brands with premium quality assurance.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and secure delivery with professional logistics across India.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Experienced technicians ensure hassle-free installation at your home.",
  },
  {
    icon: BadgeCheck,
    title: "Warranty Protection",
    description:
      "Enjoy manufacturer warranty and dedicated after-sales support.",
  },
  {
    icon: CreditCard,
    title: "Easy EMI",
    description:
      "Flexible payment options and EMI plans for every budget.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description:
      "Our experts are always available to assist before and after purchase.",
  },
];
export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-[rgb(207,0,6)]">
            WHY CHOOSE NTERIOR
          </span>
          <h2 className="mt-6 text-5xl font-black text-gray-900">
            We Don't Just Sell Products.
            <br />
            <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
              We Build Dream Homes.
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            From design consultation to installation, we take care of
            everything required for a beautiful home.
          </p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-[32px] bg-white p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition duration-500"
              >
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[rgb(255,170,0)] to-[rgb(207,0,6)] flex items-center justify-center shadow-xl">
                  <Icon
                    size={34}
                    className="text-white"
                  />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 leading-8 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}