"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sort") || "newest";

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set(
      "sort",
      event.target.value
    );

    params.delete("page");

    router.push(
      `?${params.toString()}`
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          hidden
          text-xs
          text-gray-500

          sm:inline
          sm:text-sm
        "
      >
        Sort by:
      </span>

      <select
        value={currentSort}
        onChange={handleChange}
        aria-label="Sort products"
        className="
          h-10
          min-w-[145px]

          rounded-lg
          border
          border-gray-200
          bg-white

          px-3

          text-xs
          font-semibold
          text-gray-800

          outline-none

          transition

          focus:border-[rgb(207,0,6)]
          focus:ring-1
          focus:ring-red-50

          sm:min-w-[180px]
          sm:text-sm
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
    </div>
  );
}