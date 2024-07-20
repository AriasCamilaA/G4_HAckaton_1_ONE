package com.back.service;

import com.back.model.entities.Model;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ModelService {
    Model createModel(Model model);
    Optional<Model> getModelById(Long id);
    List<Model> getAllModels();
    Model updateModel(Long id, Model modelDetails);
    void deleteModel(Long id);
}
