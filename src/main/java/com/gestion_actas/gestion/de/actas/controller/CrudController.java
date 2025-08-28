package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.services.ActasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/crud")
public class CrudController {

    @Autowired
    private ActasService service;

    @GetMapping
    public List<ActasPersonal> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActasPersonal> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ActasPersonal crear(@RequestBody ActasPersonal acta) {
        return service.guardar(acta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActasPersonal> editar(@PathVariable Long id, @RequestBody ActasPersonal acta) {
        return service.buscarPorId(id).map(existing -> {
            acta.setId(id);
            return ResponseEntity.ok(service.guardar(acta));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}