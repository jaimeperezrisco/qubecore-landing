package com.qubecore.controller;

import com.qubecore.model.ServiceOffering;
import com.qubecore.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    @GetMapping
    public ResponseEntity<List<ServiceOffering>> list() {
        return ResponseEntity.ok(serviceOfferingService.listActive());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ServiceOffering> create(@RequestBody ServiceOffering serviceOffering) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceOfferingService.save(serviceOffering));
    }
}
