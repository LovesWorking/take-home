import { getApiBaseUrl } from './config';

/**
 * API Endpoint Store
 *
 * Every URL the apps call, in one place. Pattern: domain → action → params.
 * The base URL comes from `config.ts` so callers never pass it around.
 *
 * @example
 * api.products.retrieveAll()   // 'http://localhost:4000/api/products'
 * api.products.retrieve('025') // 'http://localhost:4000/api/products/025'
 */

export const api = {
  products: {
    retrieveAll: () => `${getApiBaseUrl()}/api/products`,
    retrieve: (id: string) => `${getApiBaseUrl()}/api/products/${encodeURIComponent(id)}`,
  },
} as const;
