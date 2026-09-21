import { useProductSearch } from '@take-home/shared';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryFilter } from '@/components/category-filter';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { ProductList } from '@/components/product-list';
import { ResultsMeta } from '@/components/results-meta';
import { SearchBar } from '@/components/search-bar';
import { useTheme } from '@/theme/use-theme';

/**
 * The single screen of the app. One early return per state, each wrapped in the
 * shared layout, so adding a state is one more `if` rather than a longer ternary.
 */
export function ProductSearchScreen() {
  const { isPending, isError, results } = useProductSearch();

  if (isPending) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <ErrorState />
      </Layout>
    );
  }

  if (results.length === 0) {
    return (
      <Layout>
        <ResultsMeta />
        <EmptyState />
      </Layout>
    );
  }

  return (
    <Layout>
      <ResultsMeta />
      <ProductList />
    </Layout>
  );
}

/** The chrome every state shares: title, search bar and chips. Children fill the rest. */
function Layout({ children }: { children: ReactNode }) {
  const { colors, spacing, text } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={{ paddingTop: insets.top + spacing.md, gap: spacing.md }}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <Text style={[text.title, { color: colors.text }]}>Pokémon</Text>
          <Text style={[text.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Search the Pokédex and filter by type.
          </Text>
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SearchBar />
        </View>

        <CategoryFilter />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
