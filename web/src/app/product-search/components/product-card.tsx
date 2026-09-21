import {
  formatNumber,
  formatPrice,
  formatRating,
  formatReviewCount,
  formatSize,
  type Product,
} from '@take-home/shared';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card" aria-label={product.name}>
      <div className="card__media">
        <img
          className="card__image"
          src={product.imageUrl}
          alt=""
          loading="lazy"
          width="120"
          height="120"
        />
        <span className="card__number">{formatNumber(product.number)}</span>
      </div>
      <div className="card__badges">
        {product.types.map((type) => (
          <span key={type} className="badge">
            {type}
          </span>
        ))}
        {!product.inStock && <span className="badge badge--danger">Out of stock</span>}
      </div>
      <h2 className="card__name">{product.name}</h2>
      <p className="card__brand">
        {product.species} · {formatSize(product.heightM, product.weightKg)}
      </p>
      <p className="card__description">{product.description}</p>
      <div className="card__footer">
        <span className="card__price">{formatPrice(product.price)}</span>
        <span
          className="card__rating"
          aria-label={`Rated ${formatRating(product.rating)} out of 5, ${formatReviewCount(product.reviewCount)}`}
        >
          <span className="card__star" aria-hidden="true">
            ★
          </span>
          {formatRating(product.rating)}
          <span aria-hidden="true">·</span>
          {formatReviewCount(product.reviewCount)}
        </span>
      </div>
    </article>
  );
}
