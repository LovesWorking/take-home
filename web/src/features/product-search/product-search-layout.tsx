import type { ReactNode } from 'react';
import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';

/**
 * The chrome every state of the screen shares: title, search bar and chips.
 * Whatever is passed as children fills the results area.
 */
export function ProductSearchLayout({ children }: { children: ReactNode }) {
  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">Pokémon</h1>
        <p className="page__subtitle">Search the Pokédex and filter by type.</p>
      </header>

      <div className="page__controls">
        <SearchBar />
        <CategoryFilter />
      </div>

      <section aria-label="Results">{children}</section>
    </main>
  );
}
