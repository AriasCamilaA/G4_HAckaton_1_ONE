package com.back.service.impl;

import com.back.model.entities.Service;
import com.back.repository.ServiceRepository;
import com.back.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public Service createService(Service service) {
        try {
            return serviceRepository.save(service);
        } catch (Exception e) {
            throw new RuntimeException("Error creating service: " + e.getMessage());
        }
    }

    @Override
    public Optional<Service> getServiceById(Long id) {
        try {
            return serviceRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving service with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public List<Service> getAllServices() {
        try {
            return serviceRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all services: " + e.getMessage());
        }
    }

    @Override
    public Service updateService(Long id, Service serviceDetails) {
        return serviceRepository.findById(id)
                .map(service -> {
                    service.setName(serviceDetails.getName());
                    return serviceRepository.save(service);
                }).orElseThrow(() -> new RuntimeException("Service not found with id " + id));
    }

    @Override
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new RuntimeException("Service not found with id " + id);
        }
        serviceRepository.deleteById(id);
    }
}
