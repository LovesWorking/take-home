import { LegendList, type LegendListRenderItemProps } from '@legendapp/list/react-native';
import { spacing, useProductSearch, type Product } from '@take-home/shared';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from './product-card';

const renderItem = ({ item }: LegendListRenderItemProps<Product>) => (
  <ProductCard product={item} />
);

const Separator = () => <View style={{ height: spacing.md }} />;

export function ProductList() {
  const { results } = useProductSearch();
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
      ItemSeparatorComponent={Separator}
    />
  );
}
