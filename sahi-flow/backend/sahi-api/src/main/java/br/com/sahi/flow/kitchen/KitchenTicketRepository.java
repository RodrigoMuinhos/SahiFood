package br.com.sahi.flow.kitchen;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface KitchenTicketRepository extends JpaRepository<KitchenTicket, UUID> {
    List<KitchenTicket> findByStatusOrderByCreatedAt(String status);
    List<KitchenTicket> findByStatusInOrderByPriorityDesc(List<String> statuses);
}
