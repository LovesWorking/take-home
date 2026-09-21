import { useProductSearch } from '@take-home/shared';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/theme/use-theme';

export function SearchBar() {
  const { query, setQuery } = useProductSearch();
  const { colors, spacing, radius, layout, text } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          height: layout.inputHeight,
          borderRadius: radius.md,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: spacing.md,
        },
      ]}
    >
      <Text style={[styles.icon, { color: colors.textTertiary }]} accessibilityElementsHidden>
        ⌕
      </Text>
      <TextInput
        style={[styles.input, text.body, { color: colors.text }]}
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
          <Text style={{ color: colors.textTertiary, fontSize: 16 }}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: { fontSize: 20, marginRight: 8, marginTop: -2 },
  input: { flex: 1, height: '100%', paddingVertical: 0 },
  clear: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
