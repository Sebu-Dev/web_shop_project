package order_service.order_service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

import java.util.Arrays;

@Configuration
public class OrderSeeder {

    private static final Logger logger = LoggerFactory.getLogger(OrderSeeder.class);

    @Bean
    public CommandLineRunner seedOrders(OrderRepository orderRepository) {
        return args -> {
            logger.info("Starte Order-Seeding...");

            // Annahme: User- und Produkt-IDs aus user-service und product-service
            Long user1Id = 2L; // user1
            Long user2Id = 3L; // user2
            Long laptopId = 1L;
            Long smartphoneId = 2L;
            Long headphonesId = 3L;

            // Bestellung 1: User1 (Laptop + Smartphone)
            if (orderRepository.findByUserId(user1Id).isEmpty()) {
                Order order1 = new Order();
                order1.setUserId(user1Id);

                OrderItem item1 = new OrderItem();
                item1.setOrder(order1);
                item1.setProductId(laptopId);
                item1.setQuantity(1);
                item1.setPrice(999.99);

                OrderItem item2 = new OrderItem();
                item2.setOrder(order1);
                item2.setProductId(smartphoneId);
                item2.setQuantity(1);
                item2.setPrice(599.99);

                order1.setItems(Arrays.asList(item1, item2));
                orderRepository.save(order1);
                logger.info("Bestellung für User {} erstellt mit ID: {}", user1Id, order1.getId());
            } else {
                logger.info("Bestellung für User {} existiert bereits", user1Id);
            }

            // Bestellung 2: User2 (Headphones)
            if (orderRepository.findByUserId(user2Id).isEmpty()) {
                Order order2 = new Order();
                order2.setUserId(user2Id);

                OrderItem item3 = new OrderItem();
                item3.setOrder(order2);
                item3.setProductId(headphonesId);
                item3.setQuantity(1);
                item3.setPrice(199.99);

                order2.setItems(Arrays.asList(item3));
                orderRepository.save(order2);
                logger.info("Bestellung für User {} erstellt mit ID: {}", user2Id, order2.getId());
            } else {
                logger.info("Bestellung für User {} existiert bereits", user2Id);
            }

            logger.info("Order-Seeding abgeschlossen");
        };
    }
}