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
    public ResponseEntity<SolicitudResponse> create(@Valid @RequestBody SolicitudRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitudService.create(dto));
    }

    @GetMapping("/admin/solicitudes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SolicitudResponse>> list(
            @RequestParam(required = false) EstadoSolicitud status) {
        if (status != null) return ResponseEntity.ok(solicitudService.listByStatus(status));
        return ResponseEntity.ok(solicitudService.listAll());
    }

    @PatchMapping("/admin/solicitudes/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SolicitudResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam EstadoSolicitud status,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(solicitudService.updateStatus(id, status, notes));
    }

    @DeleteMapping("/admin/solicitudes/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        solicitudService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/solicitudes/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> statistics() {
        return ResponseEntity.ok(solicitudService.statistics());
    }
}