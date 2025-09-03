package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.*;
import com.gestion_actas.gestion.de.actas.services.ActasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActasController {
        //implementacion del servicio
        @Autowired
        private ActasService actasService;

        //Obtener detalles
        @GetMapping("/usuarios/{id}")
        public ActasPersonal obtenerUsuario(@PathVariable Long id) {
        return actasService.obtenerPorId(id);
    }

    @GetMapping("/usuarios/detalles")
    public List<DetalleActasDTO> obtenerDetallesSimples(@RequestParam String nroDocumento) {
        return actasService.getActasPorNroDocumento(nroDocumento);
    }


    @GetMapping("usuarios/detalle/{dni}")
    public ResponseEntity<UsuarioDetalleDTO> obtenerPorDni(@PathVariable String dni) {
        UsuarioDetalleDTO dto = actasService.obtenerFormularioPorDni(dni);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    //devolver el json de periodos
    @GetMapping("/periodo")
    public List<InicioPeriodosDTO> listarPeriodos() {
        return actasService.listarPeriodos();
    }

    //obtener los usuarios por cada periodo
    @GetMapping("/periodo/{periodoPago}")
    public List<UsuarioResumenDTO> listarUsuariosPorPeriodo(@PathVariable String periodoPago) {
        return actasService.obtenerUsuariosPorPeriodo(periodoPago);
    }
    @GetMapping("/usuarios/lista-unicos")
    public List<ListaUsuariosDTO> listarUsuariosUnicosPorDni() {
        return actasService.listarUsuariosUnicosPorDni();
    }

    /**
     * Endpoint para obtener todos los periodos de pago y id por un DNI.
     * GET /usuarios/periodos/{dni}
     * Devuelve los periodos de pago y el id de cada registro donde aparece el DNI.
     */
    @GetMapping("/usuarios/periodos/{dni}")
    public List<PeriodosDTO> listarPeriodosPorDni(@PathVariable String dni) {
        return actasService.listarPeriodosPorDni(dni);
    }

}
