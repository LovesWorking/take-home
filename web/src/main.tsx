import { setApiBaseUrl, tokensToCssVariables } from '@take-home/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductSearchScreen } from './app/product-search/product-search-screen';
import './styles/global.css';

// Optional override of the mock API URL (defaults to http://localhost:4000).
setApiBaseUrl(import.meta.env.VITE_API_URL);

// Expose the shared design tokens as CSS custom properties before first paint.
// All component CSS reads `var(--color-*)`, `var(--space-*)`, etc.
for (const [name, value] of Object.entries(tokensToCssVariables())) {
  document.documentElement.style.setProperty(name, value);
}

// Dev only. The dynamic import keeps Buoy (and react-native-web) out of the production bundle.
const DevTools = import.meta.env.DEV ? lazy(() => import('./devtools')) : null;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductSearchScreen />
      {DevTools && (
        <Suspense fallback={null}>
          <DevTools />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>,
);
