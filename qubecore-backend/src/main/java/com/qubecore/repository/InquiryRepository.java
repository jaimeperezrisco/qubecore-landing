package com.qubecore.repository;

import com.qubecore.model.Inquiry;
import com.qubecore.model.enums.InquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByStatus(InquiryStatus status);
    List<Inquiry> findByOrderByCreatedAtDesc();
    long countByStatus(InquiryStatus status);
}