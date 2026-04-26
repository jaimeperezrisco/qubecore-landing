package com.qubecore.controller;

import com.qubecore.dto.CreateInquiryRequest;
import com.qubecore.dto.InquiryResponse;
import com.qubecore.model.enums.InquiryStatus;
import com.qubecore.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping("/inquiries")
    public ResponseEntity<InquiryResponse> create(@Valid @RequestBody CreateInquiryRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inquiryService.create(dto));
    }

    @GetMapping("/admin/inquiries")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InquiryResponse>> list(
            @RequestParam(required = false) InquiryStatus status) {
        if (status != null) {
            return ResponseEntity.ok(inquiryService.listByStatus(status));
        }
        return ResponseEntity.ok(inquiryService.listAll());
    }

    @PatchMapping("/admin/inquiries/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InquiryResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam InquiryStatus status,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(inquiryService.updateStatus(id, status, notes));
    }

    @DeleteMapping("/admin/inquiries/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inquiryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/inquiries/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> statistics() {
        return ResponseEntity.ok(inquiryService.statistics());
    }
}
