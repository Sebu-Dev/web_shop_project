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
import { useGetProducts } from '@/hooks/useGetProducts';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductPagination() {
  const { data: products = [], isPending } = useGetProducts();
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisiblePages = 3;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

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

      {/* Ladezustand mit Skeleton */}
      {isPending ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full" /> {/* Produktbild */}
              <Skeleton className="h-6 w-3/4" /> {/* Titel */}
              <Skeleton className="h-4 w-1/2" /> {/* Preis */}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 pt-2 pb-15 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
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

              {getVisiblePages().map((page, index) =>
                typeof page === 'number' ? (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className={
                        page === currentPage ? 'font-bold text-black' : ''
                      }
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
        </>
      )}
    </section>
  );
}
