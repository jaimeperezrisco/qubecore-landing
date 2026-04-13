package com.qubecore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qubecore.dto.SolicitudRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SolicitudControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper mapper;

    @Test
    void crearSolicitud_debeRetornar201() throws Exception {
        SolicitudRequest dto = new SolicitudRequest();
        dto.setNombre("Ana García");
        dto.setEmail("ana@empresa.com");
        dto.setMensaje("Quiero información sobre Quantum Hardware Access");

        mockMvc.perform(post("/api/solicitudes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.estado").value("PENDIENTE"));
    }

    @Test
    void crearSolicitud_emailDuplicado_debeRetornar400() throws Exception {
        crearSolicitud_debeRetornar201();
        SolicitudRequest dto = new SolicitudRequest();
        dto.setEmail("ana@empresa.com");
        dto.setNombre("Otro");
        dto.setMensaje("Segundo intento");

        mockMvc.perform(post("/api/solicitudes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }
}
