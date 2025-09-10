package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.components.JwtUtil;
import com.gestion_actas.gestion.de.actas.model.Personal;
import com.gestion_actas.gestion.de.actas.services.PersonalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//controlador del login
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PersonalService personalService;
    @Autowired
    private JwtUtil jwtUtil;
    //ruta para hacer login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Personal usuario) {
        return personalService.login(usuario.getDni(), usuario.getContrasena())
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getDni(), user.getRol());
                    // Devolver token y rol en un Map
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("rol", user.getRol());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> error = new HashMap<>();
                    error.put("error", "Credenciales incorrectas");
                    return ResponseEntity.status(401).body(error);
                });
    }
    //ruta para registrarse
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Personal usuario) {
        if (personalService.buscarPorDni(usuario.getDni()).isPresent()) {
            return ResponseEntity.badRequest().body("Ya existe un usuario con el DNI ingresado");
        }
        Personal nuevo = personalService.registrarUsuario(usuario);
        return ResponseEntity.ok(nuevo);
    }
}
