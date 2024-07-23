package com.back.controller;

import com.back.model.entities.Key;
import com.back.model.entities.projection.IkeyDTO;
import com.back.service.KeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keys")
@RequiredArgsConstructor
public class KeyController {

    private final KeyService keyService;

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> createKey(@RequestBody Key key) {
        try {
            Key newKey = keyService.createKey(key);
            return ResponseEntity.ok(newKey);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating key: " + e.getMessage());
        }
    }

    @GetMapping("/service/{serviceId}")
    public List<IkeyDTO> getKeysByServiceId(@PathVariable Long serviceId) {
        try {
            return keyService.getKeysByService(serviceId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving keys by service: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getKeyById(@PathVariable Long id) {
        try {
            return keyService.getKeyById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving key: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllKeys() {
        try {
            return ResponseEntity.ok(keyService.getAllKeys());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all keys: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> updateKey(@PathVariable Long id, @RequestBody Key keyDetails) {
        try {
            Key updatedKey = keyService.updateKey(id, keyDetails);
            return ResponseEntity.ok(updatedKey);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating key: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deleteKey(@PathVariable Long id) {
        try {
            keyService.deleteKey(id);
            return ResponseEntity.ok("Key deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting key: " + e.getMessage());
        }
    }
}
