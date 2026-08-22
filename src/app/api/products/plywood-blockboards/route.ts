import { NextRequest, NextResponse } from "next/server";
import kayapalatDb from "@/lib/kayapalat-db";

const SUBCATEGORY_MAP: Record<string, string[]> = {
  plywood: ["Plywood"],
  blockboards: ["Blockboard", "Blockboards"],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const subcategory = (
      searchParams.get("subcategory") || "plywood"
    ).toLowerCase();

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 12, 1),
      48
    );

    const offset = (page - 1) * limit;

    const sort = searchParams.get("sort") || "newest";

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const productType = searchParams.get("productType");

    const categories = SUBCATEGORY_MAP[subcategory];

    if (!categories) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid subcategory",
        },
        { status: 400 }
      );
    }

    const whereConditions: string[] = [
      "pd.is_active = 1",
    ];

    const queryParams: (string | number)[] = [];

    /*
     * ---------------------------------------------------------
     * CATEGORY
     * ---------------------------------------------------------
     */

    if (categories.length === 1) {
      whereConditions.push("pd.category = ?");
      queryParams.push(categories[0]);
    } else {
      whereConditions.push(
        `pd.category IN (${categories.map(() => "?").join(", ")})`
      );

      queryParams.push(...categories);
    }

    /*
     * ---------------------------------------------------------
     * PRICE
     * ---------------------------------------------------------
     */

    if (minPrice) {
      const value = Number(minPrice);

      if (!Number.isNaN(value)) {
        whereConditions.push("pd.sell_mrp >= ?");
        queryParams.push(value);
      }
    }

    if (maxPrice) {
      const value = Number(maxPrice);

      if (!Number.isNaN(value)) {
        whereConditions.push("pd.sell_mrp <= ?");
        queryParams.push(value);
      }
    }

    /*
     * ---------------------------------------------------------
     * PRODUCT TYPE
     * ---------------------------------------------------------
     */

    if (
      productType === "sqft" ||
      productType === "unit"
    ) {
      whereConditions.push("pd.product_type = ?");
      queryParams.push(productType);
    }

    /*
     * ---------------------------------------------------------
     * SORTING
     * ---------------------------------------------------------
     */

    let orderBy = "pd.created_at DESC";

    switch (sort) {
      case "price-low":
        orderBy = "pd.sell_mrp ASC";
        break;

      case "price-high":
        orderBy = "pd.sell_mrp DESC";
        break;

      case "name-asc":
        orderBy = "pd.product_name ASC";
        break;

      case "name-desc":
        orderBy = "pd.product_name DESC";
        break;

      case "newest":
      default:
        orderBy = "pd.created_at DESC";
        break;
    }

    const whereClause = whereConditions.join(" AND ");

    /*
     * ---------------------------------------------------------
     * TOTAL COUNT
     * ---------------------------------------------------------
     */

    const [countRows] = await kayapalatDb.query(
      `
        SELECT COUNT(DISTINCT pd.product_id) AS total
        FROM product_details pd
        WHERE ${whereClause}
      `,
      queryParams
    );

    const total =
      Number((countRows as any[])[0]?.total) || 0;

    /*
     * ---------------------------------------------------------
     * PRODUCTS
     * ---------------------------------------------------------
     */

    const [rows] = await kayapalatDb.query(
      `
        SELECT
          pd.product_id,
          pd.dealer_id,
          pd.product_name,
          pd.category,
          pd.product_type,
          pd.short_description,
          pd.about_product,
          pd.sell_mrp,
          pd.mrp,
          pd.commission_percentage,
          pd.commission_amount,
          pd.gst_percentage,
          pd.gst_exclude,
          pd.gst_amount,
          pd.transportation_cost,
          pd.transport_exclude,
          pd.base_mrp,
          pd.final_product_cost,
          pd.is_active,
          pd.showroom_stock,
          pd.showroom_stock_number,
          pd.defect_stock,
          pd.created_at,
          pd.updated_at,

          pi.image_url,
          pi.image_alt_text

        FROM product_details pd

        LEFT JOIN product_images pi
          ON pd.product_id = pi.product_id
          AND pi.is_primary = 1

        WHERE ${whereClause}

        ORDER BY ${orderBy}

        LIMIT ? OFFSET ?
      `,
      [...queryParams, limit, offset]
    );

    /*
     * ---------------------------------------------------------
     * FORMAT PRODUCTS
     * ---------------------------------------------------------
     */

    const products = (rows as any[]).map((product) => {
      let imageUrl = product.image_url;

      if (imageUrl) {
        if (!imageUrl.startsWith("http")) {
          const cleanPath = imageUrl
            .replace(/^\/+/, "")
            .replace(/^product_images\//, "");

          imageUrl = `${process.env.KAYAPALAT_URL}/product_images/${cleanPath}`;
        }
      }

      return {
        product_id: product.product_id,
        dealer_id: product.dealer_id,
        product_name: product.product_name,
        category: product.category,
        product_type: product.product_type,
        short_description: product.short_description,
        about_product: product.about_product,

        sell_mrp: Number(product.sell_mrp) || 0,
        mrp: Number(product.mrp) || 0,

        commission_percentage:
          Number(product.commission_percentage) || 0,

        commission_amount:
          Number(product.commission_amount) || 0,

        gst_percentage:
          Number(product.gst_percentage) || 0,

        gst_exclude: Boolean(product.gst_exclude),

        gst_amount:
          Number(product.gst_amount) || 0,

        transportation_cost:
          Number(product.transportation_cost) || 0,

        transportation_exclude:
          Boolean(product.transport_exclude),

        base_mrp:
          Number(product.base_mrp) || 0,

        final_product_cost:
          Number(product.final_product_cost) || 0,

        is_active: Boolean(product.is_active),

        showroom_stock:
          Boolean(product.showroom_stock),

        showroom_stock_number:
          product.showroom_stock_number,

        defect_stock:
          product.defect_stock,

        image_url: imageUrl,

        image_alt_text:
          product.image_alt_text ||
          product.product_name,
      };
    });

    const totalPages =
      total === 0
        ? 0
        : Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error(
      "Plywood & Blockboards API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch plywood and blockboard products",
      },
      {
        status: 500,
      }
    );
  }
}