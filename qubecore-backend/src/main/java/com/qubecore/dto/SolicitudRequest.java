package com.qubecore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SolicitudRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    private String company;

    @Pattern(regexp = "^[+]?\\d*$", message = "Phone must contain only numbers and +")
    private String phone;

    @NotBlank
    @Size(max = 2000)
    private String message;

    private Long serviceId;
}
