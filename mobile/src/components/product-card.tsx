import {
  formatNumber,
  formatPrice,
  formatRating,
  formatReviewCount,
  formatSize,
  type Product,
} from '@take-home/shared';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/use-theme';

export function ProductCard({ product }: { product: Product }) {
  const { colors, spacing, radius, text, cardShadow } = useTheme();

  return (
    <View
      accessible
      accessibilityLabel={`${product.name}, ${formatPrice(product.price)}, rated ${formatRating(product.rating)} out of 5`}
      style={[
        styles.card,
        cardShadow,
        {
          gap: spacing.sm,
          padding: spacing.lg,
          borderRadius: radius.lg,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View style={[styles.media, { borderRadius: radius.md, backgroundColor: colors.badge }]}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="contain" />
        <Text
          style={[
            text.label,
            styles.number,
            { color: colors.textTertiary, top: spacing.sm, right: spacing.sm },
          ]}
        >
          {formatNumber(product.number)}
        </Text>
      </View>

      <View style={[styles.row, { gap: spacing.sm, flexWrap: 'wrap' }]}>
        {product.types.map((type) => (
          <View
            key={type}
            style={[
              styles.badge,
              { paddingHorizontal: spacing.sm, borderRadius: radius.sm, backgroundColor: colors.badge },
            ]}
          >
            <Text style={[text.label, { color: colors.badgeText }]}>{type}</Text>
          </View>
        ))}
        {!product.inStock && (
          <Text style={[text.label, { color: colors.danger }]}>Out of stock</Text>
        )}
      </View>

      <Text style={[text.heading, { color: colors.text }]}>{product.name}</Text>
      <Text style={[text.caption, { color: colors.textSecondary }]}>
        {product.species} · {formatSize(product.heightM, product.weightKg)}
      </Text>
      <Text style={[text.body, { color: colors.textSecondary }]} numberOfLines={2}>
        {product.description}
      </Text>

      <View style={[styles.row, styles.footer, { paddingTop: spacing.sm }]}>
        <Text style={[text.heading, { color: colors.text }]}>{formatPrice(product.price)}</Text>
        <Text style={[text.caption, { color: colors.textSecondary }]}>
          <Text style={{ color: colors.star }}>★ </Text>
          {formatRating(product.rating)} · {formatReviewCount(product.reviewCount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth },
  media: { height: 140, alignItems: 'center', justifyContent: 'center' },
  image: { width: 120, height: 120 },
  number: { position: 'absolute' },
  row: { flexDirection: 'row', alignItems: 'center' },
  footer: { justifyContent: 'space-between' },
  badge: { height: 22, justifyContent: 'center' },
});
