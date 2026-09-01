"use client";

import { useEffect, useState } from "react";
import { ProductsResponse } from "@/types/products";

interface UseProductsResult {
  data: ProductsResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetches `/api/products?<queryString>`. Re-fetches whenever `queryString`
 * changes (i.e. whenever the URL's filters, sort, price range, or page
 * change). Keeps the previous page's data visible while a new request is
 * in flight, so the UI doesn't flash empty on every filter click.
 */
export function useProducts(queryString: string): UseProductsResult {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/products?${queryString}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to load products.");
        }
        return (await res.json()) as ProductsResponse;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  return { data, isLoading, error };
}
