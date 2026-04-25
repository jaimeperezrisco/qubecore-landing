package com.qubecore;

import com.qubecore.model.Servicio;
import com.qubecore.model.Usuario;
import com.qubecore.model.enums.RolUsuario;
import com.qubecore.repository.ServicioRepository;
import com.qubecore.repository.UsuarioRepository;
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
    public CommandLineRunner initData(UsuarioRepository usuarioRepository, 
                                      ServicioRepository servicioRepository, 
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            if (!usuarioRepository.existsByEmail("admin@qubecore.es")) {
                Usuario admin = new Usuario();
                admin.setEmail("admin@qubecore.es");
                admin.setName("Admin QubeCore");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setRole(RolUsuario.ROLE_ADMIN);
                admin.setActive(true);
                admin.setCreatedAt(LocalDateTime.now());
                usuarioRepository.save(admin);
                System.out.println("Admin user auto-generated successfully.");
            }

            if (servicioRepository.count() == 0) {
                servicioRepository.saveAll(List.of(
                    new Servicio(null, "Quantum Hardware Access", true, 1),
                    new Servicio(null, "Quantum Software Development", true, 2),
                    new Servicio(null, "Quantum Consulting", true, 3),
                    new Servicio(null, "Quantum Education", true, 4),
                    new Servicio(null, "Quantum Cloud Services", true, 5),
                    new Servicio(null, "Quantum Security", true, 6)
                ));
                System.out.println("Base services auto-generated successfully.");
            }
        };
    }
}