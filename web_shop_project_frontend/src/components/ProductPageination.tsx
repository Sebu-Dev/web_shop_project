import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { products } from "@/data/ProductDummyData";
import { ProductCard } from "./ProductCard";



export function ProductPagination() {
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedproducts = products.slice(startIndex, startIndex + productsPerPage);

const handlePrevious= (e: React.MouseEvent)=>{
    e.preventDefault();
    if(currentPage>1)setCurrentPage((prev)=>prev-1)
}
const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  return (
    <section className="py-16">
        <h1 className="text-4xl font-bold text-center text-neutral-100 mb-12">
          Unsere Top-Produkte
        </h1>
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {/*TODO*/}
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
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Seitenzahlen */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            if (totalPages > 5 && (page === 2 || page === totalPages - 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </section>
  );
}
