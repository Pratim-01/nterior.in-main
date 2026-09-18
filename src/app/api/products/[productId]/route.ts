import { NextRequest, NextResponse } from "next/server";
import { fetchProductById } from "@/lib/product-query";
import {
  ProductDetailErrorResponse,
  ProductDetailResponse,
} from "@/types/products";

// Same reasoning as /api/products: price, stock, and images can change at
// any time, so this must never be statically cached by Next.js.
export const dynamic = "force-dynamic";

// GET /api/products/123 — everything the product "buy page" needs: the
// full product row, its complete image gallery, and a short list of
// related products from the same category.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
): Promise<NextResponse<ProductDetailResponse | ProductDetailErrorResponse>> {
  try {
    const { productId: raw } = await params;
    const productId = Number(raw);

    if (!Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }

    const data = await fetchProductById(productId);

    if (!data) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[GET /api/products/[productId]] failed:", error);
    return NextResponse.json(
      { error: "Failed to load this product. Please try again in a moment." },
      { status: 500 }
    );
  }
}
