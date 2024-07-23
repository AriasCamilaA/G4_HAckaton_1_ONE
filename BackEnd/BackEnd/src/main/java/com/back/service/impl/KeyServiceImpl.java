package com.back.service.impl;

import com.back.model.entities.Key;
import com.back.model.entities.User;
import com.back.model.entities.projection.IkeyDTO;
import com.back.repository.KeyRepository;
import com.back.repository.UserRepository;
import com.back.security.util.AuthService;
import com.back.service.KeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KeyServiceImpl implements KeyService {

    private final KeyRepository keyRepository;
    private final UserRepository userRepository;

    @Override
    public Key createKey(Key key) {
        try {
            User userLogeado= userRepository.findByIdKeycloak(AuthService.getAuthenticatedUserId());
            key.setUser(userRepository.findById(userLogeado.getId()).orElseThrow());
            return keyRepository.save(key);
        } catch (Exception e) {
            throw new RuntimeException("Error creating key: " + e.getMessage());
        }
    }

    @Override
    public Optional<Key> getKeyById(Long id) {
        try {
            return keyRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving key with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public List<Key> getAllKeys() {
        try {
            return keyRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all keys: " + e.getMessage());
        }
    }

    @Override
    public Key updateKey(Long id, Key keyDetails) {
        try {
            return keyRepository.findById(id)
                    .map(key -> {
                        key.setName(keyDetails.getName());
                        key.setKey(keyDetails.getKey());
                        key.setCreatedAt(keyDetails.getCreatedAt());
                        key.setExpiresAt(keyDetails.getExpiresAt());
                        key.setService(keyDetails.getService());
//                        key.setUser(keyDetails.getUser());
                        return keyRepository.save(key);
                    }).orElseThrow(() -> new RuntimeException("Key not found with id " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error updating key with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public void deleteKey(Long id) {
        try {
            keyRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting key with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public List<IkeyDTO> getKeysByService(Long serviceId) {
        try {
            return keyRepository.findKeysByServiceId(serviceId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving keys by service: " + e.getMessage());
        }
    }
}
