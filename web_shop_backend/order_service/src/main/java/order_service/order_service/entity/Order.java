package order_service.order_service.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "date", nullable = false)
    private String date;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "sub_total_brutto", nullable = false)
    private double subTotalBrutto;

    @Column(name = "mwst_rate", nullable = false)
    private double mwstRate;

    @Column(name = "mwst_amount", nullable = false)
    private double mwstAmount;

    @Column(name = "shipping_costs", nullable = false)
    private double shippingCosts;

    @Column(name = "total_with_shipping", nullable = false)
    private double totalWithShipping;
    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
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