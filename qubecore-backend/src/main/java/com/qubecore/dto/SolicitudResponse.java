package com.qubecore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SolicitudResponse {
    private Long id;
    private String nombre;
    private String email;
    private String empresa;
    private String telefono;
    private String mensaje;
    private String servicio;
    private String estado;
    private LocalDateTime creadaEn;
    private String notasInternas;
}
