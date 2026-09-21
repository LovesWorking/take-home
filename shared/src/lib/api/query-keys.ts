/**
 * React Query Key Factory
 *
 * Hierarchical query keys for cache management.
 * Pattern: domain → action → params
 *
 * Every key under a domain starts with that domain's `root()`, so
 * `queryClient.invalidateQueries({ queryKey: queryKeys.products.root() })`
 * invalidates the list, every detail query, and anything added later.
 *
 * @example
 * queryKeys.products.all()        // ['products', 'all']
 * queryKeys.products.detail('025') // ['products', 'detail', '025']
 */

export const queryKeys = {
  products: {
    root: () => ['products'] as const,
    all: () => [...queryKeys.products.root(), 'all'] as const,
    detail: (id: string) => [...queryKeys.products.root(), 'detail', id] as const,
  },
} as const;
