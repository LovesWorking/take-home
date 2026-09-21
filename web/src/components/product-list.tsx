import { useProductSearch } from '@take-home/shared';
import { ProductCard } from '@/components/product-card';

export function ProductList() {
  const { results } = useProductSearch();

  return (
    <ul className="grid">
      {results.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
