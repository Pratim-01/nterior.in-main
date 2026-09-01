"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ParsedProductQuery,
  buildQueryString,
  parseProductQuery,
} from "@/lib/product-query-params";

// -----------------------------------------------------------------------
// Single source of truth for "what's currently selected". Filters, sort,
// price range, and page all live in the URL's query string — nothing is
// duplicated into component state — so a filtered/sorted/paginated view is
// always shareable, and the browser back/forward buttons work for free.
// -----------------------------------------------------------------------

export function useProductUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo(() => parseProductQuery(searchParams), [searchParams]);

  const update = useCallback(
    (next: Partial<ParsedProductQuery>) => {
      const qs = buildQueryString(next, searchParams);
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { ...query, update };
}
