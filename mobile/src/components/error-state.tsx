import { useProductSearch } from '@take-home/shared';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/theme/use-theme';

export function ErrorState() {
  const { error, refetch } = useProductSearch();
  const { colors, spacing, text } = useTheme();

  return (
    <View style={{ padding: spacing.lg, gap: spacing.sm, alignItems: 'center' }}>
      <Text style={[text.heading, { color: colors.text }]}>Couldn’t load Pokémon</Text>
      <Text style={[text.body, { color: colors.textSecondary, textAlign: 'center' }]}>
        {error?.message}
      </Text>
      <Pressable onPress={() => refetch()} hitSlop={8} accessibilityRole="button">
        <Text style={[text.label, { color: colors.primary }]}>Try again</Text>
      </Pressable>
    </View>
  );
}
