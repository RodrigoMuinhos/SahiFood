package br.com.sahi.flow.product;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    private UUID id;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String imageUrl;

    private Integer preparationTimeMinutes;

    @Column(nullable = false)
    private Boolean active;

    @Column(nullable = false)
    private Boolean hasRecipe;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private UUID categoryId;

    @PrePersist
    public void prePersist() {
        if (id == null) id = UUID.randomUUID();
        if (active == null) active = true;
        if (hasRecipe == null) hasRecipe = true;
        if (preparationTimeMinutes == null) preparationTimeMinutes = 5;
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}
