import {
  colors,
  formatNumber,
  formatPrice,
  formatRating,
  formatReviewCount,
  formatSize,
  radius,
  shadow,
  spacing,
  typography,
  type Product,
} from '@take-home/shared';
import { Image, StyleSheet, Text, View } from 'react-native';

export function ProductCard({ product }: { product: Product }) {
  return (
    <View
      accessible
      accessibilityLabel={`${product.name}, ${formatPrice(product.price)}, rated ${formatRating(product.rating)} out of 5`}
      style={styles.card}
    >
      <View style={styles.media}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="contain" />
        <Text style={styles.number}>{formatNumber(product.number)}</Text>
      </View>

      <View style={styles.badges}>
        {product.types.map((type) => (
          <View key={type} style={styles.badge}>
            <Text style={styles.badgeText}>{type}</Text>
          </View>
        ))}
        {!product.inStock && <Text style={styles.outOfStock}>Out of stock</Text>}
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.meta}>
        {product.species} · {formatSize(product.heightM, product.weightKg)}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.rating}>
          <Text style={styles.star}>★ </Text>
          {formatRating(product.rating)} · {formatReviewCount(product.reviewCount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: shadow.card.color,
    shadowOpacity: shadow.card.opacity,
    shadowRadius: shadow.card.radius,
    shadowOffset: { width: 0, height: shadow.card.offsetY },
    elevation: 2,
  },
  media: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.badge,
  },
  image: { width: 120, height: 120 },
  number: {
    ...typography.label,
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    color: colors.textTertiary,
  },
  badges: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm },
  badge: {
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.badge,
  },
  badgeText: { ...typography.label, color: colors.badgeText },
  outOfStock: { ...typography.label, color: colors.danger },
  name: { ...typography.heading, color: colors.text },
  meta: { ...typography.caption, color: colors.textSecondary },
  description: { ...typography.body, color: colors.textSecondary },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  price: { ...typography.heading, color: colors.text },
  rating: { ...typography.caption, color: colors.textSecondary },
  star: { color: colors.star },
});
