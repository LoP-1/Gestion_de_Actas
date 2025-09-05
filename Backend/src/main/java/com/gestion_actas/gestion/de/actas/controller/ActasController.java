package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.model.Actas_Personal;
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
    public Actas_Personal obtenerUsuario(@PathVariable Long id) {
        return actasService.obtenerPorId(id);
    }

    //Obtiene los detalles de un usuario al enviar el DNI
    @GetMapping("/usuarios/detalles")
    public List<DetalleActasDTO> obtenerDetallesSimples(@RequestParam String nroDocumento) {
        return actasService.getActasPorNroDocumento(nroDocumento);
    }

    //Tambien saca los detalles del usuario con DNI
    @GetMapping("usuarios/detalle/{dni}")
    public ResponseEntity<UsuarioDetalleDTO> obtenerPorDni(@PathVariable String dni) {
        UsuarioDetalleDTO dto = actasService.obtenerFormularioPorDni(dni);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    //devuelve un json de todos los periodos activos
    @GetMapping("/periodo")
    public List<InicioPeriodosDTO> listarPeriodos() {
        return actasService.listarPeriodos();
    }

    //obtener los usuarios usando los periodos como filtro
    @GetMapping("/periodo/{periodoPago}")
    public List<UsuarioResumenDTO> listarUsuariosPorPeriodo(@PathVariable String periodoPago) {
        return actasService.obtenerUsuariosPorPeriodo(periodoPago);
    }

    //lista los usuarios utilizando el DNI , evita mostrar repetidos
    @GetMapping("/usuarios/lista-unicos")
    public List<ListaUsuariosDTO> listarUsuariosUnicosPorDni() {
        return actasService.listarUsuariosUnicosPorDni();
    }

    //Obtiene la lista de periodos e id de cada usuario , usando el DNI como campo par realizar la busqueda
    @GetMapping("/usuarios/periodos/{dni}")
    public List<PeriodosDTO> listarPeriodosPorDni(@PathVariable String dni) {
        return actasService.listarPeriodosPorDni(dni);
    }
    @GetMapping("/descuentos")
    public ResponseEntity<List<DescuentosDTO>> getPeriodosEgresos(
            @RequestParam("nro_documento") String nroDocumento
    ) {
        if (nroDocumento == null || nroDocumento.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<DescuentosDTO> result = actasService.getPeriodosEgresosByNroDocumento(nroDocumento);
        return ResponseEntity.ok(result);
    }

}
