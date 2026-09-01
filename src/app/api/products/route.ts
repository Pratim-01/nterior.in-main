import { NextRequest, NextResponse } from "next/server";
import { parseProductQuery } from "@/lib/product-query-params";
import { fetchProducts } from "@/lib/product-query";
import { ProductsErrorResponse, ProductsResponse } from "@/types/products";

// Always hit the database — this endpoint's output depends on the query
// string, and product data (price, stock, new arrivals) changes, so it
// must never be statically cached by Next.js.
export const dynamic = "force-dynamic";

// GET /api/products?category=Plywood&brand=Greenply&thickness=18mm&minPrice=1000&maxPrice=5000&sort=price-low&page=2
//
// This is the ONE endpoint every category's listing page talks to —
// plywood, blockboards, tiles, paints, electricals, hardware, kitchen,
// bathroom, appliances, sofa & dining, lighting & fans, power & hand
// tools, or any future category. Nothing about a specific category, brand,
// size, thickness, or grade is hardcoded here or in the frontend — see
// src/lib/product-query.ts.
export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductsResponse | ProductsErrorResponse>> {
  try {
    const query = parseProductQuery(request.nextUrl.searchParams);
    const data = await fetchProducts(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/products] failed:", error);
    return NextResponse.json(
      { error: "Failed to load products. Please try again in a moment." },
      { status: 500 }
    );
  }
}
