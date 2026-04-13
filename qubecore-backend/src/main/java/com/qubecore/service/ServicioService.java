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

    public List<Servicio> listarActivos() {
        return servicioRepository.findByActivoTrueOrderByOrdenAsc();
    }

    public Servicio guardar(Servicio servicio) {
        return servicioRepository.save(servicio);
    }
}
