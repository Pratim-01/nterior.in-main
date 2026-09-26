// -----------------------------------------------------------------------
// Pricing engine — the ONE place the "best price" / "% off" / "MRP shown
// to the customer" math lives. Every place that shows a product's price
// (the main /api/products listing + detail queries in product-query.ts,
// the legacy /api/kayapalat-products featured-products feed, and the
// standalone /api/pricing/calculate endpoint used to test the formula on
// its own) calls into this file instead of re-implementing the formula,
// so a future change to the business rule only has to happen once.
//
// Business rule (as specified by the store owner):
//
//  1. gst_exclude = 0:
//       best_price = (mrp - ((gst_percentage / (mrp + gst_percentage)) * mrp))
//                    + (mrp * commission_percentage / 100)
//                    + transportation_cost
//
//  2. gst_exclude = 1:
//       best_price = mrp + (mrp * commission_percentage / 100) + transportation_cost
//
//  3. best_price is always truncated down to a whole rupee — 100.01 → 100,
//     100.99 → 100 (floor, never rounded to nearest).
//
//  4. % off = ((sell_mrp - best_price) / sell_mrp) * 100, and is always
//     rounded UP to a whole percent when it has any decimal part —
//     11.01% → 12% (ceil, never rounded to nearest).
//
//  5. `sell_mrp` — NOT `mrp` — is what gets shown to the customer as the
//     struck-through "was" price. `best_price` — NOT `sell_mrp` — is what
//     gets shown as the actual price they pay. The raw `mrp` column is an
//     internal cost-basis figure and is never surfaced to the storefront.
// -----------------------------------------------------------------------

export interface PricingInput {
  /** `product_details.mrp` — internal cost-basis figure, never shown as-is. */
  mrp: number;
  /** `product_details.gst_percentage`. */
  gstPercentage: number | null;
  /** `product_details.gst_exclude` (0 = GST included in `mrp`, 1 = excluded). */
  gstExclude: boolean;
  /** `product_details.commission_percentage`. */
  commissionPercentage: number | null;
  /** `product_details.transportation_cost`. */
  transportationCost: number | null;
  /** `product_details.sell_mrp` — the figure shown to the customer as MRP. */
  sellMrp: number;
}

export interface PricingResult {
  /** The actual selling price shown to the customer, floored to a whole rupee. */
  bestPrice: number;
  /** The "was" price shown struck-through — always `sell_mrp`, never the raw `mrp`. */
  displayMrp: number;
  /** "% off", ceiled to a whole percent; 0 when there's no discount to show. */
  discountPercent: number;
}

/** Rounds to 6 decimal places first so ordinary floating-point noise (e.g.
 *  `9.999999999999998` where the true value is `10`) doesn't get floored/
 *  ceiled to the wrong whole number. */
function clean(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

function floorToRupee(n: number): number {
  return Math.floor(clean(n));
}

function ceilToWhole(n: number): number {
  return Math.ceil(clean(n));
}

/**
 * Computes the "best price" from the raw cost-basis fields. Exported on its
 * own (in addition to `computePricing`) so callers that only need this
 * number — not the display MRP or the discount — don't have to also supply
 * `sellMrp`.
 */
export function calculateBestPrice(input: {
  mrp: number;
  gstPercentage: number | null;
  gstExclude: boolean;
  commissionPercentage: number | null;
  transportationCost: number | null;
}): number {
  const mrp = Number(input.mrp) || 0;
  const gstPercentage = Number(input.gstPercentage) || 0;
  const commissionPercentage = Number(input.commissionPercentage) || 0;
  const transportationCost = Number(input.transportationCost) || 0;

  const commission = (mrp * commissionPercentage) / 100;

  let raw: number;
  if (input.gstExclude) {
    raw = mrp + commission + transportationCost;
  } else {
    // (mrp + gstPercentage) is only 0 when both are 0 — nothing to back out.
    const denominator = mrp + gstPercentage;
    const gstPortion = denominator === 0 ? 0 : (gstPercentage / denominator) * mrp;
    raw = mrp - gstPortion + commission + transportationCost;
  }

  return floorToRupee(raw);
}

/** Computes "% off" of `bestPrice` against `sellMrp`. Never negative — a
 *  `bestPrice` at or above `sellMrp` means there's no discount to show. */
export function calculateDiscountPercent(
  sellMrp: number,
  bestPrice: number
): number {
  const mrp = Number(sellMrp) || 0;
  if (mrp <= 0) return 0;

  const raw = ((mrp - bestPrice) / mrp) * 100;
  if (raw <= 0) return 0;

  return ceilToWhole(raw);
}

/** The one-stop call site: raw DB fields in, everything the storefront
 *  needs to display (price, MRP, % off) out. */
export function computePricing(input: PricingInput): PricingResult {
  const mrp = Number(input.mrp) || 0;
  const sellMrp = Number(input.sellMrp) || 0;

  // A product with no cost-basis figure at all (`mrp` is 0/unset — e.g. it
  // was only ever given a `sell_mrp`) has nothing for the formula to work
  // from. Running the formula anyway would floor to a "best price" of ₹0
  // and a bogus "100% off" — worse than just falling back to selling it at
  // `sell_mrp` with no strike-through reference price and no discount
  // badge, which is what this does.
  if (mrp <= 0) {
    return {
      bestPrice: Math.floor(sellMrp),
      displayMrp: 0,
      discountPercent: 0,
    };
  }

  const bestPrice = calculateBestPrice(input);
  const discountPercent = calculateDiscountPercent(sellMrp, bestPrice);

  return { bestPrice, displayMrp: sellMrp, discountPercent };
}

/**
 * SQL twin of `computePricing().bestPrice`, for the places where the
 * database has to filter / sort / take MIN-MAX by the price the customer
 * actually sees (price-range filter, "Price: Low to High", the max-price
 * bound) instead of the raw `sell_mrp` column. Must stay in sync with
 * `calculateBestPrice` above. `alias` is a table prefix such as `"pd."`
 * (or `""`). Only column names are interpolated — never user input.
 */
export function bestPriceSql(alias = ""): string {
  const c = (name: string) => `${alias}\`${name}\``;
  const commission = `${c("mrp")} * COALESCE(${c("commission_percentage")}, 0) / 100`;
  const transport = `COALESCE(${c("transportation_cost")}, 0)`;
  const gst = `COALESCE(${c("gst_percentage")}, 0)`;
  // gst_exclude = 0: back the GST portion out of mrp first.
  const gstPortion = `(CASE WHEN ${c("mrp")} + ${gst} = 0 THEN 0
      ELSE (${gst} / (${c("mrp")} + ${gst})) * ${c("mrp")} END)`;
  return `(CASE
    WHEN COALESCE(${c("mrp")}, 0) <= 0 THEN FLOOR(COALESCE(${c("sell_mrp")}, 0))
    WHEN COALESCE(${c("gst_exclude")}, 0) = 1
      THEN FLOOR(ROUND(${c("mrp")} + ${commission} + ${transport}, 6))
    ELSE FLOOR(ROUND(${c("mrp")} - ${gstPortion} + ${commission} + ${transport}, 6))
  END)`;
}
