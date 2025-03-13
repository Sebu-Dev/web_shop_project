package order_service.order_service.dto;

import lombok.Data;
import order_service.order_service.entity.OrderItem;

@Data
public class OrderItemResponseDTO {
    private Long productId;
    private String productName;
    private String productImage;
    private int quantity;
    private double price;

    public OrderItemResponseDTO(OrderItem item, ProductDTO product) {
        this.productId = item.getProductId();
        this.productName = product != null ? product.getName() : "Unbekannt";
        this.productImage = product != null ? product.getImage() : "";
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
    }
}