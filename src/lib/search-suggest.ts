import type { RowDataPacket } from "mysql2/promise";
import kayapalatDb from "@/lib/kayapalat-db";

// -----------------------------------------------------------------------
// Powers the autocomplete dropdown under the navbar search box. Instead of
// a hand-maintained keyword list, suggestions are mined from your actual
// catalog: every product name is broken into 2- and 3-word phrases ("door
// lock", "digital door lock"), each sub-category is added as a phrase on
// its own, and everything is ranked by how often it occurs. So this gets
// richer and more relevant automatically as real inventory (and cleaner
// product names) replace the current mix of test data.
// -----------------------------------------------------------------------

const STOPWORDS = new Set([
  "with", "for", "and", "the", "pack", "set", "kit", "size", "grade",
]);

interface CorpusEntry {
  phrase: string;
  count: number;
}

let cache: { corpus: CorpusEntry[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

function meaningfulTokens(text: string): string[] {
  return text
    .split(/[^a-zA-Z]+/)
    .map((t) => t.toLowerCase())
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

function ngrams(tokens: string[], n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i + n <= tokens.length; i++) {
    out.push(tokens.slice(i, i + n).join(" "));
  }
  return out;
}

async function buildCorpus(): Promise<CorpusEntry[]> {
  const [rows] = await kayapalatDb.query<RowDataPacket[]>(
    `SELECT product_name, sub_category FROM product_details WHERE is_active = 1`
  );

  const counts = new Map<string, number>();
  const bump = (phrase: string) => {
    if (!phrase) return;
    counts.set(phrase, (counts.get(phrase) ?? 0) + 1);
  };

  for (const row of rows) {
    const tokens = meaningfulTokens(String(row.product_name ?? ""));
    ngrams(tokens, 2).forEach(bump);
    ngrams(tokens, 3).forEach(bump);

    const subCategoryTokens = meaningfulTokens(String(row.sub_category ?? ""));
    if (subCategoryTokens.length > 0) bump(subCategoryTokens.join(" "));
  }

  return Array.from(counts.entries())
    .map(([phrase, count]) => ({ phrase, count }))
    .sort((a, b) => b.count - a.count || a.phrase.localeCompare(b.phrase));
}

async function getCorpus(): Promise<CorpusEntry[]> {
  if (cache && cache.expiresAt > Date.now()) return cache.corpus;
  const corpus = await buildCorpus();
  cache = { corpus, expiresAt: Date.now() + CACHE_TTL_MS };
  return corpus;
}

/**
 * Returns up to `limit` suggestion phrases for a typed term — phrases that
 * *start with* what's been typed rank first (the usual autocomplete feel:
 * "door" -> "door lock", "door handle"), phrases that merely contain it as
 * a whole word fill in the rest if there's room.
 */
export async function getSuggestions(q: string, limit = 8): Promise<string[]> {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];

  const corpus = await getCorpus();

  const startsWith: CorpusEntry[] = [];
  const contains: CorpusEntry[] = [];

  for (const entry of corpus) {
    if (entry.phrase === query) continue;
    if (entry.phrase.startsWith(query)) {
      startsWith.push(entry);
    } else if (
      entry.phrase.includes(` ${query}`) ||
      entry.phrase.includes(`${query} `)
    ) {
      contains.push(entry);
    }
  }

  return [...startsWith, ...contains].slice(0, limit).map((e) => e.phrase);
}