package br.com.sahi.flow.order;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private Integer orderNumber;

    @Column(nullable = false, length = 40)
    private String status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discount;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 40)
    private String customerType;

    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private LocalDateTime startedAt;
    private LocalDateTime readyAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime cancelledAt;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (status == null) status = "CREATED";
        if (discount == null) discount = BigDecimal.ZERO;
        if (customerType == null) customerType = "PUBLIC";
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
