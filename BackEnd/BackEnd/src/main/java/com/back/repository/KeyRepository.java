package com.back.repository;

import com.back.model.entities.Key;
import com.back.model.entities.projection.IkeyDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KeyRepository extends IGenericRepo<Key, Long> {

    @Query("SELECT k.id as id, k.name as name, k.key as key, k.createdAt " +
            "as createdAt, k.expiresAt as expiresAt, s as service " +
            "FROM Key k JOIN k.service s WHERE k.service.id = :serviceId")
    List<IkeyDTO> findKeysByServiceId(@Param("serviceId") Long serviceId);

}
