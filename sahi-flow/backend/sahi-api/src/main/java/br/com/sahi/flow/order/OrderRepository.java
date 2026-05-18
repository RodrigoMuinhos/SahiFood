package br.com.sahi.flow.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    Optional<Order> findByOrderNumber(Integer orderNumber);
    List<Order> findByStatusOrderByCreatedAt(String status);
    Integer countByStatus(String status);
}
