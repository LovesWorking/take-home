import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api/endpoints';
import { queryKeys } from '../lib/api/query-keys';
import type { Product } from './types';

// Stale time
const FiveMinutes = 5 * 60 * 1000;

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${url}`);
  // Check for valid JSON
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Invalid content type: ${contentType}`);
  }
  return res.json();
}

export function fetchProducts(): Promise<Product[]> {
  return getJson<Product[]>(api.products.retrieveAll());
}

export function fetchProduct(id: string): Promise<Product> {
  return getJson<Product>(api.products.retrieve(id));
}

/**
 * Loads the product catalog with React Query.
 *
 * `retryOnMount: false` matters because several components subscribe to this
 * query, and some of them (e.g. the error state) only mount *after* it has
 * failed. Without it, each of those mounts would kick off a fresh fetch,
 * flip the query back to pending, unmount the error state, fail again, and
 * loop forever. Recovery is explicit via `refetch` (the "Try again" button).
 */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.all(),
    queryFn: fetchProducts,
    staleTime: FiveMinutes,
  });
}

/** Loads one product by Pokédex id, e.g. for a future detail screen. */
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: FiveMinutes,
  });
}
