import { formatResultCount, useProductSearch } from '@take-home/shared';

/** Result count plus a "Clear all" link when any filter is active. */
export function ResultsMeta() {
  const { results, hasActiveFilters, reset } = useProductSearch();

  return (
    <div className="results__meta" aria-live="polite">
      <span>{formatResultCount(results.length)}</span>
      {hasActiveFilters && (
        <button type="button" className="results__reset" onClick={reset}>
          Clear all
        </button>
      )}
    </div>
  );
}
