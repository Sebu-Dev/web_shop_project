package order_service.order_service.dto;

import lombok.Data;

@Data
public class ProductDetailsDTO {
    private Long id;
    private String name;
    private String image;
    private double price;
    private boolean onSale;
    private String description;

}
