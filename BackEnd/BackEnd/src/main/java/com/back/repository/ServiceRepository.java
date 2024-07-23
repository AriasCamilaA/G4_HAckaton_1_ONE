package com.back.repository;

import com.back.model.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends IGenericRepo<Service, Long> {
}
