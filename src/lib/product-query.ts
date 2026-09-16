import type { RowDataPacket } from "mysql2/promise";
import kayapalatDb from "@/lib/kayapalat-db";
import { ParsedProductQuery } from "@/lib/product-query-params";
import {
  FACET_KEYS,
  FacetKey,
  FacetOption,
  Facets,
  Pagination,
  PriceRange,
  Product,
  ProductsResponse,
  SortOption,
} from "@/types/products";

// -----------------------------------------------------------------------
// Every facet key maps to a real, whitelisted column name on
// `product_details`. Values coming from the user (filter selections) are
// ALWAYS sent as parameterized query values (`?`), never concatenated into
// SQL — only these whitelisted column identifiers are ever interpolated
// into the query string. This is what keeps the query builder both fully
// dynamic (new brands/sizes/grades/categories just work, for every
// category in the store) and safe from SQL injection.
// -----------------------------------------------------------------------
const FACET_COLUMNS: Record<FacetKey, string> = {
  category: "category",
  subCategory: "sub_category",   // ← add this line
  brand: "brand",
  productType: "product_type",
  size: "size",
  thickness: "thickness",
  grade: "grade",
};

function sortColumns(alias: string): Record<SortOption, string> {
  const c = (name: string) => `${alias}\`${name}\``;
  return {
    newest: `${c("created_at")} DESC, ${c("product_id")} DESC`,
    "price-low": `${c("sell_mrp")} ASC, ${c("product_id")} ASC`,
    "price-high": `${c("sell_mrp")} DESC, ${c("product_id")} ASC`,
    "name-asc": `${c("product_name")} ASC, ${c("product_id")} ASC`,
    "name-desc": `${c("product_name")} DESC, ${c("product_id")} ASC`,
  };
}

interface WhereClause {
  sql: string;
  params: (string | number)[];
}

/**
 * Builds a `WHERE ...` clause from every active filter, always scoped to
 * active products. `alias` (e.g. `"pd."`) is prefixed onto every column
 * reference so the same builder works whether the caller queries
 * `product_details` directly (facets, price range) or joins it against
 * `product_images` (the main product page query) — pass `""` for no alias.
 *
 * `excludeFacet` leaves one facet's own filter out — that's what lets that
 * facet's option counts reflect every *other* active filter without also
 * being shrunk by the user's own selection within that facet (standard
 * faceted-search UX: checking one brand shouldn't make every other brand
 * disappear from the list). `includePriceFilter: false` does the same for
 * the price-range query, so a selected price range doesn't collapse the
 * price inputs' bounds.
 */
function buildWhereClause(
  query: ParsedProductQuery,
  options: {
    alias?: string;
    excludeFacet?: FacetKey;
    includePriceFilter?: boolean;
  } = {}
): WhereClause {
  const { alias = "", excludeFacet, includePriceFilter = true } = options;
  const col = (name: string) => `${alias}\`${name}\``;

  const clauses: string[] = [`${col("is_active")} = 1`];
  const params: (string | number)[] = [];

  FACET_KEYS.forEach((key) => {
    if (key === excludeFacet) return;
    const values = query.filters[key];
    if (!values || values.length === 0) return;
    const column = FACET_COLUMNS[key];
    clauses.push(`${col(column)} IN (${values.map(() => "?").join(", ")})`);
    params.push(...values);
  });

  if (includePriceFilter) {
    if (query.minPrice !== null) {
      clauses.push(`${col("sell_mrp")} >= ?`);
      params.push(query.minPrice);
    }
    if (query.maxPrice !== null) {
      clauses.push(`${col("sell_mrp")} <= ?`);
      params.push(query.maxPrice);
    }
  }

  return { sql: `WHERE ${clauses.join(" AND ")}`, params };
}

/** Resolves a stored image path to a fully-qualified URL, same convention
 *  used by the existing kayapalat-products route. */
function resolveImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  const cleanPath = imageUrl.replace(/^\/+/, "").replace(/^product_images\//, "");
  return `${process.env.KAYAPALAT_URL}/product_images/${cleanPath}`;
}

function mapRow(row: RowDataPacket): Product {
  let attributes: Record<string, string | number | boolean | null> = {};
  const raw = row.attributes;
  if (raw) {
    if (typeof raw === "string") {
      try {
        attributes = JSON.parse(raw);
      } catch {
        attributes = {};
      }
    } else if (typeof raw === "object") {
      attributes = raw as Record<string, string | number | boolean | null>;
    }
  }

  return {
    productId: Number(row.productId),
    productName: row.productName,
    category: row.category,
    brand: row.brand ?? null,
    productType: row.productType,
    size: row.size ?? null,
    thickness: row.thickness ?? null,
    grade: row.grade ?? null,
    shortDescription: row.shortDescription ?? null,
    price: Number(row.price) || 0,
    mrp: row.mrp !== null && row.mrp !== undefined ? Number(row.mrp) : null,
    gstPercentage:
      row.gstPercentage !== null && row.gstPercentage !== undefined
        ? Number(row.gstPercentage)
        : null,
    gstExclude: Boolean(row.gstExclude),
    imageUrl: resolveImageUrl(row.imageUrl ?? null),
    imageAltText: row.imageAltText ?? row.productName,
    attributes,
    createdAt: row.createdAt ?? null,
  };
}

/** Runs the paginated products query + the matching total count. */
async function fetchProductsPage(
  query: ParsedProductQuery
): Promise<{ products: Product[]; pagination: Pagination }> {
  const where = buildWhereClause(query, { alias: "pd." });
  const offset = (query.page - 1) * query.pageSize;

  const [rows] = await kayapalatDb.query<RowDataPacket[]>(
    `SELECT
       pd.product_id        AS productId,
       pd.product_name      AS productName,
       pd.category          AS category,
       pd.brand             AS brand,
       pd.product_type      AS productType,
       pd.size              AS size,
       pd.thickness         AS thickness,
       pd.grade             AS grade,
       pd.short_description AS shortDescription,
       pd.sell_mrp          AS price,
       pd.mrp               AS mrp,
       pd.gst_percentage    AS gstPercentage,
       pd.gst_exclude       AS gstExclude,
       pd.attributes        AS attributes,
       pd.created_at        AS createdAt,
       pi.image_url         AS imageUrl,
       pi.image_alt_text    AS imageAltText
     FROM product_details pd
     LEFT JOIN product_images pi
       ON pd.product_id = pi.product_id
       AND pi.is_primary = 1
     ${where.sql}
     ORDER BY ${sortColumns("pd.")[query.sort]}
     LIMIT ? OFFSET ?`,
    [...where.params, query.pageSize, offset]
  );

  const [countRows] = await kayapalatDb.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM product_details pd ${where.sql}`,
    where.params
  );

  const totalItems = Number(countRows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalItems / query.pageSize));

  return {
    products: rows.map(mapRow),
    pagination: { page: query.page, pageSize: query.pageSize, totalItems, totalPages },
  };
}

/**
 * Builds every filter group with live counts, one `GROUP BY` query per
 * facet. Nothing here is hardcoded per category — a brand, size,
 * thickness, or grade value that only exists in the database shows up
 * automatically, and one that no longer matches any row (given the other
 * active filters) simply doesn't appear. This is what lets one listing
 * page serve every category in the store.
 */
async function fetchFacets(query: ParsedProductQuery): Promise<Facets> {
  const entries = await Promise.all(
    FACET_KEYS.map(async (key) => {
      const column = FACET_COLUMNS[key];
      const where = buildWhereClause(query, { excludeFacet: key });
      const notEmpty = `\`${column}\` IS NOT NULL AND \`${column}\` <> ''`;
      const whereSql = `${where.sql} AND ${notEmpty}`;

      const [rows] = await kayapalatDb.query<RowDataPacket[]>(
        `SELECT \`${column}\` AS value, COUNT(*) AS count
         FROM product_details
         ${whereSql}
         GROUP BY \`${column}\`
         ORDER BY count DESC, value ASC`,
        where.params
      );

      const options: FacetOption[] = rows.map((r) => ({
        value: String(r.value),
        label: String(r.value),
        count: Number(r.count),
      }));

      return [key, options] as const;
    })
  );

  return Object.fromEntries(entries) as Facets;
}

/** Min/max price across the products matching every filter *except* price,
 *  so the price inputs' bounds reflect the rest of the current selection. */
async function fetchPriceRange(query: ParsedProductQuery): Promise<PriceRange> {
  const where = buildWhereClause(query, { includePriceFilter: false });

  const [rows] = await kayapalatDb.query<RowDataPacket[]>(
    `SELECT MIN(\`sell_mrp\`) AS min, MAX(\`sell_mrp\`) AS max
     FROM product_details
     ${where.sql}`,
    where.params
  );

  const row = rows[0] ?? {};
  return {
    min: row.min !== null && row.min !== undefined ? Number(row.min) : 0,
    max: row.max !== null && row.max !== undefined ? Number(row.max) : 0,
  };
}

/**
 * The single entry point /api/products calls. Runs the page query, the
 * facet queries, and the price-range query, and assembles the full
 * response the frontend needs — products, pagination, dynamic filter
 * options (with counts), and price bounds. Everything here scales the same
 * way whether `product_details` has a dozen rows or 100,000+, because the
 * database does the filtering, sorting, counting, and paging — never the
 * browser. This one function serves every category in the store: plywood,
 * tiles, paints, electricals, furniture, whatever `category` values exist.
 */
export async function fetchProducts(
  query: ParsedProductQuery
): Promise<ProductsResponse> {
  const [{ products, pagination }, facets, priceRange] = await Promise.all([
    fetchProductsPage(query),
    fetchFacets(query),
    fetchPriceRange(query),
  ]);

  return { products, pagination, facets, priceRange };
}
