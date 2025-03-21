package order_service.order_service.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.transaction.Transactional;
import order_service.order_service.dto.OrderDetailsDTO;
import order_service.order_service.dto.OrderItemDetailsDTO;
import order_service.order_service.dto.ProductDetailsDTO;
import order_service.order_service.entity.Order;
import order_service.order_service.entity.OrderItem;
import order_service.order_service.repository.OrderRepository;

@Service
public class OrderService {
    //

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private static final String PRODUCT_SERVICE_URL = "http://product-service:8002/api/products/"; // Anpassen an deine
    // Umgebung

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<OrderDetailsDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderDetailsDTOWithItems)
                .collect(Collectors.toList());
    }

    public List<OrderDetailsDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapToOrderDetailsDTOWithItems)
                .collect(Collectors.toList());
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Transactional
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrder(Long id, Order orderDTO) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        existingOrder.setUserId(orderDTO.getUserId());
        existingOrder.setOrderNumber(orderDTO.getOrderNumber());
        existingOrder.setDate(orderDTO.getDate());
        existingOrder.setSubTotalBrutto(orderDTO.getSubTotalBrutto());
        existingOrder.setMwstRate(orderDTO.getMwstRate());
        existingOrder.setMwstAmount(orderDTO.getMwstAmount());
        existingOrder.setShippingCosts(orderDTO.getShippingCosts());
        existingOrder.setTotalWithShipping(orderDTO.getTotalWithShipping());

        existingOrder.getItems().clear();
        orderDTO.getItems().forEach(itemDTO -> {
            OrderItem item = new OrderItem();
            item.setOrder(existingOrder);
            item.setProductId(itemDTO.getProductId());
            item.setQuantity(itemDTO.getQuantity());
            item.setPrice(itemDTO.getPrice());
            existingOrder.getItems().add(item);
        });
        return orderRepository.save(existingOrder);
    }

    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderRepository.delete(order);
    }

    public OrderDetailsDTO getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        return mapToOrderDetailsDTOWithItems(order);
    }

    private OrderDetailsDTO mapToOrderDetailsDTOWithItems(Order order) {
        OrderDetailsDTO dto = new OrderDetailsDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setDate(order.getDate());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setSubTotalBrutto(order.getSubTotalBrutto());
        dto.setMwstRate(order.getMwstRate());
        dto.setMwstAmount(order.getMwstAmount());
        dto.setShippingCosts(order.getShippingCosts());
        dto.setTotalWithShipping(order.getTotalWithShipping());

        // Sammle alle productIds für einen Batch-Aufruf
        List<Long> productIds = order.getItems().stream()
                .map(OrderItem::getProductId)
                .distinct() // Vermeide Duplikate
                .collect(Collectors.toList());

        // Batch-Aufruf (falls verfügbar) oder einzelne Aufrufe als Fallback
        Map<Long, ProductDetailsDTO> productMap = fetchProducts(productIds);

        List<OrderItemDetailsDTO> items = order.getItems().stream()
                .map(item -> {
                    OrderItemDetailsDTO itemDto = new OrderItemDetailsDTO();
                    itemDto.setId(item.getId());
                    itemDto.setProductId(item.getProductId());
                    itemDto.setPrice(item.getPrice());
                    itemDto.setQuantity(item.getQuantity());

                    ProductDetailsDTO product = productMap.get(item.getProductId());
                    if (product != null) {
                        itemDto.setName(product.getName());

                        itemDto.setDescription(product.getDescription());
                        itemDto.setImage(product.getImage());
                    } else {
                        logger.warn("Produkt mit ID {} konnte nicht geladen werden.", item.getProductId());
                    }
                    return itemDto;
                })
                .collect(Collectors.toList());

        dto.setItems(items);
        return dto;
    }

    private Map<Long, ProductDetailsDTO> fetchProducts(List<Long> productIds) {
        Map<Long, ProductDetailsDTO> productMap = new HashMap<>();

        // Fallback: Einzelne Aufrufe, da kein Batch-Endpunkt bekannt ist
        for (Long productId : productIds) {
            try {
                ProductDetailsDTO product = restTemplate.getForObject(
                        PRODUCT_SERVICE_URL + productId + "/details",
                        ProductDetailsDTO.class);
                if (product != null) {
                    productMap.put(productId, product);
                }
            } catch (Exception e) {
                logger.error("Fehler beim Abrufen des Produkts mit ID {}: {}", productId, e.getMessage());
            }
        }
        return productMap;
    }
}