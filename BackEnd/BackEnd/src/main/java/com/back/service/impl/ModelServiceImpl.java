package com.back.service.impl;

import com.back.model.entities.Model;
import com.back.repository.ModelRepository;
import com.back.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModelServiceImpl implements ModelService {

    @Autowired
    private ModelRepository modelRepository;

    @Override
    public Model createModel(Model model) {
        try {
            return modelRepository.save(model);
        } catch (Exception e) {
            throw new RuntimeException("Error creating model: " + e.getMessage());
        }
    }

    @Override
    public Optional<Model> getModelById(Long id) {
        try {
            return modelRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving model with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public List<Model> getAllModels() {
        try {
            return modelRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all models: " + e.getMessage());
        }
    }

    @Override
    public Model updateModel(Long id, Model modelDetails) {
        try {
            return modelRepository.findById(id)
                    .map(model -> {
                        model.setName(modelDetails.getName());
//                        model.setKey(modelDetails.getKey());
                        model.setScript(modelDetails.getScript());
                        return modelRepository.save(model);
                    }).orElseThrow(() -> new RuntimeException("Model not found with id " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error updating model with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public void deleteModel(Long id) {
        try {
            modelRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting model with id " + id + ": " + e.getMessage());
        }
    }
}
