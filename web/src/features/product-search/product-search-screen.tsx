import { useProductSearch } from '@take-home/shared';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { ProductList } from '@/components/product-list';
import { ResultsMeta } from '@/components/results-meta';
import { ProductSearchLayout } from './product-search-layout';

/**
 * The single page of the app. One early return per state, each wrapped in the
 * shared layout, so adding a state is one more `if` rather than a longer ternary.
 */
export function ProductSearchScreen() {
  const { isPending, isError, results } = useProductSearch();

  if (isPending) {
    return (
      <ProductSearchLayout>
        <LoadingState />
      </ProductSearchLayout>
    );
  }

  if (isError) {
    return (
      <ProductSearchLayout>
        <ErrorState />
      </ProductSearchLayout>
    );
  }

  if (results.length === 0) {
    return (
      <ProductSearchLayout>
        <ResultsMeta />
        <EmptyState />
      </ProductSearchLayout>
    );
  }

  return (
    <ProductSearchLayout>
      <ResultsMeta />
      <ProductList />
    </ProductSearchLayout>
  );
}
