package br.com.sahi.flow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class SahiFlowApplication {

    public static void main(String[] args) {
        SpringApplication.run(SahiFlowApplication.class, args);
    }

}
