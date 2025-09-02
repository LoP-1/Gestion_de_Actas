package com.gestion_actas.gestion.de.actas.components;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Component
public class CsvValidator {
    private static final int COLUMN_COUNT = 116;

    public void validateRow(String[] data, int filaActual) {
        if (data.length < COLUMN_COUNT) {
            throw new RuntimeException(MensajesErrorCsv.columnaInsuficiente(filaActual, data.length, COLUMN_COUNT));
        }
    }

    public ActasPersonal mapRowToActasPersonal(String[] data) {
        ActasPersonal lp = new ActasPersonal();
        lp.setPeriodoPago(trimOrNull(data[0]));
        lp.setFechaIngreso(parseFecha(data[1]));
        lp.setFechaTermino(parseFecha(data[2]));
        lp.setDocReferencia(trimOrNull(data[3]));
        lp.setCodigoModular(trimOrNull(data[4]));
        lp.setAirhsp(trimOrNull(data[5]));
        lp.setCargo(trimOrNull(data[6]));
        lp.setApePaterno(trimOrNull(data[7]));
        lp.setApeMaterno(trimOrNull(data[8]));
        lp.setNombres(trimOrNull(data[9]));
        lp.setSituacion(trimOrNull(data[10]));
        lp.setDiasLicencia(parseInt(data[11]));
        lp.setFecinilic(parseFecha(data[12]));
        lp.settPlanilla(trimOrNull(data[13]));
        lp.setFechaNacimiento(parseFecha(data[14]));
        lp.setSexo(trimOrNull(data[15]));
        lp.setTipoDocumento(trimOrNull(data[16]));
        lp.setNroDocumento(trimOrNull(data[17]));
        lp.setIpss(trimOrNull(data[18]));
        lp.setRegPensionario(trimOrNull(data[19]));
        lp.setCodNexus(trimOrNull(data[20]));
        lp.setAfp(trimOrNull(data[21]));
        lp.setCuspp(trimOrNull(data[22]));
        lp.setFechaAfiliacion(parseFecha(data[23]));
        lp.setFechaDevengue(parseFecha(data[24]));
        lp.setUgel(trimOrNull(data[25]));
        lp.setCodEstablecimiento(trimOrNull(data[26]));
        lp.setEstablecimiento(trimOrNull(data[27]));
        lp.setNivel(trimOrNull(data[28]));
        lp.setCaractEstablecimiento(parseInt(data[29]));
        lp.setUnidCosteo(trimOrNull(data[30]));
        lp.setCargoOrig(trimOrNull(data[31]));
        lp.setLeyendaPermanente(trimOrNull(data[32]));
        lp.setModoPago(trimOrNull(data[33]));
        lp.setCtaCte(trimOrNull(data[34]));
        // data[35] vacío (doble punto y coma)
        lp.setDiasTrabajados(parseInt(data[36]));
        lp.setDecimas(parseInt(data[37]));
        lp.setRegLaboral(trimOrNull(data[38]));
        lp.setTipoServidor(trimOrNull(data[39]));
        lp.setNivelMagisterial(trimOrNull(data[40]));
        lp.setCodcomuna(trimOrNull(data[41]));
        lp.setGrupoRemunerativo(trimOrNull(data[42]));
        lp.setJornadaLaboral(trimOrNull(data[43]));
        lp.setTiempoServicio(trimOrNull(data[44]));
        lp.setCadPresupuestal(trimOrNull(data[45]));
        lp.setTimpopen(trimOrNull(data[46]));
        lp.setTributable(parseBigDecimal(data[47]));
        lp.setImponible(parseBigDecimal(data[48]));
        lp.setTotalRemuneracion(parseBigDecimal(data[49]));
        lp.setTotalLiquido(parseBigDecimal(data[50]));
        lp.setRmsCesfa(parseBigDecimal(data[51]));
        lp.setRuralCont(parseBigDecimal(data[52]));
        lp.setRmsEes(parseBigDecimal(data[53]));
        lp.setRimsEes(parseBigDecimal(data[54]));
        lp.setbExtTranVari(parseBigDecimal(data[55]));
        lp.setbExtTranFijo(parseBigDecimal(data[56]));
        lp.setAsgVra30512(parseBigDecimal(data[57]));
        lp.setAsgRural30512(parseBigDecimal(data[58]));
        lp.setMontUniCons(parseBigDecimal(data[59]));
        lp.setRms30512(parseBigDecimal(data[60]));
        lp.setaCargEspLrm(parseBigDecimal(data[61]));
        lp.setRemTransiEsfa(parseBigDecimal(data[62]));
        lp.setRims(parseBigDecimal(data[63]));
        lp.setaCargDirGes(parseBigDecimal(data[64]));
        lp.setPalmasMagMaes(parseBigDecimal(data[65]));
        lp.setJorTrabAdLrm(parseBigDecimal(data[66]));
        lp.setaCargDirLrm(parseBigDecimal(data[67]));
        lp.setRimLey29944(parseBigDecimal(data[68]));
        lp.setLey29702(parseBigDecimal(data[69]));
        lp.setDs0652003Ef(parseBigDecimal(data[70]));
        lp.setDu01199(parseBigDecimal(data[71]));
        lp.setReintManNoAf(parseBigDecimal(data[72]));
        lp.setReintgManual(parseBigDecimal(data[73]));
        lp.setDu07397(parseBigDecimal(data[74]));
        lp.setDl26504(parseBigDecimal(data[75]));
        lp.setDs01193Ed(parseBigDecimal(data[76]));
        lp.setDifPensionable(parseBigDecimal(data[77]));
        lp.setDs26191EfIgv(parseBigDecimal(data[78]));
        lp.setReunificada(parseBigDecimal(data[79]));
        lp.setBonEspecial(parseBigDecimal(data[80]));
        lp.setAguinaldo(parseBigDecimal(data[81]));
        lp.setCvidDs15491Ef(parseBigDecimal(data[82]));
        lp.setDse02192Pcm(parseBigDecimal(data[83]));
        lp.setDs01994Pcm(parseBigDecimal(data[84]));
        lp.setBonDu9096(parseBigDecimal(data[85]));
        lp.setRefrigMov(parseBigDecimal(data[86]));
        lp.setDu08094(parseBigDecimal(data[87]));
        lp.setAsigDs081(parseBigDecimal(data[88]));
        lp.setAsigDl25671(parseBigDecimal(data[89]));
        lp.setSueldoBase(parseBigDecimal(data[90]));
        lp.setDl19990Snp(parseBigDecimal(data[91]));
        lp.setDsctoJudicial(parseBigDecimal(data[92]));
        lp.setDerrMagisteria(parseBigDecimal(data[93]));
        lp.setCoopCapacYupa(parseBigDecimal(data[94]));
        lp.setIpssvida(parseBigDecimal(data[95]));
        lp.setTardanzas(parseBigDecimal(data[96]));
        lp.setDl25897Afp(parseBigDecimal(data[97]));
        lp.setPagindnoaf(parseBigDecimal(data[98]));
        lp.setQuintacat(parseBigDecimal(data[99]));
        lp.setSegrimac(parseBigDecimal(data[100]));
        lp.setCmcusco(parseBigDecimal(data[101]));
        lp.setCmarequipa(parseBigDecimal(data[102]));
        lp.setInterbank(parseBigDecimal(data[103]));
        lp.setCmhuancayo(parseBigDecimal(data[104]));
        lp.setPrderrmag(parseBigDecimal(data[105]));
        lp.setIdg(parseBigDecimal(data[106]));
        lp.setFentase(parseBigDecimal(data[107]));
        lp.setInasistencias(parseBigDecimal(data[108]));
        lp.setAeherme(parseBigDecimal(data[109]));
        lp.setBripley(parseBigDecimal(data[110]));
        lp.setCraccentro(parseBigDecimal(data[111]));
        lp.setBcoPichincha(parseBigDecimal(data[112]));
        lp.setGproeducar(parseBigDecimal(data[113]));
        lp.setConstante(parseBigDecimal(data[114]));
        lp.setSubcafae(parseBigDecimal(data[115]));
        return lp;
    }

    private boolean isNullOrEmpty(String s) {
        return s == null || s.trim().isEmpty();
    }

    private String trimOrNull(String s) {
        return isNullOrEmpty(s) ? null : s.trim();
    }

    private boolean isFechaValida(String fecha) {
        if (isNullOrEmpty(fecha) || fecha.equals("01/01/1900") || fecha.equals("00/01/1900")) return true;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate.parse(fecha, formatter);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private LocalDate parseFecha(String fecha) {
        if (isNullOrEmpty(fecha) || fecha.equals("01/01/1900") || fecha.equals("00/01/1900")) return null;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return LocalDate.parse(fecha.trim(), formatter);
        } catch (Exception e) {
            return null;
        }
    }

    private Integer parseInt(String valor) {
        try {
            if (isNullOrEmpty(valor)) return null;
            return Integer.valueOf(valor.trim());
        } catch (Exception e) {
            return null;
        }
    }

    private BigDecimal parseBigDecimal(String valor) {
        try {
            if (isNullOrEmpty(valor)) return null;
            valor = valor.trim().replace(",", ".").replace("E+00", "");
            return new BigDecimal(valor);
        } catch (Exception e) {
            return null;
        }
    }
}