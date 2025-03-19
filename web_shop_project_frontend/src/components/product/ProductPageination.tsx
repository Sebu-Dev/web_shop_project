import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ProductCard } from './ProductCard';
import { useProductStore } from '@/store/useProductStore';

export function ProductPagination() {
  const { products } = useProductStore();
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisiblePages = 3;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedproducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const getVisiblePages = () => {
    // Falls die Gesamtzahl der Seiten kleiner oder gleich der maximal sichtbaren Seiten ist,
    // werden einfach alle Seiten angezeigt.
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Wenn die aktuelle Seite am Anfang (1 oder 2) ist, zeigen wir die ersten drei Seiten,
    // gefolgt von "..." und der letzten Seite.
    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages];
    }

    // Wenn die aktuelle Seite am Ende ist (z. B. bei totalPages - 1 oder totalPages),
    // zeigen wir nur die letzten drei Seiten an.
    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // Wenn die aktuelle Seite in der Mitte liegt, zeigen wir:
    // - die erste Seite
    // - "..." als Trenner
    // - die aktuelle Seite mit einer Seite davor und einer danach
    // - "..." als Trenner
    // - die letzte Seite
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  return (
    <section className="py-16">
      <h1 className="mb-12 text-center text-4xl font-bold text-neutral-100">
        Unsere Top-Produkte
      </h1>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 pt-2 pb-15 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedproducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>

          {/* Seitenzahlen */}
          {getVisiblePages().map((page, index) =>
            typeof page === 'number' ? (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? 'font-bold text-black' : ''}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
