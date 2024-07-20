package com.back.controller;

import com.back.model.entities.Role;
import com.back.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<?> createRole(@RequestBody Role role) {
        try {
            Role newRole = roleService.createRole(role);
            return ResponseEntity.ok(newRole);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating role: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable Long id) {
        try {
            return roleService.getRoleById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving role: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRoles() {
        try {
            return ResponseEntity.ok(roleService.getAllRoles());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all roles: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @RequestBody Role roleDetails) {
        try {
            Role updatedRole = roleService.updateRole(id, roleDetails);
            return ResponseEntity.ok(updatedRole);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating role: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) {
        try {
            roleService.deleteRole(id);
            return ResponseEntity.ok("Role deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting role: " + e.getMessage());
        }
    }
}