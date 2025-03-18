package order_service.order_service.config;

import order_service.order_service.dto.ProductDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductClient {
    private final RestTemplate restTemplate;

    public ProductClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ProductDTO getProductById(Long productId) {
        return restTemplate.getForObject(
                "http://localhost:8002/api/products/" + productId,
                ProductDTO.class);
    }

    public List<ProductDTO> getProductsByIds(List<Long> productIds) {
        // Annahme: product_service hat einen Endpunkt /api/products?ids=1,2,3
        String ids = String.join(",",
                productIds.stream().map(String::valueOf).collect(Collectors.toList()));
        ProductDTO[] products = restTemplate.getForObject(
                "http://localhost:8002/api/products?ids=" + ids,
                ProductDTO[].class);
        return Arrays.asList(products);
    }

}