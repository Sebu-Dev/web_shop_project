package order_service.order_service.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import order_service.order_service.dto.OrderDTO;
import order_service.order_service.dto.ProductDTO;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductClient productClient;

    public Order createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setUserId(orderDTO.getUserId());
        order.setOrderDate(LocalDateTime.now());

        double totalPrice = 0;
        for (OrderItem item : orderDTO.getItems()) {

            ProductDTO product = productClient.getProductById(item.getProductId());
            item.setPrice(product.getPrice());
            item.setOrder(order);
            totalPrice += product.getPrice() * item.getQuantity();
        }

        order.setOrderItems(orderDTO.getItems());
        order.setTotalPrice(totalPrice);
        return orderRepository.save(order);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bestellung nicht gefunden"));
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
