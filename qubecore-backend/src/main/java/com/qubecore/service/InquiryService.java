package com.qubecore.service;

import com.qubecore.dto.CreateInquiryRequest;
import com.qubecore.dto.InquiryResponse;
import com.qubecore.exception.ResourceNotFoundException;
import com.qubecore.model.ServiceOffering;
import com.qubecore.model.Inquiry;
import com.qubecore.model.enums.InquiryStatus;
import com.qubecore.repository.ServiceOfferingRepository;
import com.qubecore.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final ServiceOfferingRepository serviceOfferingRepository;

    public InquiryResponse create(CreateInquiryRequest dto) {
        Inquiry inquiry = new Inquiry();
        inquiry.setName(dto.getName());
        inquiry.setEmail(dto.getEmail());
        inquiry.setCompany(dto.getCompany());
        inquiry.setPhone(dto.getPhone());
        inquiry.setMessage(dto.getMessage());

        if (dto.getServiceId() != null) {
            ServiceOffering serviceOffering = serviceOfferingRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
            inquiry.setServiceOffering(serviceOffering);
        }

        Inquiry saved = inquiryRepository.save(inquiry);
        return mapToResponse(saved, false);
    }

    public List<InquiryResponse> listAll() {
        return inquiryRepository.findByOrderByCreatedAtDesc()
                .stream().map(inquiry -> mapToResponse(inquiry, true)).toList();
    }

    public List<InquiryResponse> listByStatus(InquiryStatus status) {
        return inquiryRepository.findByStatus(status)
                .stream().map(inquiry -> mapToResponse(inquiry, true)).toList();
    }

    public InquiryResponse updateStatus(Long id, InquiryStatus status, String notes) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found"));
        inquiry.setStatus(status);
        if (notes != null) {
            inquiry.setInternalNotes(notes);
        }
        inquiry.setUpdatedAt(LocalDateTime.now());
        return mapToResponse(inquiryRepository.save(inquiry), true);
    }

    public void delete(Long id) {
        if (!inquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inquiry not found");
        }
        inquiryRepository.deleteById(id);
    }

    public Map<String, Long> statistics() {
        Map<String, Long> stats = new LinkedHashMap<>();
        for (InquiryStatus inquiryStatus : InquiryStatus.values()) {
            stats.put(inquiryStatus.name(), inquiryRepository.countByStatus(inquiryStatus));
        }
        return stats;
    }

    private InquiryResponse mapToResponse(Inquiry inquiry, boolean isAdmin) {
        String serviceName = inquiry.getServiceOffering() != null ? inquiry.getServiceOffering().getName() : null;
        String notes = isAdmin ? inquiry.getInternalNotes() : null;
        return new InquiryResponse(inquiry.getId(), inquiry.getName(), inquiry.getEmail(),
                inquiry.getCompany(), inquiry.getPhone(), inquiry.getMessage(), serviceName,
                inquiry.getStatus().name(), inquiry.getCreatedAt(), notes);
    }
}
