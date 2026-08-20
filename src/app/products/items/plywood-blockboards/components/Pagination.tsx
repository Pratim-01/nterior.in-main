"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages
  );

  function getPageNumbers(): (
    number | "..."
  )[] {
    const pages: (
      | number
      | "..."
    )[] = [];

    if (totalPages <= 5) {
      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      safeCurrentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      safeCurrentPage + 1
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    if (
      safeCurrentPage <
      totalPages - 2
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }

  function handlePageChange(page: number) {
    if (
      page < 1 ||
      page > totalPages ||
      page === safeCurrentPage
    ) {
      return;
    }

    onPageChange(page);
  }

  return (
    <nav
      aria-label="Product pagination"
      className="
        mt-8
        flex
        flex-col
        items-center
        gap-3

        sm:mt-10
      "
    >
      {/* PAGINATION CONTROLS */}

      <div
        className="
          flex
          items-center
          gap-1
          sm:gap-2
        "
      >
        {/* PREVIOUS */}

        <button
          type="button"
          disabled={
            safeCurrentPage === 1
          }
          onClick={() =>
            handlePageChange(
              safeCurrentPage - 1
            )
          }
          className="
            inline-flex
            h-10
            items-center
            gap-1
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3

            text-xs
            font-semibold
            text-gray-700

            transition

            hover:border-gray-300
            hover:text-gray-900

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:px-4
            sm:text-sm
          "
        >
          <ChevronLeft size={15} />

          <span className="hidden sm:inline">
            Previous
          </span>
        </button>

        {/* NUMBERS */}

        <div className="flex items-center gap-1">
          {getPageNumbers().map(
            (page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="
                      flex
                      h-10
                      w-7
                      items-center
                      justify-center
                      text-xs
                      text-gray-400
                    "
                  >
                    ...
                  </span>
                );
              }

              const active =
                page === safeCurrentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    handlePageChange(page)
                  }
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg

                    text-sm
                    font-semibold

                    transition

                    ${
                      active
                        ? `
                          bg-[#171717]
                          text-white
                        `
                        : `
                          text-gray-700
                          hover:bg-gray-50
                        `
                    }
                  `}
                >
                  {page}
                </button>
              );
            }
          )}
        </div>

        {/* NEXT */}

        <button
          type="button"
          disabled={
            safeCurrentPage ===
            totalPages
          }
          onClick={() =>
            handlePageChange(
              safeCurrentPage + 1
            )
          }
          className="
            inline-flex
            h-10
            items-center
            gap-1
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3

            text-xs
            font-semibold
            text-gray-700

            transition

            hover:border-gray-300
            hover:text-gray-900

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:px-4
            sm:text-sm
          "
        >
          <span className="hidden sm:inline">
            Next
          </span>

          <ChevronRight size={15} />
        </button>
      </div>

      {/* PAGE STATUS */}

      <p className="text-xs text-gray-400">
        Page{" "}
        <span className="font-semibold text-gray-700">
          {safeCurrentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700">
          {totalPages}
        </span>
      </p>
    </nav>
  );
}