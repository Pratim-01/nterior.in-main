"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value =
    searchParams.get("sort") || "newest";

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set(
      "sort",
      event.target.value,
    );

    // Sorting always starts from page 1
    params.delete("page");

    router.push(
      `?${params.toString()}`,
      {
        scroll: false,
      },
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      {/* LABEL */}

      <span
        className="
          text-[14px]
          text-[#777]
        "
      >
        Sort by:
      </span>

      {/* SELECT */}

      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          aria-label="Sort products"
          className="
            h-[49px]
            w-[200px]

            appearance-none

            rounded-[9px]

            border
            border-[#dedede]

            bg-white

            px-5
            pr-11

            text-[15px]
            font-medium
            text-[#222]

            outline-none

            transition-colors
            duration-200

            focus:border-[#c52327]

            cursor-pointer
          "
        >
          <option value="newest">
            Newest
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name-asc">
            Name: A-Z
          </option>

          <option value="name-desc">
            Name: Z-A
          </option>
        </select>

        {/* CUSTOM ARROW */}

        <svg
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
          "
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#333"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
