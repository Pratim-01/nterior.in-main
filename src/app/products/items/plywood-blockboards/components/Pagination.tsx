"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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
  /* ==========================================================
     HIDE PAGINATION WHEN THERE IS ONLY ONE PAGE
  ========================================================== */

  if (totalPages <= 1) {
    return null;
  }

  /* ==========================================================
     KEEP CURRENT PAGE WITHIN VALID RANGE
  ========================================================== */

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  /* ==========================================================
     PAGE NUMBER GENERATION
  ========================================================== */

  function getPageNumbers(): (number | "...")[] {
    /*
     * If there are 5 or fewer pages,
     * ALWAYS show every page number.
     *
     * Example:
     *
     * 1  2
     * 1  2  3
     * 1  2  3  4
     * 1  2  3  4  5
     */

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    /*
     * For more than 5 pages,
     * use ellipsis when necessary.
     */

    const pages: (number | "...")[] = [];

    /*
     * Always show first page.
     */
    pages.push(1);

    /*
     * Calculate pages around current page.
     */
    const start = Math.max(2, safeCurrentPage - 1);

    const end = Math.min(totalPages - 1, safeCurrentPage + 1);

    /*
     * Add ellipsis between page 1
     * and the current page range.
     */
    if (start > 2) {
      pages.push("...");
    }

    /*
     * Add pages around current page.
     */
    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    /*
     * Add ellipsis before the last page.
     */
    if (end < totalPages - 1) {
      pages.push("...");
    }

    /*
     * Always show final page.
     */
    pages.push(totalPages);

    /*
     * Remove any accidental duplicates.
     */
    return [...new Set(pages)];
  }

  const pageNumbers = getPageNumbers();

  /* ==========================================================
     PAGE CHANGE
  ========================================================== */

  function handlePageChange(page: number) {
    /*
     * Don't allow invalid pages or clicking
     * the page that is already active.
     */
    if (page < 1 || page > totalPages || page === safeCurrentPage) {
      return;
    }

    onPageChange(page);
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <nav
      aria-label="Product pagination"
      className="
        mt-8
        mb-8
        flex
        w-full
        flex-col
        items-end
        gap-3

        sm:mt-10
      "
    >
      {/* ======================================================
          PAGINATION CONTROLS
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-center
          gap-1.5

          sm:gap-2
        "
      >
        {/* ====================================================
            PREVIOUS
        ==================================================== */}

        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          aria-label="Go to previous page"
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3

            text-xs
            font-semibold
            text-gray-700

            transition-colors
            duration-200

            hover:border-gray-300
            hover:bg-gray-50
            hover:text-gray-900

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:px-4
            sm:text-sm
          "
        >
          <ChevronLeft size={15} strokeWidth={2} />

          <span>Previous</span>
        </button>

        {/* ====================================================
            PAGE NUMBERS
        ==================================================== */}

        <div
          className="
            flex
            items-center
            gap-1

            sm:gap-2
          "
        >
          {pageNumbers.map((page, index) => {
            /* ==============================================
                 ELLIPSIS
              ============================================== */

            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="
                      flex
                      h-10
                      w-7
                      items-center
                      justify-center

                      text-sm
                      font-medium
                      text-gray-400
                    "
                >
                  ...
                </span>
              );
            }

            /* ==============================================
                 ACTIVE PAGE
              ============================================== */

            const active = page === safeCurrentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={active ? "page" : undefined}
                className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border

                    text-sm
                    font-semibold

                    transition-colors
                    duration-200

                    ${
                      active
                        ? `
                          bg-[#CF0006]
                          text-white
                        `
                        : `
                          border-gray-200
                          bg-white
                          text-gray-700
                          hover:bg-gray-50
                          hover:text-gray-900
                        `
                    }
                  `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* ====================================================
            NEXT
        ==================================================== */}

        <button
          type="button"
          disabled={safeCurrentPage === totalPages}
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          aria-label="Go to next page"
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-1.5
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3

            text-xs
            font-semibold
            text-gray-700

            transition-colors
            duration-200

            hover:border-gray-300
            hover:bg-gray-50
            hover:text-gray-900

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:px-4
            sm:text-sm
          "
        >
          <span>Next</span>

          <ChevronRight size={15} strokeWidth={2} />
        </button>
      </div>

      {/* ======================================================
          PAGE STATUS
      ====================================================== */}

      {/* <p
        className="
          text-xs
          text-gray-400
        "
      >
        Page{" "}
        <span className="font-semibold text-gray-700">
          {safeCurrentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700">
          {totalPages}
        </span>
      </p> */}
    </nav>
  );
}
