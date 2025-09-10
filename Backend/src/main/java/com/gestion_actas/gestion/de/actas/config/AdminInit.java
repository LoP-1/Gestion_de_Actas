package com.gestion_actas.gestion.de.actas.config;

import com.gestion_actas.gestion.de.actas.model.Personal;
import com.gestion_actas.gestion.de.actas.services.PersonalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//creacion del super usuario admin
@Configuration
public class AdminInit {

    private static final Logger log = LoggerFactory.getLogger(AdminInit.class);

    @Value("${admin.bootstrap.enabled:true}")
    private boolean bootstrapEnabled;

    @Value("${admin.dni:99999999}")
    private String adminDni;

    @Value("${admin.password:admin}")
    private String adminPassword;

    @Value("${admin.nombre:Admin}")
    private String adminNombre;

    @Value("${admin.apellido:System}")
    private String adminApellido;

    @Bean
    public ApplicationRunner bootstrapAdmin(PersonalService personalService) {
        return args -> {
            if (!bootstrapEnabled) {
                log.info("Admin bootstrap deshabilitado (admin.bootstrap.enabled=false)");
                return;
            }

            var existente = personalService.buscarPorDni(adminDni);
            if (existente.isPresent()) {
                log.info("Usuario ADMIN inicial ya existe (dni={}), no se crea otro.", adminDni);
                return;
            }

            Personal admin = new Personal();
            admin.setDni(adminDni);
            admin.setNombre(adminNombre);
            admin.setApellido(adminApellido);
            admin.setRol("ADMIN");
            admin.setContrasena(adminPassword);

            Personal creado = personalService.registrarUsuario(admin);
            log.info("Usuario ADMIN inicial creado (id={}, dni={}). Cambia la contraseña tras el primer login.",
                    creado.getId(), creado.getDni());
        };
    }
}