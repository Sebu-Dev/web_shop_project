package order_service.order_service.dto;

import lombok.Data;
import order_service.order_service.entity.Order;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponseDTO {
    private Long id;
    private Long userId;
    private List<OrderItemResponseDTO> items;
    private double totalPrice;

    public OrderResponseDTO(Order order, List<ProductDTO> products) {
        this.id = order.getId();
        this.userId = order.getUserId();
        this.totalPrice = order.getTotalPrice();
        this.items = order.getOrderItems().stream()
                .map(item -> new OrderItemResponseDTO(item, products.stream()
                        .filter(p -> p.getId().equals(item.getProductId()))
                        .findFirst().orElse(null)))
                .collect(Collectors.toList());
    }
}