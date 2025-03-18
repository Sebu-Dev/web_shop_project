package order_service.order_service.service;

import order_service.order_service.dto.OrderDTO;
import order_service.order_service.dto.OrderItemDTO;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return toDTO(order);
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = fromDTO(orderDTO);
        Order savedOrder = orderRepository.save(order);
        return toDTO(savedOrder);
    }

    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
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
        return toDTO(updatedOrder);
    }

    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    private OrderDTO toDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setItems(order.getItems().stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setProductId(item.getProductId());
            itemDTO.setQuantity(item.getQuantity());
            return itemDTO;
        }).collect(Collectors.toList()));
        return dto;
    }

    private Order fromDTO(OrderDTO dto) {
        Order order = new Order();
        order.setId(dto.getId());
        order.setUserId(dto.getUserId());
        if (dto.getItems() != null) {
            dto.getItems().forEach(itemDTO -> {
                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProductId(itemDTO.getProductId());
                item.setQuantity(itemDTO.getQuantity());
                order.getItems().add(item);
            });
        }
        return order;
    }
}