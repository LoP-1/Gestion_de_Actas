package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.*;
import com.gestion_actas.gestion.de.actas.repository.ActasRepository;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActasService {

    @Autowired
    private ActasRepository actasRepository;

    //cargar detalles basicos para la segunda ventana
    public List<DetalleActasDTO> getActasPorNroDocumento(String nroDocumento) {
        List<Object[]> resultados = actasRepository.findActasByNroDocumento(nroDocumento);
        return resultados.stream().map(row -> new DetalleActasDTO(
                row[0] != null ? ((Number) row[0]).longValue() : null,  // id
                (String) row[1],                                        // periodo_pago
                (String) row[2],                                        // codigo modular
                row[3] != null ? ((Number) row[3]).doubleValue() : null // total_remuneracion
        )).collect(Collectors.toList());
    }

    // Obtener por ID
    public ActasPersonal obtenerPorId(Long id) {
        return actasRepository.findById(id).orElse(null);
    }


    public List<UsuarioResumenDTO> obtenerUsuariosPorPeriodo(String periodoPago) {
        List<Object[]> resultados = actasRepository.ListarUsuariosPorPeriodo(periodoPago);
        List<UsuarioResumenDTO> lista = new ArrayList<>();
        for(Object[] row : resultados){
            UsuarioResumenDTO dto = new UsuarioResumenDTO(
                    ((Number) row[0]).longValue(), // id
                    (String) row[1], // codigoModular
                    (String) row[2], // dni
                    ((String) row[3]) + " " + ((String) row[4]), // apellidos (concatenar)
                    (String) row[5], // nombres
                    (String) row[6], // cargo
                    (String) row[7], // cargoOrig
                    (String) row[8], // codEstablecimiento
                    (String) row[9], // situacion
                    (String) row[10], // tPlanilla
                    (String) row[11] // region
            );
            lista.add(dto);
        }
        return lista;
    }




    public UsuarioDetalleDTO obtenerFormularioPorDni(String dni) {
        // Cambia el repositorio para retornar una lista:
        List<Object[]> filas = actasRepository.findEmpleadoFormularioPorDni(dni);
        if (filas == null || filas.isEmpty()) return null; // Si no hay datos, retorna null

        Object[] fila = filas.get(0);

        UsuarioDetalleDTO dto = new UsuarioDetalleDTO();
        int i = 0;
        dto.setCodigoModular(asString(fila[i++]));         // "codigo modular"
        dto.setCargo(asString(fila[i++]));                 // "cargo"
        dto.setApePaterno(asString(fila[i++]));            // "ape_paterno"
        dto.setApeMaterno(asString(fila[i++]));            // "ape_materno"
        dto.setNombres(asString(fila[i++]));               // "nombres"
        dto.settPlanilla(asString(fila[i++]));             // "t_planilla"
        dto.setSituacion(asString(fila[i++]));             // "situación"
        dto.setFechaNacimiento(asLocalDate(fila[i++]));    // "fecha_nacimiento"
        dto.setSexo(asString(fila[i++]));                  // "sexo"
        dto.setUgel(asString(fila[i++]));                  // "ugel"
        dto.setCodEstablecimiento(asString(fila[i++]));    // "cod_establecimiento"
        dto.setEstablecimiento(asString(fila[i++]));       // "establecimiento"
        dto.setCodModIE(asString(fila[i++]));              // "cod_nexus"
        dto.setTipoDocumento(asString(fila[i++]));         // "tipo_documento"
        dto.setNroDocumento(asString(fila[i++]));          // "nro_documento"
        dto.setFechaIngreso(asLocalDate(fila[i++]));       // "fecha_ingreso"
        dto.setFechaTermino(asLocalDate(fila[i++]));       // "fecha_término"
        dto.setDocReferencia(asString(fila[i++]));         // "doc_referencia"
        dto.setCargoOrig(asString(fila[i++]));             // "cargo/orig"
        dto.setIpss(asString(fila[i++]));                  // "ipss"
        dto.setRegPensionario(asString(fila[i++]));        // "reg_pensionario"
        dto.setCadPresupuestal(asString(fila[i++]));       // "cad_presupuestal"
        dto.setAfp(asString(fila[i++]));                   // "afp"
        dto.setCuspp(asString(fila[i++]));                 // "cuspp"
        dto.setFechaAfiliacion(asLocalDate(fila[i++]));    // "fecha_afiliación"
        dto.setFechaDevengue(asLocalDate(fila[i++]));      // "fecha_devengue"
        dto.setRegLaboral(asString(fila[i++]));            // "reg_laboral"
        dto.setNivel(asString(fila[i++]));                 // "nivel"
        dto.setNivelMagisterial(asString(fila[i++]));      // "nivel_magisterial"
        dto.setModoPago(asString(fila[i++]));              // "modo_pago"
        dto.setLeyendaPermanente(asString(fila[i++]));     // "leyenda_permanente"
        dto.setCtaCte(asString(fila[i++]));                // "cta_cte"

        return dto;
    }

    private String asString(Object o) {
        return o == null ? null : o.toString();
    }
    private LocalDate asLocalDate(Object o) {
        if (o == null) return null;
        if (o instanceof LocalDate) return (LocalDate) o;
        if (o instanceof Date) return ((Date) o).toLocalDate();
        try { return LocalDate.parse(o.toString()); } catch (Exception e) { return null; }
    }

    // Listar todos los periodos con datos adicionales
    public List<InicioPeriodosDTO> listarPeriodos() {
        List<String> periodos = actasRepository.ListarPeriodoPago();
        List<InicioPeriodosDTO> periodosPago = new ArrayList<>();
        for (String periodo : periodos) {
            periodosPago.add(new InicioPeriodosDTO(periodo));
        }
        return periodosPago;
    }

    /**
     * Servicio para listar todos los usuarios únicos por DNI.
     * Devuelve una lista de ListaUsuariosDTO.
     */
    public List<ListaUsuariosDTO> listarUsuariosUnicosPorDni() {
        List<Object[]> resultados = actasRepository.listarUsuariosUnicosPorDni();
        return resultados.stream()
                .map(row -> new ListaUsuariosDTO(
                        row[0] != null ? ((Number) row[0]).longValue() : null, // id
                        (String) row[1], // dni
                        (String) row[2], // nombres
                        (String) row[3], // apellido (concatenado)
                        (String) row[4]  // codigoModular
                )).collect(Collectors.toList());
    }

    /**
     * Servicio que, dado un DNI, devuelve los periodos de pago y el id de cada registro.
     * Devuelve una lista de PeriodosDTO.
     */
    public List<PeriodosDTO> listarPeriodosPorDni(String dni) {
        List<Object[]> resultados = actasRepository.listarPeriodosPorDni(dni);
        return resultados.stream()
                .map(row -> new PeriodosDTO(
                        row[0] != null ? ((Number) row[0]).longValue() : null, // id
                        (String) row[1] // periodoPago
                )).collect(Collectors.toList());
    }

}
