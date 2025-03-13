package order_service.order_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import order_service.order_service.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
