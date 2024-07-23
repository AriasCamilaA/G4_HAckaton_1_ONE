package com.back.controller;

import com.back.model.entities.Model;
import com.back.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/models")
@RequiredArgsConstructor
public class ModelController {

    private final ModelService modelService;

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> createModel(@RequestBody Model model) {
        try {
            Model newModel = modelService.createModel(model);
            return ResponseEntity.ok(newModel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating model: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getModelById(@PathVariable Long id) {
        try {
            return modelService.getModelById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving model: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllModels() {
        try {
            return ResponseEntity.ok(modelService.getAllModels());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all models: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> updateModel(@PathVariable Long id, @RequestBody Model modelDetails) {
        try {
            Model updatedModel = modelService.updateModel(id, modelDetails);
            return ResponseEntity.ok(updatedModel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating model: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deleteModel(@PathVariable Long id) {
        try {
            modelService.deleteModel(id);
            return ResponseEntity.ok("Model deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting model: " + e.getMessage());
        }
    }
}