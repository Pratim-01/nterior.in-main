"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Truck,
  Zap,
} from "lucide-react";

/* ==========================================================
   HERO BANNERS
   type: "image"   -> normal <Image>, src is a local/remote path
   type: "youtube" -> src is any youtube.com/youtu.be URL
   type: "video"   -> src is a direct .mp4/.webm file path/URL
========================================================== */

type Banner =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

const banners: Banner[] = [
  {
    type: "youtube",
    src: "https://youtu.be/sn5J852qphw",
    alt: "Featured product video",
  },
  {
    type: "youtube",
    src: "https://youtu.be/vG-NCOfc2SQ",
    alt: "Featured product video",
  },
  {
    type: "youtube",
    src: "https://youtu.be/NzBq0JHdpbc",
    alt: "Featured product video",
  },
];

/* ==========================================================
   YOUTUBE HELPERS
   Pulls the 11-char video ID out of any common YouTube URL
   shape (youtu.be/ID, watch?v=ID, embed/ID, shorts/ID).
========================================================== */

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/* ==========================================================
   AUTO SLIDE SPEED
========================================================== */

const AUTO_SLIDE_TIME = 6500;

/* ==========================================================
   HERO COMPONENT
========================================================== */

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* ==========================================================
     MOBILE DETECTION
     (mobile shows only the active slide — the peeking side
     images are a desktop/tablet effect, like the reference)
  ========================================================== */

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  /* ==========================================================
     AUTOMATIC SLIDER
     Image slides advance on a fixed timer. Video/YouTube slides
     do NOT use the timer — they advance only once the media
     actually finishes (see onEnded below, and the YouTube
     "message" listener further down).
  ========================================================== */

  useEffect(() => {
    if (isPaused) return;

    const activeBanner = banners[currentSlide];
    if (activeBanner.type !== "image") return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, AUTO_SLIDE_TIME);

    return () => window.clearInterval(interval);
  }, [isPaused, currentSlide]);

  /* ==========================================================
     YOUTUBE "VIDEO ENDED" -> ADVANCE SLIDE
     YouTube's embedded iframe reports player state changes via
     postMessage once it knows the parent is "listening" (sent
     on iframe load below). State 0 means the video ended.
  ========================================================== */

  useEffect(() => {
    function handleYouTubeMessage(event: MessageEvent) {
      if (event.origin !== "https://www.youtube.com") return;

      let data: { event?: string; info?: { playerState?: number } };
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (
        data.event === "infoDelivery" &&
        typeof data.info?.playerState === "number" &&
        data.info.playerState === 0
      ) {
        nextSlide();
      }
    }

    window.addEventListener("message", handleYouTubeMessage);
    return () => window.removeEventListener("message", handleYouTubeMessage);
  }, []);

  /* ==========================================================
     RELATIVE SLIDE POSITION
     0 = active, -1 = previous (peeks on the left),
     +1 = next (peeks on the right)
  ========================================================== */

  const getRelativePosition = (index: number) => {
    let position = index - currentSlide;

    if (position > banners.length / 2) position -= banners.length;
    if (position < -banners.length / 2) position += banners.length;

    return position;
  };

  return (
    <section
      aria-label="Featured interior products"
      className="w-full overflow-hidden bg-white"
    >
      {/* ======================================================
          FULL WIDTH WRAPPER — lets the side slides peek in
          from beyond the centered content column.
      ====================================================== */}

      <div
        className="
          relative
          left-1/2
          w-screen
          -translate-x-1/2

          pt-[16px]

          sm:pt-[20px]

          lg:pt-[24px]
        "
      >
        {/* ====================================================
            HERO SLIDER — center slide + peeking prev/next
        ==================================================== */}

        <div
          className="
            relative
            h-[clamp(200px,calc(100dvh_-_132px),320px)]
            w-full

            sm:h-[clamp(260px,calc(100dvh_-_180px),380px)]

            md:h-[clamp(300px,calc(100dvh_-_180px),420px)]

            lg:h-[clamp(340px,calc(100dvh_-_108px),460px)]

            xl:h-[clamp(360px,calc(100dvh_-_108px),480px)]
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {banners.map((banner, index) => {
            const position = getRelativePosition(index);
            const isActive = position === 0;

            /* On mobile only the active slide is rendered —
               no peeking strips on small screens. */
            if (isMobile && !isActive) return null;

            /* Desktop: active slide spans ~70vw, centered.
               Previous/next slides sit ~74% further out,
               so a sliver of each peeks in from the edges. */
            const centerPosition = isMobile ? 50 : 50 + position * 74;

            return (
              <div
                key={banner.src}
                className={`
                  absolute
                  top-0

                  h-full

                  overflow-hidden

                  rounded-xl

                  border
                  border-gray-200

                  shadow-md

                  sm:rounded-2xl

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${isActive ? "z-20" : "z-10"}
                `}
                style={{
                  left: `${centerPosition}%`,
                  width: isMobile ? "calc(100vw - 16px)" : "70vw",
                  transform: "translateX(-50%)",
                }}
              >
                {banner.type === "image" && (
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={isActive || Math.abs(position) === 1}
                    sizes="(max-width: 767px) calc(100vw - 16px), 70vw"
                    className="select-none object-cover object-center"
                    draggable={false}
                  />
                )}

                {banner.type === "youtube" &&
                  (() => {
                    const youtubeId = getYouTubeId(banner.src);
                    if (!youtubeId) return null;

                    /* Only the active slide actually plays —
                       peeking side slides show a static thumbnail
                       instead of an autoplaying iframe, for
                       performance. */
                    if (isActive) {
                      return (
                        <iframe
                          className="pointer-events-none h-full w-full select-none"
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=0&controls=0&modestbranding=1&showinfo=0&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1`}
                          title={banner.alt}
                          allow="autoplay; encrypted-media"
                          allowFullScreen={false}
                          onLoad={(e) => {
                            /* tell the YouTube player we want state-change
                               events (play/pause/ended) posted back to us */
                            (e.target as HTMLIFrameElement).contentWindow?.postMessage(
                              JSON.stringify({ event: "listening", id: index }),
                              "*"
                            );
                          }}
                        />
                      );
                    }

                    return (
                      <Image
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        alt={banner.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 767px) calc(100vw - 16px), 70vw"
                        className="select-none object-cover object-center"
                        draggable={false}
                      />
                    );
                  })()}

                {banner.type === "video" && (
                  <video
                    className="h-full w-full select-none object-cover object-center"
                    src={banner.src}
                    poster={banner.poster}
                    autoPlay={isActive}
                    muted
                    playsInline
                    preload={isActive ? "auto" : "none"}
                    onEnded={() => {
                      if (isActive) nextSlide();
                    }}
                  />
                )}

                {/* dim the peeking side slides */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/25" />
                )}
              </div>
            );
          })}

          {/* ==================================================
              ARROWS — sit in the gap between the active slide
              and the peeking side slides on desktop; sit inside
              the image on mobile.
          ================================================== */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            className="
              absolute
              left-[13%]
              top-1/2
              z-40

              flex
              h-11
              w-11

              -translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-gray-200

              bg-white

              text-gray-800

              shadow-md

              transition-all
              duration-200

              hover:border-[rgb(255,170,0)]
              hover:text-[rgb(207,0,6)]

              active:scale-95

              max-md:left-2
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronLeft size={20} strokeWidth={2} className="max-md:h-4 max-md:w-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="
              absolute
              right-[13%]
              top-1/2
              z-40

              flex
              h-11
              w-11

              translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-gray-200

              bg-white

              text-gray-800

              shadow-md

              transition-all
              duration-200

              hover:border-[rgb(255,170,0)]
              hover:text-[rgb(207,0,6)]

              active:scale-95

              max-md:right-2
              max-md:h-8
              max-md:w-8

              max-md:translate-x-0
            "
          >
            <ChevronRight size={20} strokeWidth={2} className="max-md:h-4 max-md:w-4" />
          </button>
        </div>

        {/* ====================================================
            EXPRESS DELIVERY — compact strip, always inside
            the first viewport (no extra scroll needed).
        ==================================================== */}

        <div
          className="
            relative

            mx-auto

            mt-2
            mb-3

            sm:mt-3

            w-[calc(100%-16px)]

            max-w-[850px]

            overflow-hidden

            rounded-xl

            border
            border-orange-100

            bg-gradient-to-r
            from-[#fff4df]
            via-[#fff9ef]
            to-white

            shadow-sm

            sm:mb-5

            sm:w-[calc(100%-48px)]

            sm:rounded-2xl
          "
        >
          <div
            className="
              relative

              flex
              min-h-[52px]

              items-center

              gap-2

              px-2.5
              py-1.5

              sm:min-h-[68px]

              sm:gap-4

              sm:px-5
              sm:py-3

              lg:px-8
            "
          >
            {/* TRUCK ICON */}

            <div
              className="
                flex

                h-7
                w-7

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[#cf0006]

                text-white

                shadow-sm

                sm:h-10
                sm:w-10
              "
            >
              <Truck
                size={14}
                strokeWidth={2}
                className="sm:h-[18px] sm:w-[18px]"
              />
            </div>

            {/* DELIVERY TEXT */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-1.5">
                <div
                  className="
                    flex
                    items-center

                    gap-0.5

                    text-[10px]
                    font-bold
                    leading-tight

                    text-[#cf0006]

                    sm:gap-1

                    sm:text-sm

                    lg:text-base
                  "
                >
                  <Zap
                    size={10}
                    fill="currentColor"
                    strokeWidth={2}
                    className="sm:h-[14px] sm:w-[14px]"
                  />
                  <span>Express Delivery</span>
                </div>

                <span className="text-[8px] text-gray-300 sm:text-sm">•</span>

                <span
                  className="
                    text-[8px]
                    font-semibold

                    text-[#a76d00]

                    sm:text-sm
                  "
                >
                  In 4 hours
                </span>
              </div>

              <p
                className="
                  hidden

                  text-xs
                  leading-tight

                  text-gray-600

                  sm:block
                "
              >
                Order before 4 PM to receive your order the same day.
              </p>

              <div
                className="
                  mt-0.5

                  flex
                  items-center

                  gap-0.5

                  text-[7px]
                  font-medium

                  text-gray-400

                  sm:gap-1

                  sm:text-[11px]
                "
              >
                <MapPin size={8} strokeWidth={2} className="sm:h-3 sm:w-3" />
                <span>Available on select pincodes &amp; products</span>
              </div>
            </div>

            {/* DELIVERY TIME BADGE (desktop) */}

            <div
              className="
                hidden

                shrink-0

                items-center

                gap-2

                rounded-full

                border
                border-orange-100

                bg-white

                px-3.5
                py-1.5

                shadow-sm

                md:flex
              "
            >
              <Clock3 size={15} className="text-[#ffab00]" />
              <span className="text-xs font-semibold text-gray-700">
                4 Hour Delivery
              </span>
            </div>
          </div>

          <div
            className="
              h-[2px]
              w-full

              bg-gradient-to-r
              from-[#ffab00]
              via-[#ff8a00]
              to-[#cf0006]
            "
          />
        </div>
      </div>
    </section>
  );
}
