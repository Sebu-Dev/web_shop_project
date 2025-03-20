package order_service.order_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll().stream().collect(Collectors.toList());
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream().collect(Collectors.toList());
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

}