package order_service.order_service.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

@Component
public class OrderSeeder implements CommandLineRunner {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void run(String... args) throws Exception {
        // Erstelle Beispiel-Bestellungen
        List<Order> orders = new ArrayList<>();

        // Bestellung 1
        Order order1 = new Order();
        order1.setUserId(1L);
        order1.setDate(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        order1.setMwstRate(0.19); // 19% MwSt
        order1.setShippingCosts(5.99); // Versandkosten
        order1.setOrderNumber("order_1742474703914");
        List<OrderItem> order1Items = new ArrayList<>();
        OrderItem item1 = new OrderItem();
        item1.setOrder(order1);
        item1.setProductId(1L); // Laptop
        item1.setQuantity(2);
        item1.setPrice(999.99); // Preis aus ProductSeeder
        order1Items.add(item1);

        OrderItem item2 = new OrderItem();
        item2.setOrder(order1);
        item2.setProductId(2L); // Smartphone
        item2.setQuantity(1);
        item2.setPrice(499.99); // Preis aus ProductSeeder
        order1Items.add(item2);

        order1.setItems(order1Items);
        calculateOrderTotals(order1);
        orders.add(order1);

        // Bestellung 2
        Order order2 = new Order();
        order2.setUserId(2L);
        order2.setDate(LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        order2.setMwstRate(0.19);
        order2.setShippingCosts(3.99);
        order2.setOrderNumber("order_1742474703414");

        List<OrderItem> order2Items = new ArrayList<>();
        OrderItem item3 = new OrderItem();
        item3.setOrder(order2);
        item3.setProductId(3L); // Headphones
        item3.setQuantity(3);
        item3.setPrice(59.99); // Preis aus ProductSeeder
        order2Items.add(item3);

        order2.setItems(order2Items);
        calculateOrderTotals(order2);
        orders.add(order2);

        // Speichere die Bestellungen
        orderRepository.saveAll(orders);
        System.out.println("Order-Seeding abgeschlossen.");
    }

    // Hilfsmethode zur Berechnung der Preise
    private void calculateOrderTotals(Order order) {
        double subTotalBrutto = 0.0;
        for (OrderItem item : order.getItems()) {
            subTotalBrutto += item.getQuantity() * item.getPrice();
        }
        order.setSubTotalBrutto(subTotalBrutto);

        double mwstAmount = subTotalBrutto * order.getMwstRate();
        order.setMwstAmount(mwstAmount);

        double totalWithShipping = subTotalBrutto + mwstAmount + order.getShippingCosts();
        order.setTotalWithShipping(totalWithShipping);

        order.setPrice(subTotalBrutto); // "price" als subTotalBrutto
    }
}