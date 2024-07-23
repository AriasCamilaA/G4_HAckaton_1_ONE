package com.back.controller;

import com.back.model.entities.Service;
import com.back.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> createService(@RequestBody Service service) {
        try {
            Service newService = serviceService.createService(service);
            return ResponseEntity.ok(newService);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating service: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getServiceById(@PathVariable Long id) {
        try {
            return serviceService.getServiceById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving service: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllServices() {
        try {
            return ResponseEntity.ok(serviceService.getAllServices());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all services: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Service serviceDetails) {
        try {
            Service updatedService = serviceService.updateService(id, serviceDetails);
            return ResponseEntity.ok(updatedService);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating service: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        try {
            serviceService.deleteService(id);
            return ResponseEntity.ok("Service deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting service: " + e.getMessage());
        }
    }
}