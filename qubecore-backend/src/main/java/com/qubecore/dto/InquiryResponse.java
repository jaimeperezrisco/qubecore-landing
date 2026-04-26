package com.qubecore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class InquiryResponse {
    private Long id;
    private String name;
    private String email;
    private String company;
    private String phone;
    private String message;
    private String service;
    private String status;
    private LocalDateTime createdAt;
    private String internalNotes;
}
