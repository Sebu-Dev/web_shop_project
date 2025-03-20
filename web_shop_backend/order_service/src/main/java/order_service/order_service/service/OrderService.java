package order_service.order_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.transaction.Transactional;
import order_service.order_service.dto.OrderDetailsDTO;
import order_service.order_service.dto.OrderItemDetailsDTO;
import order_service.order_service.dto.ProductDetailsDTO;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<OrderDetailsDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll().stream().collect(Collectors.toList());
        List<OrderDetailsDTO> ordersWithDetails = orders.stream()
                .map(order -> getOrderDetails(order.getId()))
                .collect(Collectors.toList());
        return ordersWithDetails;
    }

    public List<OrderDetailsDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId).stream().collect(Collectors.toList());
        List<OrderDetailsDTO> ordersWithDetails = orders.stream()
                .map(order -> getOrderDetails(order.getId()))
                .collect(Collectors.toList());
        return ordersWithDetails;
    }

    public Order getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return order;
    }

    @Transactional
    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        return savedOrder;
    }

    public Order updateOrder(Long id, Order orderDTO) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        existingOrder.setUserId(orderDTO.getUserId());
        existingOrder.getItems().clear();
        orderDTO.getItems().forEach(itemDTO -> {
            OrderItem item = new OrderItem();
            item.setOrder(existingOrder);
            item.setProductId(itemDTO.getProductId());
            item.setQuantity(itemDTO.getQuantity());
            existingOrder.getItems().add(item);
        });
        Order updatedOrder = orderRepository.save(existingOrder);
        return updatedOrder;
    }

    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    public OrderDetailsDTO getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        OrderDetailsDTO orderDetails = mapToOrderDetailsDTO(order);

        // Hole Produktdaten für jedes OrderItem
        orderDetails.setItems(order.getItems().stream()
                .map(item -> {
                    OrderItemDetailsDTO itemDetails = new OrderItemDetailsDTO();
                    itemDetails.setProductId(item.getProductId());
                    itemDetails.setQuantity(item.getQuantity());
                    itemDetails.setPrice(item.getPrice());

                    // API-Aufruf zum product_service
                    try {
                        ProductDetailsDTO product = restTemplate.getForObject(
                                "http://localhost:8002/api/products/" + item.getProductId() + "/details",
                                ProductDetailsDTO.class);
                        itemDetails.setProduct(product);
                    } catch (Exception e) {
                        logger.error("Failed to fetch product data for productId {}: {}", item.getProductId(),
                                e.getMessage());
                        itemDetails.setProduct(null);
                    }

                    return itemDetails;
                })
                .collect(Collectors.toList()));

        return orderDetails;
    }

    private OrderDetailsDTO mapToOrderDetailsDTO(Order order) {
        OrderDetailsDTO dto = new OrderDetailsDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setDate(order.getDate());

        dto.setSubTotalBrutto(order.getSubTotalBrutto());
        dto.setMwstRate(order.getMwstRate());
        dto.setMwstAmount(order.getMwstAmount());
        dto.setShippingCosts(order.getShippingCosts());
        dto.setTotalWithShipping(order.getTotalWithShipping());
        return dto;
    }

}