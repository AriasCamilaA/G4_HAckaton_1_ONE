package com.back.service.impl;

import com.back.model.entities.Role;
import com.back.repository.RoleRepository;
import com.back.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role createRole(Role role) {
        try {
            return roleRepository.save(role);
        } catch (Exception e) {
            throw new RuntimeException("Error creating role: " + e.getMessage());
        }
    }

    @Override
    public Optional<Role> getRoleById(Long id) {
        try {
            return roleRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving role with id " + id + ": " + e.getMessage());
        }
    }

    @Override
    public List<Role> getAllRoles() {
        try {
            return roleRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all roles: " + e.getMessage());
        }
    }

    @Override
    public Role updateRole(Long id, Role roleDetails) {
        return roleRepository.findById(id)
                .map(role -> {
                    role.setName(roleDetails.getName());
                    return roleRepository.save(role);
                }).orElseThrow(() -> new RuntimeException("Role not found with id " + id));
    }

    @Override
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found with id " + id);
        }
        roleRepository.deleteById(id);
    }
}
