package com.back.controller;

import com.back.model.entities.Model;
import com.back.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/models")
public class ModelController {
    @Autowired
    private ModelService modelService;

    @PostMapping
    public ResponseEntity<?> createModel(@RequestBody Model model) {
        try {
            Model newModel = modelService.createModel(model);
            return ResponseEntity.ok(newModel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating model: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
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
    public ResponseEntity<?> getAllModels() {
        try {
            return ResponseEntity.ok(modelService.getAllModels());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all models: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateModel(@PathVariable Long id, @RequestBody Model modelDetails) {
        try {
            Model updatedModel = modelService.updateModel(id, modelDetails);
            return ResponseEntity.ok(updatedModel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating model: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModel(@PathVariable Long id) {
        try {
            modelService.deleteModel(id);
            return ResponseEntity.ok("Model deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting model: " + e.getMessage());
        }
    }
}