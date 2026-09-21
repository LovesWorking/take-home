import { setApiBaseUrl } from '@take-home/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';
import { applyTheme, getSystemColorScheme } from './theme/apply-theme';

// Optional override of the mock API URL (defaults to http://localhost:4000).
setApiBaseUrl(import.meta.env.VITE_API_URL);

// Apply design tokens before the first paint so there is no flash of unstyled content.
applyTheme(getSystemColorScheme());

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
