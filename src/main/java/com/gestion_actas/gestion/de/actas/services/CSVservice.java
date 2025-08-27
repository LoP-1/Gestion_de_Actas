package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.repository.ActasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.math.BigDecimal;

@Service
public class CSVservice {

    @Autowired
    private ActasRepository repository;

    public void importarCsv(MultipartFile file) throws Exception {
        try (Reader reader = new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);
             BufferedReader br = new BufferedReader(reader)) {
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Saltar encabezado
                    continue;
                }
                String[] data = line.split(",", -1); // Separador punto y coma ;, -1 para campos vacíos

                ActasPersonal lp = new ActasPersonal();

                // -- Mapeo de campos principales --
                lp.setPeriodoPago(data[0]);
                lp.setFechaIngreso(parseFecha(data[1]));
                lp.setFechaTermino(parseFecha(data[2]));
                lp.setDocReferencia(data[3]);
                lp.setCodigoModular(data[4]);
                lp.setAirhsp(data[5]);
                lp.setCargo(data[6]);
                lp.setApePaterno(data[7]);
                lp.setApeMaterno(data[8]);
                lp.setNombres(data[9]);
                lp.setSituacion(data[10]);
                lp.setDiasLicencia(parseInt(data[11]));
                lp.setFecinilic(parseFecha(data[12]));
                lp.settPlanilla(data[13]);
                lp.setFechaNacimiento(parseFecha(data[14]));
                lp.setSexo(data[15]);
                lp.setTipoDocumento(data[16]);
                lp.setNroDocumento(data[17]);
                lp.setIpss(data[18]);
                lp.setRegPensionario(data[19]);
                lp.setCodNexus(data[20]);
                lp.setAfp(data[21]);
                lp.setCuspp(data[22]);
                lp.setFechaAfiliacion(parseFecha(data[23]));
                lp.setFechaDevengue(parseFecha(data[24]));
                lp.setUgel(data[25]);
                lp.setCodEstablecimiento(data[26]);
                lp.setEstablecimiento(data[27]);
                lp.setNivel(data[28]);
                lp.setCaractEstablecimiento(parseInt(data[29]));
                lp.setUnidCosteo(data[30]);
                lp.setCargoOrig(data[31]);
                lp.setLeyendaPermanente(data[32]);
                lp.setModoPago(data[33]);
                lp.setCtaCte(data[34]);
                // data[35] vacío (doble punto y coma)
                lp.setDiasTrabajados(parseInt(data[36]));
                lp.setDecimas(parseInt(data[37]));
                lp.setRegLaboral(data[38]);
                lp.setTipoServidor(data[39]);
                lp.setNivelMagisterial(data[40]);
                lp.setCodcomuna(data[41]);
                lp.setGrupoRemunerativo(data[42]);
                lp.setJornadaLaboral(data[43]);
                lp.setTiempoServicio(data[44]);
                lp.setCadPresupuestal(data[45]);
                lp.setTimpopen(data[46]);
                lp.setTributable(parseBigDecimal(data[47]));
                lp.setImponible(parseBigDecimal(data[48]));
                lp.setTotalRemuneracion(parseBigDecimal(data[49]));
                lp.setTotalLiquido(parseBigDecimal(data[50]));

                // --- Ingresos ---
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

                // --- Egresos ---
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

                // Guarda el registro en la base de datos
                repository.save(lp);
            }
        }
    }

    private LocalDate parseFecha(String fecha) {
        try {
            if (fecha == null || fecha.isEmpty() || fecha.equals("01/01/1900") || fecha.equals("00/01/1900")) return null;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            return LocalDate.parse(fecha, formatter);
        } catch (Exception e) {
            return null;
        }
    }

    private Integer parseInt(String valor) {
        try {
            if (valor == null || valor.trim().isEmpty()) return null;
            return Integer.valueOf(valor.trim());
        } catch (Exception e) {
            return null;
        }
    }

    private BigDecimal parseBigDecimal(String valor) {
        try {
            if (valor == null || valor.trim().isEmpty()) return null;
            valor = valor.replace(",", ".").replace("E+00", "");
            return new BigDecimal(valor);
        } catch (Exception e) {
            return null;
        }
    }
}
