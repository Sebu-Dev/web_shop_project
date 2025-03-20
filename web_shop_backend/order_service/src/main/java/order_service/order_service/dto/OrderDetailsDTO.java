package order_service.order_service.dto;

import java.util.List;

public class OrderDetailsDTO {
    private Long id;
    private Long userId;
    private String date;
    private double price;
    private double subTotalBrutto;
    private double mwstRate;
    private double mwstAmount;
    private double shippingCosts;
    private double totalWithShipping;
    private List<OrderItemDetailsDTO> items;

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getSubTotalBrutto() {
        return subTotalBrutto;
    }

    public void setSubTotalBrutto(double subTotalBrutto) {
        this.subTotalBrutto = subTotalBrutto;
    }

    public double getMwstRate() {
        return mwstRate;
    }

    public void setMwstRate(double mwstRate) {
        this.mwstRate = mwstRate;
    }

    public double getMwstAmount() {
        return mwstAmount;
    }

    public void setMwstAmount(double mwstAmount) {
        this.mwstAmount = mwstAmount;
    }

    public double getShippingCosts() {
        return shippingCosts;
    }

    public void setShippingCosts(double shippingCosts) {
        this.shippingCosts = shippingCosts;
    }

    public double getTotalWithShipping() {
        return totalWithShipping;
    }

    public void setTotalWithShipping(double totalWithShipping) {
        this.totalWithShipping = totalWithShipping;
    }

    public List<OrderItemDetailsDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDetailsDTO> items) {
        this.items = items;
    }
}
