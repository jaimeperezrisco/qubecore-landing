package com.qubecore.repository;

import com.qubecore.model.Solicitud;
import com.qubecore.model.enums.EstadoSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    boolean existsByEmail(String email);
    List<Solicitud> findByStatus(EstadoSolicitud status);
    List<Solicitud> findByOrderByCreatedAtDesc();
    long countByStatus(EstadoSolicitud status);
}