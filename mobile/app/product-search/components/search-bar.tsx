import { colors, layout, radius, spacing, typography, useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function SearchBar() {
  const { query, setQuery } = useProductSearch();

  return (
    <View style={styles.container}>
      <Text style={styles.icon} accessibilityElementsHidden>
        ⌕
      </Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search Pokémon"
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        returnKeyType="search"
        accessibilityLabel="Search Pokémon"
      />
      {query !== '' && (
        <Pressable
          onPress={() => setQuery('')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={({ pressed }) => [
            styles.clear,
            { backgroundColor: pressed ? colors.badge : 'transparent' },
          ]}
        >
          <Text style={styles.clearIcon}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: layout.inputHeight,
    paddingHorizontal: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  icon: { fontSize: 20, marginRight: spacing.sm, marginTop: -2, color: colors.textTertiary },
  input: { ...typography.body, flex: 1, height: '100%', paddingVertical: 0, color: colors.text },
  clear: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: { fontSize: 16, color: colors.textTertiary },
});
