import { ProductPagination } from '@/components/ProductPageination';
import { ShoppingCart } from '@/components/ShoppingCart';

export function LandingPage() {
  return (
    <div className="">
      <section id="products" data-section="/products">
        <ProductPagination />
      </section>

      <ShoppingCart></ShoppingCart>
    </div>
  );
}
