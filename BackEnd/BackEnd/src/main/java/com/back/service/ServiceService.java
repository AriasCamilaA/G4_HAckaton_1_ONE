package com.back.service;

import com.back.model.entities.Service;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public interface ServiceService {
    Service createService(Service service);
    Optional<Service> getServiceById(Long id);
    List<Service> getAllServices();
    Service updateService(Long id, Service serviceDetails);
    void deleteService(Long id);
}
