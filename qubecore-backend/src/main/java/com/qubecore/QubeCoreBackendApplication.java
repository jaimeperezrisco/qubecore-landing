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
            // Generar usuario admin si no existe
            if (!usuarioRepository.existsByEmail("admin@qubecore.es")) {
                Usuario admin = new Usuario();
                admin.setEmail("admin@qubecore.es");
                admin.setNombre("Admin QubeCore");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setRol(RolUsuario.ROLE_ADMIN);
                admin.setActivo(true);
                admin.setCreadoEn(LocalDateTime.now());
                usuarioRepository.save(admin);
                System.out.println("Usuario admin auto-generado con éxito.");
            }

            // Generar servicios base si no existen
            if (servicioRepository.count() == 0) {
                servicioRepository.saveAll(List.of(
                    new Servicio(null, "Quantum Hardware Access", "Acceso a hardware", "cpu", true, 1),
                    new Servicio(null, "Quantum Software Development", "Software cuántico", "code", true, 2),
                    new Servicio(null, "Quantum Consulting", "Consultoría", "briefcase", true, 3),
                    new Servicio(null, "Quantum Education", "Formación", "graduation-cap", true, 4),
                    new Servicio(null, "Quantum Cloud Services", "Servicios Cloud", "cloud", true, 5),
                    new Servicio(null, "Quantum Security", "Criptografía y seguridad", "shield", true, 6)
                ));
                System.out.println("✅ Servicios base auto-generados con éxito.");
            }
        };
    }
}
