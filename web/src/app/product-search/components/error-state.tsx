import { useProductSearch } from '@take-home/shared';

export function ErrorState() {
  const { error, refetch } = useProductSearch();

  return (
    <div className="empty" role="alert">
      <p className="empty__title">Couldn’t load Pokémon</p>
      <p style={{ margin: 0 }}>{error?.message}</p>
      <button type="button" className="empty__action" onClick={() => refetch()}>
        Try again
      </button>
    </div>
  );
}
