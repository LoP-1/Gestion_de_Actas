package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.ActasUsuarioDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.DetalleActasDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.InicioTablaDTO;
import com.gestion_actas.gestion.de.actas.services.ActasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActasController {
        @Autowired
        private ActasService actasService;

        @GetMapping("/usuarios")
        public List<ActasUsuarioDTO> listarUsuarios() {
            return actasService.listarUsuarios();
        }

        @GetMapping("/usuarios/{id}")
        public ActasPersonal obtenerUsuario(@PathVariable Long id) {
        return actasService.obtenerPorId(id);
    }

    @GetMapping("/usuarios/resumen")
    public List<InicioTablaDTO> obtenerResumenUsuarios() {
        return actasService.obtenerResumenUsuarios();
    }

    @GetMapping("/usuarios/detalles")
    public List<DetalleActasDTO> obtenerDetallesSimples(@RequestParam String nroDocumento) {
        return actasService.getActasPorNroDocumento(nroDocumento);
    }

    @GetMapping("/usuarios/nombre")
    public ResponseEntity<String> getNombrePrincipal(
            @RequestParam String nroDocumento) {
        String nombre = actasService.getNombrePrincipalPorNroDocumento(nroDocumento);
        return ResponseEntity.ok(nombre != null ? nombre : "");
    }



}
