package order_service.order_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import order_service.order_service.entity.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}