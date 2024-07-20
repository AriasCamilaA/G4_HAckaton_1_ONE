package com.back.service;

import com.back.model.entities.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RoleService {
    Role createRole(Role role);
    Optional<Role> getRoleById(Long id);
    List<Role> getAllRoles();
    Role updateRole(Long id, Role roleDetails);
    void deleteRole(Long id);
}
