import { useProductSearch } from '@take-home/shared';

export function EmptyState() {
  const { query, reset } = useProductSearch();
  const trimmed = query.trim();

  return (
    <div className="empty" role="status">
      <p className="empty__title">No Pokémon found</p>
      <p style={{ margin: 0 }}>
        {trimmed !== ''
          ? `Nothing matches “${trimmed}” with the current filters.`
          : 'Nothing matches the current filters.'}
      </p>
      <button type="button" className="empty__action" onClick={reset}>
        Clear search and filters
      </button>
    </div>
  );
}
