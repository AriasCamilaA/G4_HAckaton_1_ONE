package com.back.model.entities.projection;

import com.back.model.entities.Model;
import com.back.model.entities.Service;
import com.back.model.entities.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public interface IkeyDTO {
    Long getId();
    String getName();
    String getKey();
    LocalDateTime getCreatedAt();
    LocalDateTime getExpiresAt();
    Service getService();
}


