package com.qubecore;

import com.qubecore.model.ServiceOffering;
import com.qubecore.model.User;
import com.qubecore.model.enums.UserRole;
import com.qubecore.repository.ServiceOfferingRepository;
import com.qubecore.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class QubeCoreBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(QubeCoreBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, 
                                      ServiceOfferingRepository serviceOfferingRepository, 
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@qubecore.es")) {
                User admin = new User();
                admin.setEmail("admin@qubecore.es");
                admin.setName("Admin QubeCore");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setRole(UserRole.ROLE_ADMIN);
                admin.setActive(true);
                admin.setCreatedAt(LocalDateTime.now());
                userRepository.save(admin);
                System.out.println("Admin user auto-generated successfully.");
            }

            if (serviceOfferingRepository.count() == 0) {
                serviceOfferingRepository.saveAll(List.of(
                    new ServiceOffering(null, "Quantum Hardware Access", true, 1),
                    new ServiceOffering(null, "Quantum Software Development", true, 2),
                    new ServiceOffering(null, "Quantum Consulting", true, 3),
                    new ServiceOffering(null, "Quantum Education", true, 4),
                    new ServiceOffering(null, "Quantum Cloud Services", true, 5),
                    new ServiceOffering(null, "Quantum Security", true, 6)
                ));
                System.out.println("Base services auto-generated successfully.");
            }
        };
    }
}
