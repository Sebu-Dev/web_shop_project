import { ProductPagination } from '@/components/product/ProductPageination';

export function LandingPage() {
  return (
    <div className="">
      <section id="products" data-section="/products">
        <ProductPagination />
      </section>
    </div>
  );
}
