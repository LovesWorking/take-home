import { colors, layout, radius, spacing, typography, useProductSearch } from '@take-home/shared';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

/**
 * Horizontally scrolling multi-select chip row. "All" clears the selection
 * and is highlighted whenever nothing else is selected.
 */
export function CategoryFilter() {
  const { categories, selectedCategories, isCategorySelected, toggleCategory, clearCategories } =
    useProductSearch();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.row}
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
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg },
  chip: {
    justifyContent: 'center',
    height: layout.chipHeight,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.chipBorder,
    backgroundColor: colors.chip,
  },
  chipSelected: { backgroundColor: colors.chipSelected, borderColor: colors.chipSelected },
  chipPressed: { opacity: 0.8 },
  chipText: { ...typography.label, color: colors.chipText },
  chipTextSelected: { color: colors.chipSelectedText },
});
