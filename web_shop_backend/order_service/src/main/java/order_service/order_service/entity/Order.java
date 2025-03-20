package order_service.order_service.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String date;

    private double price;

    private double subTotalBrutto;

    private double mwstRate;

    private double mwstAmount;

    private double shippingCosts;

    private double totalWithShipping;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

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

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
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
}