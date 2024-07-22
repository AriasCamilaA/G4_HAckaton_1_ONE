package com.back.model.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CollectionType;

import java.util.List;
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
    private String password;
    private String email;
    @ElementCollection
    private Set<String> roles;
}
