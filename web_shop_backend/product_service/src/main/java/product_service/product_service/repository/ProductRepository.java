package product_service.product_service.repository;

import product_service.product_service.entity.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @SuppressWarnings("null")
    Page<Product> findAll(Pageable pageable);

    @SuppressWarnings("null")
    List<Product> findAll();
}
