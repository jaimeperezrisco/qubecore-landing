package com.qubecore.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qubecore.dto.CreateInquiryRequest;
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
class InquiryControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper mapper;

    @Test
    void createRequest_shouldReturn201() throws Exception {
        CreateInquiryRequest dto = new CreateInquiryRequest();
        dto.setName("Ana García");
        dto.setEmail("ana@empresa.com");
        dto.setMessage("Quiero información sobre Quantum Hardware Access");

        mockMvc.perform(post("/api/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void createRequest_duplicateEmail_shouldReturn400() throws Exception {
        createRequest_shouldReturn201();
        CreateInquiryRequest dto = new CreateInquiryRequest();
        dto.setEmail("ana@empresa.com");
        dto.setName("Otro");
        dto.setMessage("Segundo intento");

        mockMvc.perform(post("/api/inquiries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
            .andExpect(status().isBadRequest());
    }
}
