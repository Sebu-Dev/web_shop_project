package order_service.order_service.dto;

public class OrderItemDetailsDTO {
    private Long productId;
    private int quantity;
    private double price;
    private ProductDetailsDTO product; // Produktdaten

    // Getter und Setter
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ProductDetailsDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDetailsDTO product) {
        this.product = product;
    }
}