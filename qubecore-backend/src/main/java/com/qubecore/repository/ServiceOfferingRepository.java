package com.qubecore.repository;

import com.qubecore.model.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {
    List<ServiceOffering> findByActiveTrueOrderBySortOrderAsc();
}