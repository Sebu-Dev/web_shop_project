package order_service.order_service.dto;

import lombok.Data;

@Data
public class OrderItemDetailsDTO {
    private Long id;
    private Long productId;
    private String name;
    private String description;
    private String image;
    private double price;
    private int quantity;

}