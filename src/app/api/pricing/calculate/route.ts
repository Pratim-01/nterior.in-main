import { NextRequest, NextResponse } from "next/server";
import { computePricing, PricingInput } from "@/lib/pricing";

// A small, DB-independent endpoint that runs the pricing formula from
// src/lib/pricing.ts on whatever numbers it's given. Doesn't touch
// `product_details` at all — it's for testing/verifying the formula, or
// for an admin screen to preview "if I set these numbers, here's what the
// customer will see" before saving a product. The real, database-backed
// endpoints (/api/products, /api/products/[productId],
// /api/kayapalat-products) already run this same calculation for every
// product they return — you don't need to call this endpoint from the
// storefront itself.
//
// GET  /api/pricing/calculate?mrp=1000&gstPercentage=18&gstExclude=0&commissionPercentage=10&transportationCost=50&sellMrp=1400
// POST /api/pricing/calculate  { "mrp": 1000, "gstPercentage": 18, "gstExclude": 0, "commissionPercentage": 10, "transportationCost": 50, "sellMrp": 1400 }

interface CalculatePricingErrorResponse {
  error: string;
}

interface CalculatePricingResponse {
  input: PricingInput;
  bestPrice: number;
  displayMrp: number;
  discountPercent: number;
}

/** Pulls the 6 pricing fields out of either a URLSearchParams (GET) or a
 *  parsed JSON body (POST), and validates them. Returns either the parsed
 *  input or a human-readable error — never throws. */
function parseInput(
  raw: Record<string, unknown>
): { input: PricingInput } | { error: string } {
  const num = (key: string, required: boolean): number | null | { error: string } => {
    const value = raw[key];
    if (value === undefined || value === null || value === "") {
      if (required) return { error: `"${key}" is required.` };
      return null;
    }
    const n = Number(value);
    if (!Number.isFinite(n)) return { error: `"${key}" must be a number.` };
    return n;
  };

  const mrp = num("mrp", true);
  if (mrp && typeof mrp === "object") return mrp;

  const sellMrp = num("sellMrp", true);
  if (sellMrp && typeof sellMrp === "object") return sellMrp;

  const gstPercentage = num("gstPercentage", false);
  if (gstPercentage && typeof gstPercentage === "object") return gstPercentage;

  const commissionPercentage = num("commissionPercentage", false);
  if (commissionPercentage && typeof commissionPercentage === "object")
    return commissionPercentage;

  const transportationCost = num("transportationCost", false);
  if (transportationCost && typeof transportationCost === "object")
    return transportationCost;

  const gstExcludeRaw = raw["gstExclude"];
  const gstExclude =
    gstExcludeRaw === true ||
    gstExcludeRaw === 1 ||
    gstExcludeRaw === "1" ||
    gstExcludeRaw === "true";

  return {
    input: {
      mrp: mrp as number,
      sellMrp: sellMrp as number,
      gstPercentage: gstPercentage as number | null,
      gstExclude,
      commissionPercentage: commissionPercentage as number | null,
      transportationCost: transportationCost as number | null,
    },
  };
}

function respond(
  parsed: ReturnType<typeof parseInput>
): NextResponse<CalculatePricingResponse | CalculatePricingErrorResponse> {
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { bestPrice, displayMrp, discountPercent } = computePricing(parsed.input);
  return NextResponse.json({
    input: parsed.input,
    bestPrice,
    displayMrp,
    discountPercent,
  });
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  return respond(parseInput(params));
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }
  return respond(parseInput(body));
}
