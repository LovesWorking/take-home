import { useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/use-theme';

export function EmptyState() {
  const { query, reset } = useProductSearch();
  const { colors, spacing, radius, layout, text } = useTheme();
  const trimmed = query.trim();

  return (
    <View
      accessibilityRole="summary"
      style={[
        styles.container,
        {
          marginHorizontal: spacing.lg,
          padding: spacing.xxl,
          borderRadius: radius.lg,
          borderColor: colors.border,
          gap: spacing.xs,
        },
      ]}
    >
      <Text style={[text.heading, { color: colors.text }]}>No Pokémon found</Text>
      <Text style={[text.body, styles.center, { color: colors.textSecondary }]}>
        {trimmed !== ''
          ? `Nothing matches “${trimmed}” with the current filters.`
          : 'Nothing matches the current filters.'}
      </Text>
      <Pressable
        onPress={reset}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          {
            marginTop: spacing.md,
            height: layout.touchTarget,
            paddingHorizontal: spacing.xl,
            borderRadius: radius.pill,
            backgroundColor: pressed ? colors.primaryPressed : colors.primary,
          },
        ]}
      >
        <Text style={[text.label, { color: colors.textOnPrimary }]}>Clear search and filters</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  center: { textAlign: 'center' },
  button: { justifyContent: 'center' },
});
