"use client";
const brands = [
  "Hafele",
  "Hettich",
  "Godrej",
  "Greenlam",
  "CenturyPly",
  "Kajaria",
  "Asian Paints",
  "Jaquar",
  "Bosch",
  "Crompton",
  "Philips",
  "Durian",
];
export default function BrandLogos() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50 py-24">
      {/* Background */}
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-[rgb(207,0,6)]">
            TRUSTED PARTNERS
          </span>
          <h2 className="mt-6 text-5xl font-black text-gray-900">
            We Work With
            <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
              {" "}Leading Brands
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Carefully selected premium brands trusted by interior
            designers and homeowners across India.
          </p>
        </div>
        {/* Logo Grid */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-[rgb(255,170,0)] hover:shadow-2xl"
            >
              <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-red-50">
                <span className="text-2xl font-black tracking-wide text-gray-800 transition group-hover:scale-110">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Banner */}
        <div className="mt-24 rounded-[40px] bg-gradient-to-r from-[rgb(255,170,0)] via-orange-500 to-[rgb(207,0,6)] p-[1px]">
          <div className="rounded-[40px] bg-white px-10 py-12">
            <div className="grid items-center gap-10 lg:grid-cols-3">
              <div>
                <h3 className="text-4xl font-black text-gray-900">
                  Premium Quality
                </h3>
                <p className="mt-4 text-gray-600 leading-8">
                  Every product is sourced from reliable manufacturers
                  and trusted brands.
                </p>
              </div>
              <div className="text-center">
                <h2 className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-6xl font-black text-transparent">
                  100%
                </h2>
                <p className="mt-3 text-gray-500">
                  Genuine Products
                </p>
              </div>
              <div className="text-center lg:text-right">
                <button className="rounded-2xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105">
                  Explore Brands
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}