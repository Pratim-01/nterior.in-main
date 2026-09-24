import { NextRequest, NextResponse } from "next/server";
import { getSuggestions } from "@/lib/search-suggest";

export const dynamic = "force-dynamic";

// GET /api/search/suggest?q=door
//
// Called by the navbar search box (src/components/Navbar.tsx), debounced,
// as the visitor types. Returns catalog-derived phrase suggestions — see
// src/lib/search-suggest.ts for how they're built.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await getSuggestions(q);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("[GET /api/search/suggest] failed:", error);
    return NextResponse.json({ suggestions: [] });
  }
}