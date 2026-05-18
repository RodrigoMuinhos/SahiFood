package br.com.sahi.repository;

import br.com.sahi.entity.KitchenTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KitchenTicketRepository extends JpaRepository<KitchenTicket, UUID> {
    List<KitchenTicket> findByStatusOrderByCreatedAt(String status);
}
