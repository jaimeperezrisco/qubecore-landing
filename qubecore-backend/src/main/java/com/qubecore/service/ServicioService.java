package com.qubecore.service;

import com.qubecore.model.Servicio;
import com.qubecore.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public List<Servicio> listActive() {
        return servicioRepository.findByActivoTrueOrderBySortOrderAsc();
    }

    public Servicio save(Servicio servicio) {
        return servicioRepository.save(servicio);
    }
}