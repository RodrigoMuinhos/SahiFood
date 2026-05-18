package br.com.sahi.flow.kitchen;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/kds")
public class KitchenController {

    private final KitchenTicketRepository kitchenTicketRepository;

    public KitchenController(KitchenTicketRepository kitchenTicketRepository) {
        this.kitchenTicketRepository = kitchenTicketRepository;
    }

    @GetMapping("/orders")
    public List<KitchenTicket> getOrdersForKitchen() {
        return kitchenTicketRepository.findByStatusInOrderByPriorityDesc(
                Arrays.asList("WAITING", "IN_PREPARATION")
        );
    }

    @GetMapping("/orders/waiting")
    public List<KitchenTicket> getWaitingOrders() {
        return kitchenTicketRepository.findByStatusOrderByCreatedAt("WAITING");
    }

    @PatchMapping("/orders/{id}/start")
    public KitchenTicket startOrder(@PathVariable UUID id) {
        KitchenTicket ticket = kitchenTicketRepository.findById(id).orElseThrow();
        ticket.setStatus("IN_PREPARATION");
        ticket.setStartedAt(LocalDateTime.now());
        return kitchenTicketRepository.save(ticket);
    }

    @PatchMapping("/orders/{id}/ready")
    public KitchenTicket markOrderReady(@PathVariable UUID id) {
        KitchenTicket ticket = kitchenTicketRepository.findById(id).orElseThrow();
        ticket.setStatus("READY");
        ticket.setFinishedAt(LocalDateTime.now());
        return kitchenTicketRepository.save(ticket);
    }

    @PatchMapping("/orders/{id}/delivered")
    public KitchenTicket markOrderDelivered(@PathVariable UUID id) {
        KitchenTicket ticket = kitchenTicketRepository.findById(id).orElseThrow();
        ticket.setStatus("DELIVERED");
        ticket.setDeliveredAt(LocalDateTime.now());
        return kitchenTicketRepository.save(ticket);
    }

}
