// import { NextResponse } from "next/server";
// import kayapalatDb from "@/lib/kayapalat-db";

// export async function GET() {
//   try {
//     const [rows] = await kayapalatDb.query(`
//       SELECT
//         pd.product_id,
//         pd.product_name,
//         pd.category,
//         pd.product_type,
//         pd.short_description,
//         pd.sell_mrp,
//         pd.mrp,
//         pd.gst_percentage,
//         pd.gst_exclude,
//         pi.image_url,
//         pi.image_alt_text
//       FROM product_details pd

//       LEFT JOIN product_images pi
//         ON pd.product_id = pi.product_id
//         AND pi.is_primary = 1

//       WHERE pd.is_active = 1

//       ORDER BY pd.created_at DESC
//     `);

//     const products = (rows as any[]).map((product) => {
//       let imageUrl = product.image_url;

//       if (imageUrl) {
//         // If the database already contains a complete URL,
//         // use it as-is.
//         if (!imageUrl.startsWith("http")) {
//           const cleanPath = imageUrl
//             .replace(/^\/+/, "")
//             .replace(/^product_images\//, "");

//           imageUrl = `${process.env.KAYAPALAT_URL}/product_images/${cleanPath}`;
//         }
//       }

//       return {
//         product_id: product.product_id,
//         product_name: product.product_name,
//         category: product.category,
//         product_type: product.product_type,
//         short_description: product.short_description,
//         sell_mrp: product.sell_mrp,
//         mrp: product.mrp,
//         gst_percentage: product.gst_percentage,
//         gst_exclude: product.gst_exclude,
//         image_url: imageUrl,
//         image_alt_text:
//           product.image_alt_text || product.product_name,
//       };
//     });

//     return NextResponse.json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.error("Kayapalat products API error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch Kayapalat products",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";

import kayapalatDb from "@/lib/kayapalat-db";
import { bestPriceSql, computePricing } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    /* =========================================================
       QUERY PARAMETERS
    ========================================================= */

    const category =
      searchParams.get("category") || "Plywood";

    const sort =
      searchParams.get("sort") || "newest";

    const pageParam = Number(
      searchParams.get("page") || "1"
    );

    /*
     * 4 columns × 3 rows = 12 products
     */
    const limit = 12;

    /* =========================================================
       VALIDATE PAGINATION
    ========================================================= */

    const page =
      Number.isFinite(pageParam) &&
      pageParam > 0
        ? Math.floor(pageParam)
        : 1;

    const offset =
      (page - 1) * limit;

    /* =========================================================
       SORTING
    ========================================================= */

    let orderBy =
      "pd.created_at DESC";

    switch (sort) {
      case "price-low":
        orderBy = `${bestPriceSql("pd.")} ASC`;
        break;

      case "price-high":
        orderBy = `${bestPriceSql("pd.")} DESC`;
        break;

      case "name-asc":
        orderBy = "pd.product_name ASC";
        break;

      case "name-desc":
        orderBy = "pd.product_name DESC";
        break;

      case "newest":
      default:
        orderBy =
          "pd.created_at DESC";
        break;
    }

    /* =========================================================
       TOTAL PRODUCT COUNT FOR CURRENT CATEGORY
    ========================================================= */

    // `category` now also doubles as a sub_category value for rows whose
    // real `category` column holds a broader grouping (e.g. "Plywood" and
    // "Blockboards" live under category = "Plywood & Blockboard", with
    // "Plywood"/"Blockboards" in `sub_category`) — see the matching
    // comment in src/lib/product-query.ts. Matching either column keeps
    // this endpoint working for both the old flat values and the new
    // nested ones, without every caller needing to know which one a
    // given value lives in.
    const [countRows] =
      await kayapalatDb.query(
        `
          SELECT COUNT(*) AS total
          FROM product_details
          WHERE is_active = 1
            AND (category = ? OR sub_category = ?)
        `,
        [category, category]
      );

    const totalProducts = Number(
      (countRows as any[])[0]?.total || 0
    );

    const totalPages =
      totalProducts > 0
        ? Math.ceil(
            totalProducts / limit
          )
        : 0;

    /* =========================================================
       CATEGORY COUNTS

       These counts are used by the sidebar.

       Example:
       Plywood    → 74
       Blockboards → 35
    ========================================================= */

    // Plywood/Blockboards now live in `sub_category` (their shared
    // `category` is "Plywood & Blockboard"), so the counts have to group
    // by `sub_category`, not `category` — aliased back to `category` so
    // the mapping below doesn't need to change.
    const [categoryCountRows] =
      await kayapalatDb.query(
        `
          SELECT
            sub_category AS category,
            COUNT(*) AS total
          FROM product_details
          WHERE is_active = 1
            AND sub_category IN (
              'Plywood',
              'Blockboards'
            )
          GROUP BY sub_category
        `
      );

    const categoryCounts: Record<
      string,
      number
    > = {
      Plywood: 0,
      Blockboards: 0,
    };

    (
      categoryCountRows as any[]
    ).forEach((row) => {
      if (
        row.category === "Plywood" ||
        row.category === "Blockboards"
      ) {
        categoryCounts[row.category] =
          Number(row.total || 0);
      }
    });

    /* =========================================================
       FETCH PRODUCTS
    ========================================================= */

    const [rows] =
      await kayapalatDb.query(
        `
          SELECT
            pd.product_id,
            pd.product_name,
            COALESCE(NULLIF(pd.sub_category, ''), pd.category) AS category,
            pd.product_type,
            pd.short_description,
            pd.sell_mrp,
            pd.mrp,
            pd.gst_percentage,
            pd.gst_exclude,
            pd.commission_percentage,
            pd.transportation_cost,
            pi.image_url,
            pi.image_alt_text

          FROM product_details pd

          LEFT JOIN product_images pi
            ON pd.product_id = pi.product_id
            AND pi.is_primary = 1

          WHERE pd.is_active = 1
            AND (pd.category = ? OR pd.sub_category = ?)

          ORDER BY ${orderBy}

          LIMIT ? OFFSET ?
        `,
        [
          category,
          category,
          limit,
          offset,
        ]
      );

    /* =========================================================
       FORMAT PRODUCTS
    ========================================================= */

    const products = (
      rows as any[]
    ).map((product) => {
      let imageUrl =
        product.image_url;

      if (imageUrl) {
        if (
          !imageUrl.startsWith("http")
        ) {
          const cleanPath =
            imageUrl
              .replace(/^\/+/, "")
              .replace(
                /^product_images\//,
                ""
              );

          imageUrl = `${process.env.KAYAPALAT_URL}/product_images/${cleanPath}`;
        }
      }

      // Same rule as the main /api/products feed (see src/lib/pricing.ts):
      // `sell_mrp` here stops meaning "the raw sell_mrp column" and becomes
      // the calculated best price the customer actually pays, while `mrp`
      // stops meaning "the raw mrp column" and becomes the old `sell_mrp`
      // value, shown struck-through as the "was" price. The raw `mrp`
      // column (an internal cost-basis figure) is never sent to the
      // storefront.
      const { bestPrice, displayMrp, discountPercent } = computePricing({
        mrp: Number(product.mrp) || 0,
        gstPercentage:
          product.gst_percentage !== null && product.gst_percentage !== undefined
            ? Number(product.gst_percentage)
            : null,
        gstExclude: Boolean(product.gst_exclude),
        commissionPercentage:
          product.commission_percentage !== null &&
          product.commission_percentage !== undefined
            ? Number(product.commission_percentage)
            : null,
        transportationCost:
          product.transportation_cost !== null &&
          product.transportation_cost !== undefined
            ? Number(product.transportation_cost)
            : null,
        sellMrp: Number(product.sell_mrp) || 0,
      });

      return {
        product_id:
          product.product_id,

        product_name:
          product.product_name,

        category:
          product.category,

        product_type:
          product.product_type,

        short_description:
          product.short_description,

        sell_mrp:
          bestPrice,

        mrp:
          displayMrp,

        discount_percent:
          discountPercent,

        gst_percentage:
          product.gst_percentage,

        gst_exclude:
          product.gst_exclude,

        image_url:
          imageUrl,

        image_alt_text:
          product.image_alt_text ||
          product.product_name,
      };
    });

    /* =========================================================
       RESPONSE
    ========================================================= */

    return NextResponse.json({
      success: true,

      products,

      categoryCounts,

      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,

        hasNextPage:
          page < totalPages,

        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error(
      "Kayapalat products API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}