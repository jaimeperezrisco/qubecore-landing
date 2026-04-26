package com.qubecore.service;

import com.qubecore.model.ServiceOffering;
import com.qubecore.repository.ServiceOfferingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;

    public List<ServiceOffering> listActive() {
        return serviceOfferingRepository.findByActiveTrueOrderBySortOrderAsc();
    }

    public ServiceOffering save(ServiceOffering serviceOffering) {
        return serviceOfferingRepository.save(serviceOffering);
    }
}
