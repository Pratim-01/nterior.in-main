import type { RowDataPacket } from "mysql2/promise";
import kayapalatDb from "@/lib/kayapalat-db";

// -----------------------------------------------------------------------
// Turns a typed search term into the real filter selections it implies —
// "ply greenply" resolves to subCategory=["Plywood"], brand=["Greenply"],
// the same as if the visitor had clicked those checkboxes by hand. "ply
// 6mm" resolves to subCategory=["Plywood"], thickness=["6mm"].
//
// The raw term is left untouched in `?q=` regardless of what resolves —
// it keeps driving the free-text fallback (buildSearchClause in
// product-query.ts) and the "Search results for ..." heading either way,
// so a word that doesn't match any known sub-category/brand/thickness/
// grade (a specific product name, a typo) still searches exactly as
// before. This is purely additive UI precision on top of that.
// -----------------------------------------------------------------------

export interface SearchVocabulary {
  subCategory: string[];
  brand: string[];
  category: string[];
  thickness: string[];
  grade: string[];
}

export interface ResolvedSearchFilters {
  subCategory: string[];
  brand: string[];
  category: string[];
  thickness: string[];
  grade: string[];
}

// Distinct catalogue-wide vocabulary rarely changes, and every search
// submission would otherwise cost 5 extra queries — cache it in memory for
// a couple of minutes per server instance. Worst case (a brand-new brand/
// sub-category typed the same minute it's added) just falls through to
// the free-text search, which still works on its own.
let cache: { vocab: SearchVocabulary; expiresAt: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000;

async function distinctColumnValues(column: string): Promise<string[]> {
  const [rows] = await kayapalatDb.query<RowDataPacket[]>(
    `SELECT DISTINCT \`${column}\` AS value
     FROM product_details
     WHERE is_active = 1 AND \`${column}\` IS NOT NULL AND \`${column}\` <> ''`
  );
  // Shortest-first so an ambiguous prefix (rare, but possible as the
  // catalogue grows) resolves to the closer/more general match.
  return rows
    .map((r) => String(r.value))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}

export async function fetchSearchVocabulary(): Promise<SearchVocabulary> {
  if (cache && cache.expiresAt > Date.now()) return cache.vocab;

  const [subCategory, brand, category, thickness, grade] = await Promise.all([
    distinctColumnValues("sub_category"),
    distinctColumnValues("brand"),
    distinctColumnValues("category"),
    distinctColumnValues("thickness"),
    distinctColumnValues("grade"),
  ]);

  const vocab: SearchVocabulary = { subCategory, brand, category, thickness, grade };
  cache = { vocab, expiresAt: Date.now() + CACHE_TTL_MS };
  return vocab;
}

/**
 * Resolves each word of `q` against the vocabulary, in priority order:
 * thickness/grade first (exact match only — "18mm", "MR", short codes
 * that shouldn't fuzzy-match), then sub-category, then brand, then
 * category (prefix match — "ply" -> "Plywood"). A word stops at its first
 * match; a word matching nothing is simply left out (the raw term still
 * carries it via `q`). Prefix matching only kicks in at 3+ characters so
 * a stray single letter can't blanket-select every value that starts
 * with it.
 */
export function resolveSearchFilters(
  q: string,
  vocab: SearchVocabulary
): ResolvedSearchFilters {
  const words = q.split(/\s+/).filter(Boolean).slice(0, 6);
  const lower = (s: string) => s.toLowerCase();

  const result: ResolvedSearchFilters = {
    subCategory: [],
    brand: [],
    category: [],
    thickness: [],
    grade: [],
  };

  const add = (key: keyof ResolvedSearchFilters, value: string) => {
    if (!result[key].includes(value)) result[key].push(value);
  };

  for (const word of words) {
    const w = lower(word);

    const exactThickness = vocab.thickness.find((v) => lower(v) === w);
    if (exactThickness) {
      add("thickness", exactThickness);
      continue;
    }

    const exactGrade = vocab.grade.find((v) => lower(v) === w);
    if (exactGrade) {
      add("grade", exactGrade);
      continue;
    }

    if (w.length < 3) continue;

    const subCategoryMatch = vocab.subCategory.find((v) => lower(v).startsWith(w));
    if (subCategoryMatch) {
      add("subCategory", subCategoryMatch);
      continue;
    }

    const brandMatch = vocab.brand.find((v) => lower(v).startsWith(w));
    if (brandMatch) {
      add("brand", brandMatch);
      continue;
    }

    const categoryMatch = vocab.category.find((v) => lower(v).startsWith(w));
    if (categoryMatch) {
      add("category", categoryMatch);
      continue;
    }
  }

  return result;
}