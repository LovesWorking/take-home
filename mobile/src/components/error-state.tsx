import { colors, spacing, typography, useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function ErrorState() {
  const { error, refetch } = useProductSearch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Couldn’t load Pokémon</Text>
      <Text style={styles.body}>{error?.message}</Text>
      <Pressable onPress={() => refetch()} hitSlop={8} accessibilityRole="button">
        <Text style={styles.action}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.sm, alignItems: 'center' },
  title: { ...typography.heading, color: colors.text },
  body: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
  action: { ...typography.label, color: colors.primary },
});
