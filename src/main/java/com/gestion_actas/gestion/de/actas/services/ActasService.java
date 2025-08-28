package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.ActasUsuarioDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.DetalleActasDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.InicioTablaDTO;
import com.gestion_actas.gestion.de.actas.repository.ActasRepository;
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


}
