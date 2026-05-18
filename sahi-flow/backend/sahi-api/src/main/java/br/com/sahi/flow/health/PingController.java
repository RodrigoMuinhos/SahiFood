package br.com.sahi.flow.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PingController {

    @GetMapping("/ping")
    public String ping() {
        return "SA'HI API online ✓";
    }

    @GetMapping("/health")
    public String health() {
        return "{\"status\":\"UP\",\"message\":\"SA'HI API rodando!\"}";
    }

}
