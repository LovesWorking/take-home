import { ProductSearchScreen } from './features/product-search/product-search-screen';
import { useSystemTheme } from './theme/apply-theme';

export function App() {
  useSystemTheme();
  return <ProductSearchScreen />;
}
