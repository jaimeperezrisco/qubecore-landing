package com.qubecore.model;

import com.qubecore.model.enums.EstadoSolicitud;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String email;

    private String empresa;
    private String telefono;

    @Column(length = 2000)
    private String mensaje;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitud estado = EstadoSolicitud.PENDIENTE;

    @CreationTimestamp
    private LocalDateTime creadaEn;

    private LocalDateTime actualizadaEn;

    @Column(length = 500)
    private String notasInternas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gestionada_por")
    private Usuario gestionadaPor;
}
