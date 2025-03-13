package order_service.order_service.controller;

import order_service.order_service.dto.OrderDTO;
import order_service.order_service.dto.OrderResponseDTO;
import order_service.order_service.dto.ProductDTO;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.service.OrderService;
import order_service.order_service.service.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductClient productClient;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrder(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        List<Long> productIds = order.getOrderItems().stream()
                .map(OrderItem::getProductId)
                .collect(Collectors.toList());
        List<ProductDTO> products = productClient.getProductsByIds(productIds);
        OrderResponseDTO orderDTO = new OrderResponseDTO(order, products);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("@userSecurity.checkUserId(authentication, #userId)")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        List<OrderResponseDTO> orderDTOs = orders.stream()
                .map(order -> {
                    List<Long> productIds = order.getOrderItems().stream()
                            .map(OrderItem::getProductId)
                            .collect(Collectors.toList());
                    List<ProductDTO> products = productClient.getProductsByIds(productIds);
                    return new OrderResponseDTO(order, products);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }
}