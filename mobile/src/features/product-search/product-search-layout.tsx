import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';
import { useTheme } from '@/theme/use-theme';

/**
 * The chrome every state of the screen shares: title, search bar and chips.
 * Whatever is passed as children fills the remaining space below.
 */
export function ProductSearchLayout({ children }: { children: ReactNode }) {
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
