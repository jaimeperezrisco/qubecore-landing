package com.qubecore.service;

import com.qubecore.dto.JwtResponse;
import com.qubecore.dto.LoginRequest;
import com.qubecore.dto.RegisterRequest;
import com.qubecore.model.Usuario;
import com.qubecore.model.enums.RolUsuario;
import com.qubecore.repository.UsuarioRepository;
import com.qubecore.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCKOUT_MS = 15 * 60 * 1000; // 15 minutos

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtTokenProvider tokenProvider;

    // Rate limiting: cuenta intentos por IP (simple, en memoria)
    private final Map<String, AttemptTracker> attemptTracker = new ConcurrentHashMap<>();

    private static class AttemptTracker {
        int attempts = 0;
        long firstAttemptTime = 0;
        long lockoutUntil = 0;
    }

    public JwtResponse login(LoginRequest request, String clientIp) {
        // Rate limiting check
        checkRateLimit(clientIp);

        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = tokenProvider.generarToken(auth);
            Usuario usuario = (Usuario) auth.getPrincipal();

            // Login exitoso: reset intentos
            attemptTracker.remove(clientIp);
            logger.info("LOGIN_SUCCESS | email: {} | ip: {} | timestamp: {}",
                request.getEmail(), clientIp, LocalDateTime.now());

            return new JwtResponse(token, "Bearer", usuario.getId(),
                    usuario.getNombre(), usuario.getEmail(), usuario.getRol().name());

        } catch (Exception e) {
            // Login fallido: registrar intento
            registerFailedAttempt(clientIp, request.getEmail());
            logger.warn("LOGIN_FAILED | email: {} | ip: {} | reason: {} | timestamp: {}",
                request.getEmail(), clientIp, e.getMessage(), LocalDateTime.now());

            // Mensaje genérico (no revela si el email existe)
            throw new BadCredentialsException("Credenciales inválidas");
        }
    }

    public String register(RegisterRequest request) {
        // Mensaje genérico - no revelar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            logger.warn("REGISTER_FAILED | email: {} | reason: already_exists | timestamp: {}",
                request.getEmail(), LocalDateTime.now());
            // Mensaje genérico igual que login
            throw new IllegalArgumentException("Credenciales inválidas");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(RolUsuario.ROLE_USER);
        usuarioRepository.save(usuario);

        logger.info("REGISTER_SUCCESS | email: {} | timestamp: {}",
            request.getEmail(), LocalDateTime.now());
        return "Registro exitoso";
    }

    private void checkRateLimit(String clientIp) {
        AttemptTracker tracker = attemptTracker.get(clientIp);
        if (tracker != null && tracker.lockoutUntil > System.currentTimeMillis()) {
            long remaining = (tracker.lockoutUntil - System.currentTimeMillis()) / 1000;
            logger.warn("RATE_LIMIT_EXCEEDED | ip: {} | remaining_seconds: {}", clientIp, remaining);
            throw new BadCredentialsException("Demasiados intentos. Intenta más tarde.");
        }
    }

    private void registerFailedAttempt(String clientIp, String email) {
        AttemptTracker tracker = attemptTracker.computeIfAbsent(clientIp, k -> new AttemptTracker());
        tracker.attempts++;
        if (tracker.firstAttemptTime == 0) {
            tracker.firstAttemptTime = System.currentTimeMillis();
        }
        // Lockout después de MAX_ATTEMPTS en 15 minutos
        if (tracker.attempts >= MAX_ATTEMPTS) {
            tracker.lockoutUntil = System.currentTimeMillis() + LOCKOUT_MS;
            logger.warn("ACCOUNT_LOCKED | ip: {} | attempts: {} | lockout_minutes: 15",
                clientIp, tracker.attempts);
        }
    }
}
