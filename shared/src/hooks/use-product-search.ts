import { getCategories, searchProducts, useProducts } from '../products';
import { useProductSearchStore } from '../stores/product-search-store';

/**
 * The one hook a product search component needs: loads the catalog, reads the
 * shared search + filter state, and derives the results.
 *
 * Safe to call from as many components as you like. The catalog comes from the
 * React Query cache (one request, shared) and the filter state from the store,
 * so every caller sees the same thing.
 *
 * Filtering runs on every render. The catalog is small and local, so that is
 * microseconds; if it ever grows or moves server-side, this is the one file to change.
 */
export function useProductSearch() {
  const { data: catalog = [], isPending, isError, error, refetch } = useProducts();
  const { query, selectedCategories, setQuery, toggleCategory, clearCategories, reset } =
    useProductSearchStore();

  return {
    // Loading state
    isPending,
    isError,
    error,
    refetch,

    // Search + filter state
    query,
    setQuery,
    categories: getCategories(catalog),
    selectedCategories,
    isCategorySelected: (category: string) => selectedCategories.includes(category),
    toggleCategory,
    clearCategories,
    reset,
    hasActiveFilters: query.trim() !== '' || selectedCategories.length > 0,

    // Derived
    results: searchProducts(catalog, { query, categories: selectedCategories }),
  };
}
