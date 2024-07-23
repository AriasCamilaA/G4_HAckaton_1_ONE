package com.back.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String idKeycloak;

    @ElementCollection
    private Set<String> roles;
}
