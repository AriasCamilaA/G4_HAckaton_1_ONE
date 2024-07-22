package com.back.security.util.model;

import java.io.Serializable;
import java.util.Set;

public record User(String username,
                   String email,
                   String firstName,
                   String lastName,
                   String password,
                   Set<String> roles) implements Serializable {
}
