const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return usd.format(price);
}

/** "#025" style National Pokédex number. */
export function formatNumber(number: number): string {
  return `#${String(number).padStart(3, '0')}`;
}

/** "4.6" style rating label with one decimal place. */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatReviewCount(count: number): string {
  return count === 1 ? '1 review' : `${count.toLocaleString('en-US')} reviews`;
}

export function formatResultCount(count: number): string {
  return `${count} Pokémon`;
}

/** "0.4 m · 6 kg" */
export function formatSize(heightM: number, weightKg: number): string {
  return `${heightM} m · ${weightKg} kg`;
}
