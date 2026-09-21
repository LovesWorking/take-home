/** A Pokémon listing as returned by `GET /api/products`. Both platforms render from this shape. */
export interface Product {
  /** Zero-padded National Pokédex number, e.g. "025". Unique. */
  id: string;
  number: number;
  name: string;
  /** Pokédex genus, e.g. "Mouse Pokémon". */
  species: string;
  /** Primary type. Drives the category filter chips. */
  category: string;
  /** All types, primary first. */
  types: string[];
  /** Price in US dollars. */
  price: number;
  /** Average rating from 0 to 5. */
  rating: number;
  reviewCount: number;
  /** Pokédex flavor text. */
  description: string;
  /** Official artwork (PNG with transparent background). */
  imageUrl: string;
  heightM: number;
  weightKg: number;
  /** Extra searchable keywords: abilities, "Legendary". */
  tags: string[];
  inStock: boolean;
}

/** Everything needed to compute a result set. Add new filter dimensions here. */
export interface ProductFilters {
  /** Free-text query. Empty means "no text filter". */
  query: string;
  /** Selected categories (primary types). Empty means "all". */
  categories: readonly string[];
}
