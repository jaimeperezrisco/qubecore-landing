package com.qubecore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SolicitudRequest {
    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    private String email;

    private String empresa;
    private String telefono;

    @NotBlank
    @Size(max = 2000)
    private String mensaje;

    private Long servicioId;
}
