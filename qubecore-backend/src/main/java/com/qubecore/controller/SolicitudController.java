package com.qubecore.controller;

import com.qubecore.dto.SolicitudRequest;
import com.qubecore.dto.SolicitudResponse;
import com.qubecore.model.enums.EstadoSolicitud;
import com.qubecore.service.SolicitudService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;

    @PostMapping("/solicitudes")
    public ResponseEntity<SolicitudResponse> crear(@Valid @RequestBody SolicitudRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitudService.crear(dto));
    }

    @GetMapping("/admin/solicitudes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SolicitudResponse>> listar(
            @RequestParam(required = false) EstadoSolicitud estado) {
        if (estado != null) return ResponseEntity.ok(solicitudService.listarPorEstado(estado));
        return ResponseEntity.ok(solicitudService.listarTodas());
    }

    @PatchMapping("/admin/solicitudes/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SolicitudResponse> actualizarEstado(
            @PathVariable Long id,
            @RequestParam EstadoSolicitud estado,
            @RequestParam(required = false) String notas) {
        return ResponseEntity.ok(solicitudService.actualizarEstado(id, estado, notas));
    }

    @DeleteMapping("/admin/solicitudes/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        solicitudService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/solicitudes/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> estadisticas() {
        return ResponseEntity.ok(solicitudService.estadisticas());
    }
}
