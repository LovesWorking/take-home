import { useProductSearch } from '@take-home/shared';

export function SearchBar() {
  const { query, setQuery } = useProductSearch();

  return (
    <div className="search" role="search">
      <label htmlFor="product-search" className="visually-hidden">
        Search Pokémon
      </label>
      <svg
        className="search__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id="product-search"
        className="search__input"
        type="search"
        inputMode="search"
        autoComplete="off"
        placeholder="Search Pokémon"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query !== '' && (
        <button
          type="button"
          className="search__clear"
          onClick={() => setQuery('')}
          aria-label="Clear search"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
