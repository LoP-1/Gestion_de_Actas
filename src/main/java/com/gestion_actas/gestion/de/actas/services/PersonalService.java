package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.model.Personal;
import com.gestion_actas.gestion.de.actas.repository.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonalService {

    @Autowired
    private PersonalRepository personalRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Personal registrarUsuario(Personal usuario) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return personalRepository.save(usuario);
    }

    public Optional<Personal> login(String dni, String contrasena) {
        Optional<Personal> userOpt = personalRepository.findByDni(dni);
        if (userOpt.isPresent()) {
            Personal user = userOpt.get();
            if (passwordEncoder.matches(contrasena, user.getContrasena())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public Optional<Personal> buscarPorDni(String dni) {
        return personalRepository.findByDni(dni);
    }
}
