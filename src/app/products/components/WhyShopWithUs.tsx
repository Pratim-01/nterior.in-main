"use client";

import {
    BadgeCheck,
    Boxes,
    Clock3,
    IndianRupee,
} from "lucide-react";

const benefits = [
    {
        id: 1,
        icon: Boxes,
        title: "Wide Product Selection",
        description:
            "Explore tiles, plywood, laminates, paints and more.",
    },
    {
        id: 2,
        icon: IndianRupee,
        title: "Competitive Prices",
        description:
            "Quality interior products at value-driven prices.",
    },
    {
        id: 3,
        icon: Clock3,
        title: "Fast & Reliable Delivery",
        description:
            "Get your selected products delivered on time.",
    },
    {
        id: 4,
        icon: BadgeCheck,
        title: "Trusted Quality",
        description:
            "Shop genuine products from trusted brands.",
    },
];

export default function WhyShopWithUs() {
    return (
        <section
            className="
        w-full
    bg-white
    px-4
    pt-3
    pb-10
    sm:px-6
    sm:pt-5
    sm:pb-14
    md:pt-6
    md:pb-16
      "
        >
            <div
                className="
          mx-auto
          w-full
          max-w-7xl
        "
            >
                {/* =====================================================
            HEADER
        ===================================================== */}

                <div
                    className="
            mb-7
            max-w-2xl
            sm:mb-9
          "
                >
                    {/* EYEBROW */}

                    <div
                        className="
              mb-2
              flex
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[rgb(255,170,0)]
              sm:text-sm
            "
                    >
                        <span
                            className="
                h-1.5
                w-1.5
                rounded-full
                bg-[rgb(255,170,0)]
              "
                        />

                        Why Nterior
                    </div>

                    {/* HEADING */}

                    <h2
                        className="
              text-2xl
              font-black
              leading-tight
              tracking-tight
              text-orange-700
              sm:text-3xl
              md:text-4xl
            "
                    >
                        Why Shop With Us?
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                        className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[rgb(120,90,0)]
              sm:text-base
              sm:leading-7
            "
                    >
                        Everything you need for your interior projects,
                        brought together with quality, value and reliable
                        service.
                    </p>
                </div>

                {/* =====================================================
            BENEFIT CARDS
        ===================================================== */}

                <div
                    className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            sm:gap-4
            lg:grid-cols-4
          "
                >
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.id}
                                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  sm:p-6
                "
                            >
                                {/* =================================================
                    TOP ACCENT
                ================================================= */}

                                <div
                                    aria-hidden="true"
                                    className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-full
                    bg-gradient-to-r
                    from-[rgb(255,170,0)]
                    to-[rgb(207,0,6)]
                  "
                                />

                                {/* =================================================
                    ICON
                ================================================= */}

                                <div
                                    className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[rgb(207,0,6)]
                    text-white
                    shadow-sm
                    sm:h-14
                    sm:w-14
                  "
                                >
                                    <Icon
                                        size={24}
                                        strokeWidth={1.8}
                                        className="sm:h-7 sm:w-7"
                                    />
                                </div>

                                {/* =================================================
                    CONTENT
                ================================================= */}

                                <div className="mt-5">
                                    <h3
                                        className="
                      text-base
                      font-bold
                      leading-6
                      text-gray-950
                      sm:text-lg
                    "
                                    >
                                        {benefit.title}
                                    </h3>

                                    <p
                                        className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500
                    "
                                    >
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* =================================================
                    SUBTLE DECORATION
                ================================================= */}

                                <div
                                    aria-hidden="true"
                                    className="
                    pointer-events-none
                    absolute
                    -bottom-10
                    -right-10
                    h-24
                    w-24
                    rounded-full
                    bg-orange-50
                  "
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}