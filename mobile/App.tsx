import { setApiBaseUrl } from '@take-home/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductSearchScreen } from '@/features/product-search/product-search-screen';
import { useTheme } from '@/theme/use-theme';

// The mock API runs on the Mac. iOS simulator reaches it on localhost (the default);
// the Android emulator needs 10.0.2.2; a physical device needs your LAN IP via
// EXPO_PUBLIC_API_URL in mobile/.env.local.
setApiBaseUrl(
  process.env.EXPO_PUBLIC_API_URL ?? Platform.select({ android: 'http://10.0.2.2:4000' }),
);

const queryClient = new QueryClient();

export default function App() {
  const { scheme } = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <ProductSearchScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
