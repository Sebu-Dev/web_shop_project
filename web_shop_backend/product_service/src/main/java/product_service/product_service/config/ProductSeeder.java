package product_service.product_service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import product_service.product_service.entity.Product;
import product_service.product_service.repository.ProductRepository;

@Configuration
public class ProductSeeder {

    private static final Logger logger = LoggerFactory.getLogger(ProductSeeder.class);

    @Bean
    public CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            logger.info("Starte Product-Seeding...");

            // Produkt 1: Laptop
            if (productRepository.findByName("Laptop").isEmpty()) {
                Product laptop = new Product();
                laptop.setName("Laptop");
                laptop.setImage("laptop.jpg"); // Beispielbild
                laptop.setPrice(999.99);
                laptop.setOnSale(false);
                laptop.setDescription("High-end Laptop");
                productRepository.save(laptop);
                logger.info("Produkt Laptop erstellt mit ID: {}", laptop.getId());
            } else {
                logger.info("Produkt Laptop existiert bereits");
            }

            // Produkt 2: Smartphone
            if (productRepository.findByName("Smartphone").isEmpty()) {
                Product smartphone = new Product();
                smartphone.setName("Smartphone");
                smartphone.setImage("smartphone.jpg"); // Beispielbild
                smartphone.setPrice(599.99);
                smartphone.setOnSale(false);
                smartphone.setDescription("Latest Smartphone");
                productRepository.save(smartphone);
                logger.info("Produkt Smartphone erstellt mit ID: {}", smartphone.getId());
            } else {
                logger.info("Produkt Smartphone existiert bereits");
            }

            // Produkt 3: Headphones
            if (productRepository.findByName("Headphones").isEmpty()) {
                Product headphones = new Product();
                headphones.setName("Headphones");
                headphones.setImage("headphones.jpg"); // Beispielbild
                headphones.setPrice(199.99);
                headphones.setOnSale(false);
                headphones.setDescription("Noise-cancelling Headphones");
                productRepository.save(headphones);
                logger.info("Produkt Headphones erstellt mit ID: {}", headphones.getId());
            } else {
                logger.info("Produkt Headphones existiert bereits");
            }

            logger.info("Product-Seeding abgeschlossen");
        };
    }
}