import { formatResultCount, useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/use-theme';

/** Result count plus a "Clear all" link when any filter is active. */
export function ResultsMeta() {
  const { results, hasActiveFilters, reset } = useProductSearch();
  const { colors, spacing, text } = useTheme();

  return (
    <View style={[styles.row, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
      <Text style={[text.caption, { color: colors.textSecondary }]} accessibilityLiveRegion="polite">
        {formatResultCount(results.length)}
      </Text>
      {hasActiveFilters && (
        <Pressable onPress={reset} hitSlop={8} accessibilityRole="button">
          <Text style={[text.label, { color: colors.primary }]}>Clear all</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
