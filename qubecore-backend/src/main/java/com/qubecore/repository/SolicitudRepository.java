package com.qubecore.repository;

import com.qubecore.model.Solicitud;
import com.qubecore.model.enums.EstadoSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    boolean existsByEmail(String email);
    List<Solicitud> findByEstado(EstadoSolicitud estado);
    List<Solicitud> findByOrderByCreadaEnDesc();
    long countByEstado(EstadoSolicitud estado);
}
