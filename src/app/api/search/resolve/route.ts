import { NextRequest, NextResponse } from "next/server";
import { fetchSearchVocabulary, resolveSearchFilters, ResolvedSearchFilters } from "@/lib/search-resolve";

export const dynamic = "force-dynamic";

const EMPTY_FILTERS: ResolvedSearchFilters = {
  subCategory: [],
  brand: [],
  category: [],
  thickness: [],
  grade: [],
};

// GET /api/search/resolve?q=ply+greenply
//
// Called by the navbar search box (src/components/Navbar.tsx) right
// before it navigates to /search — turns the typed term into the real
// sub-category/brand/thickness/grade filter selections it implies, so
// searching "ply greenply" lands on /search with Brand: Greenply already
// checked instead of relying purely on free-text matching. See
// src/lib/search-resolve.ts for the matching rules.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return NextResponse.json({ filters: EMPTY_FILTERS });
  }

  try {
    const vocab = await fetchSearchVocabulary();
    const filters = resolveSearchFilters(q, vocab);
    return NextResponse.json({ filters });
  } catch (error) {
    console.error("[GET /api/search/resolve] failed:", error);
    // Fail open — the navbar falls back to a plain `?q=` search, which
    // still works correctly on its own (see buildSearchClause in
    // src/lib/product-query.ts).
    return NextResponse.json({ filters: EMPTY_FILTERS });
  }
}