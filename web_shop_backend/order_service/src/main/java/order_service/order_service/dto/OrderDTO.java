package order_service.order_service.dto;

import lombok.Data;
import order_service.order_service.entity.OrderItem;
import java.util.List;

@Data
public class OrderDTO {
    private Long userId;
    private List<OrderItem> items;

}
