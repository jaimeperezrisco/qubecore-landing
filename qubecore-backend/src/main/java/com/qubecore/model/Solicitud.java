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
    private String name;

    @Column(nullable = false)
    private String email;

    private String company;
    private String phone;

    @Column(length = 2000)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitud status = EstadoSolicitud.PENDING;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(length = 500)
    private String internalNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "handled_by")
    private Usuario handledBy;
}
