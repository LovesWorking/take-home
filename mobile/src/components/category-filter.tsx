import { useProductSearch } from '@take-home/shared';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/theme/use-theme';

/**
 * Horizontally scrolling multi-select chip row. "All" clears the selection
 * and is highlighted whenever nothing else is selected.
 */
export function CategoryFilter() {
  const { categories, selectedCategories, isCategorySelected, toggleCategory, clearCategories } =
    useProductSearch();
  const { spacing } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.row, { gap: spacing.sm, paddingHorizontal: spacing.lg }]}
      accessibilityLabel="Filter by type"
    >
      <Chip label="All" selected={selectedCategories.length === 0} onPress={clearCategories} />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          selected={isCategorySelected(category)}
          onPress={() => toggleCategory(category)}
        />
      ))}
    </ScrollView>
  );
}

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors, spacing, radius, layout, text } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        {
          height: layout.chipHeight,
          paddingHorizontal: spacing.lg,
          borderRadius: radius.pill,
          backgroundColor: selected ? colors.chipSelected : colors.chip,
          borderColor: selected ? colors.chipSelected : colors.chipBorder,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={[text.label, { color: selected ? colors.chipSelectedText : colors.chipText }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center' },
  chip: {
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
