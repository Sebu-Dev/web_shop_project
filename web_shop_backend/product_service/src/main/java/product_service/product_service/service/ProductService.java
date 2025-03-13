package product_service.product_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import product_service.product_service.entity.Product;
import product_service.product_service.repository.ProductRepository;

public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Produkt nicht gefunden"));
    }

    public Product createProduct(Product product) {
        Product productToCreate = new Product();
        productToCreate.setName(product.getName());
        productToCreate.setImage(product.getImage());
        productToCreate.setOnSale(product.isOnSale());
        productToCreate.setPrice(product.getPrice());
        productToCreate.setDescription(product.getDescription());
        return productRepository.save(productToCreate);
    }

    public Product updateProduct(Long id, Product product) {
        Product productToUpdate = getProductById(id);
        productToUpdate.setName(product.getName());
        productToUpdate.setImage(product.getImage());
        productToUpdate.setPrice(product.getPrice());
        productToUpdate.setOnSale(product.isOnSale());
        productToUpdate.setDescription(product.getDescription());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
