package com.back.service;

import com.back.model.entities.Key;
import com.back.model.entities.projection.IkeyDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface KeyService {

    Key createKey(Key key);
    Optional<Key> getKeyById(Long id);
    List<Key> getAllKeys();
    Key updateKey(Long id, Key keyDetails);
    void deleteKey(Long id);

    List<IkeyDTO> getKeysByService(Long serviceId);

}
