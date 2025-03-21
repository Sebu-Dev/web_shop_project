package order_service.order_service.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderDetailsDTO {
    private Long id;
    private Long userId;
    private String date;
    private String orderNumber;
    private double subTotalBrutto;
    private double mwstRate;
    private double mwstAmount;
    private double shippingCosts;
    private double totalWithShipping;
    private List<OrderItemDetailsDTO> items;

}
