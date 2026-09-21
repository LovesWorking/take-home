import { LegendList, type LegendListRenderItemProps } from '@legendapp/list/react-native';
import { useProductSearch, type Product } from '@take-home/shared';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/product-card';
import { useTheme } from '@/theme/use-theme';

const renderItem = ({ item }: LegendListRenderItemProps<Product>) => (
  <ProductCard product={item} />
);

export function ProductList() {
  const { results } = useProductSearch();
  const { spacing } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <LegendList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      recycleItems
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        paddingHorizontal: spacing.lg,
        paddingBottom: insets.bottom + spacing.xl,
      }}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
    />
  );
}
