"use client";

import { useEffect, useRef } from "react";
import {
  Building2,
  MapPin,
  Store as StoreIcon,
} from "lucide-react";

/* ==========================================================
   STORE LOCATIONS
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
  /*
    IMPORTANT:
    This ref is attached directly to the mobile
    overflow-x-auto container.
  */
  const scrollRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);

  const isTouchingRef = useRef(false);

  const lastTimeRef = useRef<number | null>(null);

  /* ========================================================
     CONTINUOUS MOBILE AUTO SCROLL
  ======================================================== */

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const mediaQuery = window.matchMedia(
      "(max-width: 639px)"
    );

    /*
      Only run the animation on mobile.
    */
    if (!mediaQuery.matches) {
      return;
    }

    /*
      Scroll speed.

      0.035 = approximately 35px per second.

      Try:
      0.025 = slower
      0.035 = normal
      0.05  = faster
    */
    const speed = 0.035;

    const scrollContinuously = (
      timestamp: number
    ) => {
      /*
        Initialize timestamp.
      */
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime =
        timestamp - lastTimeRef.current;

      lastTimeRef.current = timestamp;

      /*
        Don't automatically scroll while
        the user is swiping.
      */
      if (!isTouchingRef.current) {
        container.scrollLeft +=
          speed * deltaTime;

        /*
          There are two copies of the stores:

          1 2 3 4 5 6
          1 2 3 4 5 6

          When the first set is completely
          passed, move back by exactly the
          width of one set.

          This makes the movement look infinite.
        */

        const loopWidth =
          container.scrollWidth / 2;

        if (
          container.scrollLeft >=
          loopWidth
        ) {
          container.scrollLeft -=
            loopWidth;
        }
      }

      animationRef.current =
        requestAnimationFrame(
          scrollContinuously
        );
    };

    /*
      Start continuous animation.
    */
    animationRef.current =
      requestAnimationFrame(
        scrollContinuously
      );

    /*
      Cleanup.
    */
    return () => {
      if (
        animationRef.current !== null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      lastTimeRef.current = null;
    };
  }, []);

  /* ========================================================
     TOUCH HANDLERS
  ======================================================== */

  const handleTouchStart = () => {
    isTouchingRef.current = true;
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;

    /*
      Reset the timer so the first frame after
      the swipe doesn't produce a sudden jump.
    */
    lastTimeRef.current = null;
  };

  /* ========================================================
     STORE CARD
  ======================================================== */

  const StoreCard = ({
    store,
    index,
    mobile = false,
  }: {
    store: (typeof stores)[number];
    index: number;
    mobile?: boolean;
  }) => {
    const Icon =
      cityIcons[index % cityIcons.length];

    return (
      <div
        className={
          mobile
            ? `
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
            `
            : `
              flex
              min-w-0
              flex-col
              items-center
              rounded-2xl
              border
              border-gray-200
              bg-white/90
              px-3
              py-5
              text-center
              shadow-sm
              backdrop-blur-sm
            `
        }
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
          className={
            mobile
              ? `
                mt-3
                text-sm
                font-bold
                text-gray-900
              `
              : `
                mt-3
                text-base
                font-bold
                text-gray-900
              `
          }
        >
          {store.city}
        </h3>

        {/* STATE */}

        <div
          className={
            mobile
              ? `
                mt-1
                flex
                items-center
                gap-1
                text-[11px]
                text-gray-500
              `
              : `
                mt-1
                flex
                items-center
                gap-1
                text-xs
                text-gray-500
              `
          }
        >
          <MapPin
            size={12}
            strokeWidth={1.8}
          />

          {store.location}
        </div>
      </div>
    );
  };

  /* ========================================================
     RENDER
  ======================================================== */

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
              pb-2
              sm:mt-9
            "
          >
            {/* ==================================================
                MOBILE CONTINUOUS CAROUSEL

                IMPORTANT:
                scrollRef is on THIS element because
                this is the element with overflow-x-auto.
            ================================================== */}

            <div
              ref={scrollRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="
                flex
                overflow-x-auto
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                sm:hidden
              "
            >
              <div
                className="
                  flex
                  min-w-max
                  gap-3
                "
              >
                {[...stores, ...stores].map(
                  (store, index) => (
                    <StoreCard
                      key={`${store.id}-${index}`}
                      store={store}
                      index={
                        index % stores.length
                      }
                      mobile
                    />
                  )
                )}
              </div>
            </div>

            {/* ==================================================
                DESKTOP GRID
            ================================================== */}

            <div
              className="
                hidden
                sm:grid
                sm:grid-cols-3
                sm:gap-4
                lg:grid-cols-6
              "
            >
              {stores.map(
                (store, index) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    index={index}
                  />
                )
              )}
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