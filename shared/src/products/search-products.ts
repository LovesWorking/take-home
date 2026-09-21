import type { Product, ProductFilters } from './types';

/**
 * Lowercases, strips diacritics ("Café" -> "cafe") and collapses whitespace so
 * matching is forgiving of how the user typed the query.
 */
export function normalizeText(input: string): string {
  return input.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

/** Splits a query into normalized, non-empty search terms. */
export function tokenizeQuery(query: string): string[] {
  const normalized = normalizeText(query);
  return normalized === '' ? [] : normalized.split(' ');
}

/** The text a product is matched against. Computed once per product per search. */
function searchableText(product: Product): string {
  return normalizeText(
    [
      product.name,
      product.id,
      product.species,
      product.description,
      ...product.types,
      ...product.tags,
    ].join(' '),
  );
}

/**
 * Every term must appear somewhere in the product ("AND" semantics), so
 * "fire flying" narrows rather than widens the result set.
 */
export function matchesQuery(product: Product, terms: readonly string[]): boolean {
  if (terms.length === 0) return true;
  const haystack = searchableText(product);
  return terms.every((term) => haystack.includes(term));
}

export function matchesCategories(product: Product, categories: readonly string[]): boolean {
  return categories.length === 0 || categories.includes(product.category);
}

/**
 * Pure function at the heart of the feature. Given the catalog and the current
 * filters, returns the products to display, preserving catalog order.
 *
 * Both platforms call this (through `useProductSearch`) so the results are
 * guaranteed identical for the same input.
 */
export function searchProducts(catalog: readonly Product[], filters: ProductFilters): Product[] {
  const terms = tokenizeQuery(filters.query);
  return catalog.filter(
    (product) => matchesCategories(product, filters.categories) && matchesQuery(product, terms),
  );
}

/**
 * Distinct primary types present in the catalog, in alphabetical order.
 * Deriving from data (instead of a hard-coded list) means adding a Pokémon
 * with a new type automatically adds a filter chip on both platforms.
 */
export function getCategories(catalog: readonly Product[]): string[] {
  return [...new Set(catalog.map((p) => p.category))].sort((a, b) => a.localeCompare(b));
}

/** Returns a copy of `categories` with `category` added or removed. */
export function toggleCategory(categories: readonly string[], category: string): string[] {
  return categories.includes(category)
    ? categories.filter((c) => c !== category)
    : [...categories, category];
}
