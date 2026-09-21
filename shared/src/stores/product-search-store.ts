import { create } from 'zustand';
import { toggleCategory } from '../products';

/**
 * Search + filter state, shared by every component on the product search
 * screen. Living in a store (instead of `useState`) is what lets the search
 * bar, the chips and the results list each call `useProductSearch()` on
 * their own and still see the same query and selection.
 */
interface ProductSearchState {
  query: string;
  selectedCategories: string[];
  setQuery: (query: string) => void;
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  reset: () => void;
}

export const useProductSearchStore = create<ProductSearchState>((set) => ({
  query: '',
  selectedCategories: [],
  setQuery: (query) => set({ query }),
  toggleCategory: (category) =>
    set((state) => ({ selectedCategories: toggleCategory(state.selectedCategories, category) })),
  clearCategories: () => set({ selectedCategories: [] }),
  reset: () => set({ query: '', selectedCategories: [] }),
}));
