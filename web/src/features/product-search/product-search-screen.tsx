import { useProductSearch } from '@take-home/shared';
import type { ReactNode } from 'react';
import { CategoryFilter } from '@/components/category-filter';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { ProductList } from '@/components/product-list';
import { ResultsMeta } from '@/components/results-meta';
import { SearchBar } from '@/components/search-bar';

/**
 * The single page of the app. One early return per state, each wrapped in the
 * shared layout, so adding a state is one more `if` rather than a longer ternary.
 */
export function ProductSearchScreen() {
  const { isPending, isError, results } = useProductSearch();

  if (isPending) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <ErrorState />
      </Layout>
    );
  }

  if (results.length === 0) {
    return (
      <Layout>
        <ResultsMeta />
        <EmptyState />
      </Layout>
    );
  }

  return (
    <Layout>
      <ResultsMeta />
      <ProductList />
    </Layout>
  );
}

/** The chrome every state shares: title, search bar and chips. Children fill the results area. */
function Layout({ children }: { children: ReactNode }) {
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
