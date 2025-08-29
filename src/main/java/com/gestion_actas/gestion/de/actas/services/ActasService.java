package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.*;
import com.gestion_actas.gestion.de.actas.repository.ActasRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActasService {

    @Autowired
    private ActasRepository actasRepository;

    // Listar todos los usuarios en DTO
    public List<ActasUsuarioDTO> listarUsuarios() {
        return actasRepository.findAll().stream().map(personal -> {
            ActasUsuarioDTO dto = new ActasUsuarioDTO();
            dto.setId(personal.getId());
            dto.setPeriodoPago(personal.getPeriodoPago());
            dto.setNombres(personal.getNombres());
            dto.setApePaterno(personal.getApePaterno());
            dto.setApeMaterno(personal.getApeMaterno());
            dto.setNroDocumento(personal.getNroDocumento());
            dto.setEstablecimiento(personal.getEstablecimiento());
            dto.setCargo(personal.getCargo());
            dto.setFechaIngreso(personal.getFechaIngreso() != null ? personal.getFechaIngreso().toString() : "");
            dto.setFechaTermino(personal.getFechaTermino() != null ? personal.getFechaTermino().toString() : "");

            // --- Suma de Ingresos ---
            double ingresos = 0.0;
            if (personal.getRmsCesfa() != null) ingresos += personal.getRmsCesfa().doubleValue();
            if (personal.getRuralCont() != null) ingresos += personal.getRuralCont().doubleValue();
            if (personal.getRmsEes() != null) ingresos += personal.getRmsEes().doubleValue();
            if (personal.getRimsEes() != null) ingresos += personal.getRimsEes().doubleValue();
            if (personal.getbExtTranVari() != null) ingresos += personal.getbExtTranVari().doubleValue();
            if (personal.getbExtTranFijo() != null) ingresos += personal.getbExtTranFijo().doubleValue();
            if (personal.getAsgVra30512() != null) ingresos += personal.getAsgVra30512().doubleValue();
            if (personal.getAsgRural30512() != null) ingresos += personal.getAsgRural30512().doubleValue();
            if (personal.getMontUniCons() != null) ingresos += personal.getMontUniCons().doubleValue();
            if (personal.getRms30512() != null) ingresos += personal.getRms30512().doubleValue();
            if (personal.getaCargEspLrm() != null) ingresos += personal.getaCargEspLrm().doubleValue();
            if (personal.getRemTransiEsfa() != null) ingresos += personal.getRemTransiEsfa().doubleValue();
            if (personal.getRims() != null) ingresos += personal.getRims().doubleValue();
            if (personal.getaCargDirGes() != null) ingresos += personal.getaCargDirGes().doubleValue();
            if (personal.getPalmasMagMaes() != null) ingresos += personal.getPalmasMagMaes().doubleValue();
            if (personal.getJorTrabAdLrm() != null) ingresos += personal.getJorTrabAdLrm().doubleValue();
            if (personal.getaCargDirLrm() != null) ingresos += personal.getaCargDirLrm().doubleValue();
            if (personal.getRimLey29944() != null) ingresos += personal.getRimLey29944().doubleValue();
            if (personal.getLey29702() != null) ingresos += personal.getLey29702().doubleValue();
            if (personal.getDs0652003Ef() != null) ingresos += personal.getDs0652003Ef().doubleValue();
            if (personal.getDu01199() != null) ingresos += personal.getDu01199().doubleValue();
            if (personal.getReintManNoAf() != null) ingresos += personal.getReintManNoAf().doubleValue();
            if (personal.getReintgManual() != null) ingresos += personal.getReintgManual().doubleValue();
            if (personal.getDu07397() != null) ingresos += personal.getDu07397().doubleValue();
            if (personal.getDl26504() != null) ingresos += personal.getDl26504().doubleValue();
            if (personal.getDs01193Ed() != null) ingresos += personal.getDs01193Ed().doubleValue();
            if (personal.getDifPensionable() != null) ingresos += personal.getDifPensionable().doubleValue();
            if (personal.getDs26191EfIgv() != null) ingresos += personal.getDs26191EfIgv().doubleValue();
            if (personal.getReunificada() != null) ingresos += personal.getReunificada().doubleValue();
            if (personal.getBonEspecial() != null) ingresos += personal.getBonEspecial().doubleValue();
            if (personal.getAguinaldo() != null) ingresos += personal.getAguinaldo().doubleValue();
            if (personal.getCvidDs15491Ef() != null) ingresos += personal.getCvidDs15491Ef().doubleValue();
            if (personal.getDse02192Pcm() != null) ingresos += personal.getDse02192Pcm().doubleValue();
            if (personal.getDs01994Pcm() != null) ingresos += personal.getDs01994Pcm().doubleValue();
            if (personal.getBonDu9096() != null) ingresos += personal.getBonDu9096().doubleValue();
            if (personal.getRefrigMov() != null) ingresos += personal.getRefrigMov().doubleValue();
            if (personal.getDu08094() != null) ingresos += personal.getDu08094().doubleValue();
            if (personal.getAsigDs081() != null) ingresos += personal.getAsigDs081().doubleValue();
            if (personal.getAsigDl25671() != null) ingresos += personal.getAsigDl25671().doubleValue();
            if (personal.getSueldoBase() != null) ingresos += personal.getSueldoBase().doubleValue();

            dto.setIngresos(ingresos);

            // --- Suma de Egresos ---
            double egresos = 0.0;
            if (personal.getDl19990Snp() != null) egresos += personal.getDl19990Snp().doubleValue();
            if (personal.getDsctoJudicial() != null) egresos += personal.getDsctoJudicial().doubleValue();
            if (personal.getDerrMagisteria() != null) egresos += personal.getDerrMagisteria().doubleValue();
            if (personal.getCoopCapacYupa() != null) egresos += personal.getCoopCapacYupa().doubleValue();
            if (personal.getIpssvida() != null) egresos += personal.getIpssvida().doubleValue();
            if (personal.getTardanzas() != null) egresos += personal.getTardanzas().doubleValue();
            if (personal.getDl25897Afp() != null) egresos += personal.getDl25897Afp().doubleValue();
            if (personal.getPagindnoaf() != null) egresos += personal.getPagindnoaf().doubleValue();
            if (personal.getQuintacat() != null) egresos += personal.getQuintacat().doubleValue();
            if (personal.getSegrimac() != null) egresos += personal.getSegrimac().doubleValue();
            if (personal.getCmcusco() != null) egresos += personal.getCmcusco().doubleValue();
            if (personal.getCmarequipa() != null) egresos += personal.getCmarequipa().doubleValue();
            if (personal.getInterbank() != null) egresos += personal.getInterbank().doubleValue();
            if (personal.getCmhuancayo() != null) egresos += personal.getCmhuancayo().doubleValue();
            if (personal.getPrderrmag() != null) egresos += personal.getPrderrmag().doubleValue();
            if (personal.getIdg() != null) egresos += personal.getIdg().doubleValue();
            if (personal.getFentase() != null) egresos += personal.getFentase().doubleValue();
            if (personal.getInasistencias() != null) egresos += personal.getInasistencias().doubleValue();
            if (personal.getAeherme() != null) egresos += personal.getAeherme().doubleValue();
            if (personal.getBripley() != null) egresos += personal.getBripley().doubleValue();
            if (personal.getCraccentro() != null) egresos += personal.getCraccentro().doubleValue();
            if (personal.getBcoPichincha() != null) egresos += personal.getBcoPichincha().doubleValue();
            if (personal.getGproeducar() != null) egresos += personal.getGproeducar().doubleValue();
            if (personal.getConstante() != null) egresos += personal.getConstante().doubleValue();
            if (personal.getSubcafae() != null) egresos += personal.getSubcafae().doubleValue();

            dto.setEgresos(egresos);

            return dto;
        }).collect(Collectors.toList());
    }



    // Obtener resumen de usuarios con query nativa
    public List<InicioTablaDTO> obtenerResumenUsuarios() {
        List<Object[]> resultados = actasRepository.obtenerResumenUsuarios();
        return resultados.stream()
                .map(row -> new InicioTablaDTO(
                        (String) row[0],
                        (String) row[1],
                        (String) row[2],
                        (String) row[3],
                        (String) row[4],
                        (String) row[5],
                        (String) row[6],
                        ((Number) row[7]).longValue()
                )).collect(Collectors.toList());
    }

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
    //entregar nombre por dni
    public String getNombrePrincipalPorNroDocumento(String nroDocumento) {
        return actasRepository.findNombreCompletoByNroDocumento(nroDocumento);
    }

    //CRUD
    // Obtener por ID
    public ActasPersonal obtenerPorId(Long id) {
        return actasRepository.findById(id).orElse(null);
    }

    public Optional<ActasPersonal> buscarPorId(Long id) {
        return actasRepository.findById(id);
    }
    public List<ActasPersonal> listarTodos() {
        return actasRepository.findAll();
    }

    public ActasPersonal guardar(ActasPersonal acta) {
        return actasRepository.save(acta);
    }

    public void eliminar(Long id) {
        actasRepository.deleteById(id);
    }


    //Version Angular
    public List<UsuarioResumenDTO> obtenerResumenUsuariosSinDuplicados() {
        List<Object[]> resultados = actasRepository.obtenerResumenUsuariosSinDuplicados();
        List<UsuarioResumenDTO> lista = new ArrayList<>();
        for(Object[] row : resultados){
            UsuarioResumenDTO dto = new UsuarioResumenDTO(
                    (String) row[0], // codigoModular
                    (String) row[1], // dni
                    ((String) row[2]) + " " + ((String) row[3]), // apellidos (concatenar)
                    (String) row[4], // nombres
                    (String) row[5], // cargo
                    (String) row[6], // codEstablecimiento
                    (String) row[7], // situacion
                    (String) row[8], // tPlanilla
                    (String) row[9], // region
                    ((Number) row[10]).intValue() // vecesRepetido
            );
            lista.add(dto);
        }
        return lista;
    }

    public UsuarioDetalleDTO obtenerFormularioPorDni(String dni) {
        // Cambia el repositorio para retornar una lista:
        List<Object[]> filas = actasRepository.findEmpleadoFormularioPorDni(dni);
        if (filas == null || filas.isEmpty()) return null; // Si no hay datos, retorna null

        Object[] fila = filas.get(0); // El primer (y único) resultado

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


}
