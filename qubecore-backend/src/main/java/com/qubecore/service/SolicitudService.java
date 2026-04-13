package com.qubecore.service;

import com.qubecore.dto.SolicitudRequest;
import com.qubecore.dto.SolicitudResponse;
import com.qubecore.exception.ResourceNotFoundException;
import com.qubecore.model.Servicio;
import com.qubecore.model.Solicitud;
import com.qubecore.model.enums.EstadoSolicitud;
import com.qubecore.repository.ServicioRepository;
import com.qubecore.repository.SolicitudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final ServicioRepository servicioRepository;

    public SolicitudResponse crear(SolicitudRequest dto) {
        if (solicitudRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException(
                "Ya existe una solicitud registrada con este email");
        }

        Solicitud s = new Solicitud();
        s.setNombre(dto.getNombre());
        s.setEmail(dto.getEmail());
        s.setEmpresa(dto.getEmpresa());
        s.setTelefono(dto.getTelefono());
        s.setMensaje(dto.getMensaje());

        if (dto.getServicioId() != null) {
            Servicio servicio = servicioRepository.findById(dto.getServicioId())
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado"));
            s.setServicio(servicio);
        }

        Solicitud guardada = solicitudRepository.save(s);
        return mapToResponse(guardada, false);
    }

    public List<SolicitudResponse> listarTodas() {
        return solicitudRepository.findByOrderByCreadaEnDesc()
                .stream().map(s -> mapToResponse(s, true)).toList();
    }

    public List<SolicitudResponse> listarPorEstado(EstadoSolicitud estado) {
        return solicitudRepository.findByEstado(estado)
                .stream().map(s -> mapToResponse(s, true)).toList();
    }

    public SolicitudResponse actualizarEstado(Long id, EstadoSolicitud estado, String notas) {
        Solicitud s = solicitudRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitud no encontrada"));
        s.setEstado(estado);
        if (notas != null) s.setNotasInternas(notas);
        s.setActualizadaEn(LocalDateTime.now());
        return mapToResponse(solicitudRepository.save(s), true);
    }

    public void eliminar(Long id) {
        if (!solicitudRepository.existsById(id)) {
            throw new ResourceNotFoundException("Solicitud no encontrada");
        }
        solicitudRepository.deleteById(id);
    }

    public Map<String, Long> estadisticas() {
        Map<String, Long> stats = new LinkedHashMap<>();
        for (EstadoSolicitud e : EstadoSolicitud.values()) {
            stats.put(e.name(), solicitudRepository.countByEstado(e));
        }
        return stats;
    }

    private SolicitudResponse mapToResponse(Solicitud s, boolean esAdmin) {
        String nombreServicio = s.getServicio() != null ? s.getServicio().getNombre() : null;
        String notas = esAdmin ? s.getNotasInternas() : null;
        return new SolicitudResponse(s.getId(), s.getNombre(), s.getEmail(),
                s.getEmpresa(), s.getMensaje(), nombreServicio,
                s.getEstado().name(), s.getCreadaEn(), notas);
    }
}
