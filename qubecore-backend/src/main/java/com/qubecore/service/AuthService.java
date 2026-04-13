package com.qubecore.service;

import com.qubecore.dto.JwtResponse;
import com.qubecore.dto.LoginRequest;
import com.qubecore.dto.RegisterRequest;
import com.qubecore.model.Usuario;
import com.qubecore.model.enums.RolUsuario;
import com.qubecore.repository.UsuarioRepository;
import com.qubecore.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtTokenProvider tokenProvider;

    public JwtResponse login(LoginRequest request) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = tokenProvider.generarToken(auth);
        Usuario usuario = (Usuario) auth.getPrincipal();
        return new JwtResponse(token, "Bearer", usuario.getId(),
                usuario.getNombre(), usuario.getEmail(), usuario.getRol().name());
    }

    public String register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(RolUsuario.ROLE_USER);
        usuarioRepository.save(usuario);
        return "Registro exitoso";
    }
}
