package br.com.sahi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @Column(columnDefinition = "UUID")
    private UUID id;

    @Column(name = "category_id", columnDefinition = "UUID")
    private UUID categoryId;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "preparation_time_minutes")
    private Integer preparationTimeMinutes = 5;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "has_recipe")
    private Boolean hasRecipe = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = UUID.randomUUID();
        }
        if (active == null) {
            active = true;
        }
        if (hasRecipe == null) {
            hasRecipe = false;
        }
        if (preparationTimeMinutes == null) {
            preparationTimeMinutes = 5;
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
