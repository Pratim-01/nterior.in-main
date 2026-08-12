"use client";

import {
  Building2,
  MapPin,
  Store as StoreIcon,
} from "lucide-react";

/* ==========================================================
   STORE LOCATIONS
   Static display only
========================================================== */

const stores = [
  {
    id: 1,
    city: "Bengaluru",
    location: "Karnataka",
  },
  {
    id: 2,
    city: "Chennai",
    location: "Tamil Nadu",
  },
  {
    id: 3,
    city: "Hyderabad",
    location: "Telangana",
  },
  {
    id: 4,
    city: "Coimbatore",
    location: "Tamil Nadu",
  },
  {
    id: 5,
    city: "Mysuru",
    location: "Karnataka",
  },
  {
    id: 6,
    city: "Warangal",
    location: "Telangana",
  },
];

const cityIcons = [
  Building2,
  StoreIcon,
  Building2,
  StoreIcon,
  Building2,
  StoreIcon,
];

/* ==========================================================
   COMPONENT
========================================================== */

export default function Stores() {
  return (
    <section
      className="
        w-full
        bg-white
        px-4
        py-10
        sm:px-6
        sm:py-14
        md:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ====================================================
            MAIN CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-orange-100
            bg-gradient-to-br
            from-orange-50
            via-white
            to-red-50
            px-5
            py-7
            shadow-sm
            sm:rounded-3xl
            sm:px-8
            sm:py-9
            lg:px-12
            lg:py-10
          "
        >
          {/* ==================================================
              DECORATIVE BACKGROUND
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-orange-200/30
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-28
              -left-20
              h-64
              w-64
              rounded-full
              bg-red-200/20
              blur-3xl
            "
          />

          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              relative
              z-10
              text-center
            "
          >
            {/* EYEBROW */}

            <div
              className="
                mb-2
                flex
                items-center
                justify-center
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

              Our Store Locations
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
              Visit an Nterior Store Near You
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-[rgb(120,90,0)]
                sm:text-base
                sm:leading-7
              "
            >
              Find us across leading cities for tiles,
              plywood, laminates, paints and interior essentials.
            </p>
          </div>

          {/* ==================================================
              STORE LOCATIONS
          ================================================== */}

          <div
            className="
              relative
              z-10
              mt-7
              overflow-x-auto
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              sm:mt-9
            "
          >
            <div
              className="
                flex
                min-w-max
                gap-3
                sm:grid
                sm:min-w-0
                sm:grid-cols-3
                sm:gap-4
                lg:grid-cols-6
              "
            >
              {stores.map((store, index) => {
                const Icon = cityIcons[index];

                return (
                  <div
                    key={store.id}
                    className="
                      flex
                      min-w-[145px]
                      flex-col
                      items-center
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white/90
                      px-4
                      py-4
                      text-center
                      shadow-sm
                      backdrop-blur-sm
                      sm:min-w-0
                      sm:px-3
                      sm:py-5
                    "
                  >
                    {/* ICON */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-orange-100
                        bg-gradient-to-br
                        from-orange-50
                        to-red-50
                        text-[rgb(207,0,6)]
                      "
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* CITY */}

                    <h3
                      className="
                        mt-3
                        text-sm
                        font-bold
                        text-gray-900
                        sm:text-base
                      "
                    >
                      {store.city}
                    </h3>

                    {/* STATE */}

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1
                        text-[11px]
                        text-gray-500
                        sm:text-xs
                      "
                    >
                      <MapPin
                        size={12}
                        strokeWidth={1.8}
                      />

                      {store.location}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================================================
              BOTTOM ACCENT
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              h-1
              w-full
              bg-gradient-to-r
              from-[rgb(255,170,0)]
              via-[rgb(255,120,0)]
              to-[rgb(207,0,6)]
            "
          />
        </div>
      </div>
    </section>
  );
}