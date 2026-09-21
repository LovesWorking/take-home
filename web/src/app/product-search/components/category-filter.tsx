import { useProductSearch } from '@take-home/shared';

/**
 * Multi-select chip row. "All" is a convenience that clears the selection;
 * it is highlighted whenever nothing else is selected.
 */
export function CategoryFilter() {
  const { categories, selectedCategories, isCategorySelected, toggleCategory, clearCategories } =
    useProductSearch();

  return (
    <ul className="chips" aria-label="Filter by type">
      <li>
        <button
          type="button"
          className="chip"
          aria-pressed={selectedCategories.length === 0}
          onClick={clearCategories}
        >
          All
        </button>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <button
            type="button"
            className="chip"
            aria-pressed={isCategorySelected(category)}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}
