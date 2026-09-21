import { colors, formatResultCount, spacing, typography, useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/** Result count plus a "Clear all" link when any filter is active. */
export function ResultsMeta() {
  const { results, hasActiveFilters, reset } = useProductSearch();

  return (
    <View style={styles.row}>
      <Text style={styles.count} accessibilityLiveRegion="polite">
        {formatResultCount(results.length)}
      </Text>
      {hasActiveFilters && (
        <Pressable onPress={reset} hitSlop={8} accessibilityRole="button">
          <Text style={styles.action}>Clear all</Text>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  count: { ...typography.caption, color: colors.textSecondary },
  action: { ...typography.label, color: colors.primary },
});
