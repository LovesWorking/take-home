import { colors, layout, radius, spacing, typography, useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  const { query, reset } = useProductSearch();
  const trimmed = query.trim();

  return (
    <View accessibilityRole="summary" style={styles.container}>
      <Text style={styles.title}>No Pokémon found</Text>
      <Text style={styles.body}>
        {trimmed !== ''
          ? `Nothing matches “${trimmed}” with the current filters.`
          : 'Nothing matches the current filters.'}
      </Text>
      <Pressable
        onPress={reset}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Clear search and filters</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
    marginHorizontal: spacing.lg,
    padding: spacing.xxl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  title: { ...typography.heading, color: colors.text },
  body: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  button: {
    justifyContent: 'center',
    marginTop: spacing.md,
    height: layout.touchTarget,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  buttonPressed: { backgroundColor: colors.primaryPressed },
  buttonText: { ...typography.label, color: colors.textOnPrimary },
});
