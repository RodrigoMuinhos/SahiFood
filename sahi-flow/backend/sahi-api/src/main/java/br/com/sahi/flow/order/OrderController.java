package br.com.sahi.flow.order;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable UUID id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setStatus("CREATED");
        return orderRepository.save(order);
    }

    @PatchMapping("/{id}/pay")
    public Order markAsPaid(@PathVariable UUID id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus("PAID");
        order.setPaidAt(java.time.LocalDateTime.now());
        return orderRepository.save(order);
    }

    @PatchMapping("/{id}/cancel")
    public Order cancelOrder(@PathVariable UUID id) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus("CANCELLED");
        order.setCancelledAt(java.time.LocalDateTime.now());
        return orderRepository.save(order);
    }

}
