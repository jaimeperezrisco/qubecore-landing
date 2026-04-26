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

    public SolicitudResponse create(SolicitudRequest dto) {
        Solicitud s = new Solicitud();
        s.setName(dto.getName());
        s.setEmail(dto.getEmail());
        s.setCompany(dto.getCompany());
        s.setPhone(dto.getPhone());
        s.setMessage(dto.getMessage());

        if (dto.getServiceId() != null) {
            Servicio servicio = servicioRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
            s.setServicio(servicio);
        }

        Solicitud saved = solicitudRepository.save(s);
        return mapToResponse(saved, false);
    }

    public List<SolicitudResponse> listAll() {
        return solicitudRepository.findByOrderByCreatedAtDesc()
                .stream().map(s -> mapToResponse(s, true)).toList();
    }

    public List<SolicitudResponse> listByStatus(EstadoSolicitud status) {
        return solicitudRepository.findByStatus(status)
                .stream().map(s -> mapToResponse(s, true)).toList();
    }

    public SolicitudResponse updateStatus(Long id, EstadoSolicitud status, String notes) {
        Solicitud s = solicitudRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        s.setStatus(status);
        if (notes != null) s.setInternalNotes(notes);
        s.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(solicitudRepository.save(s), true);
    }

    public void delete(Long id) {
        if (!solicitudRepository.existsById(id)) {
            throw new ResourceNotFoundException("Request not found");
        }
        solicitudRepository.deleteById(id);
    }

    public Map<String, Long> statistics() {
        Map<String, Long> stats = new LinkedHashMap<>();
        for (EstadoSolicitud e : EstadoSolicitud.values()) {
            stats.put(e.name(), solicitudRepository.countByStatus(e));
        }
        return stats;
    }

    private SolicitudResponse mapToResponse(Solicitud s, boolean isAdmin) {
        String serviceName = s.getServicio() != null ? s.getServicio().getName() : null;
        String notes = isAdmin ? s.getInternalNotes() : null;
        return new SolicitudResponse(s.getId(), s.getName(), s.getEmail(),
                s.getCompany(), s.getPhone(), s.getMessage(), serviceName,
                s.getStatus().name(), s.getCreatedAt(), notes);
    }
}