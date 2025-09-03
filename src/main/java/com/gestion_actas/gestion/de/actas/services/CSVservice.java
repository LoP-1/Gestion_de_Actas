package com.gestion_actas.gestion.de.actas.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion_actas.gestion.de.actas.model.Actas_Personal;
import com.gestion_actas.gestion.de.actas.repository.ActasPersonalRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CSVservice {

    @Autowired
    private ActasPersonalRepository repository2;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Actas_Personal> importarCsv(MultipartFile file) throws IOException, CsvException {
        List<Actas_Personal> lista = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            List<String[]> rows = reader.readAll();
            if (rows.isEmpty()) return lista;

            String[] header = rows.get(0);

            // Normaliza los nombres de las columnas para búsquedas
            Map<String, Integer> headerMap = new HashMap<>();
            for (int i = 0; i < header.length; i++) {
                headerMap.put(normalizaNombre(header[i]), i);
            }

            // Indices de INGRESOS y EGRESOS
            int ingresosIdx = headerMap.getOrDefault(normalizaNombre("INGRESOS"), -1);
            int egresosIdx = headerMap.getOrDefault(normalizaNombre("EGRESOS"), -1);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy");

            for (int i = 1; i < rows.size(); i++) {
                String[] data = rows.get(i);
                Actas_Personal p = new Actas_Personal();

                // Campos fijos (usa nombres del modelo, NO del CSV)
                p.setPeriodoPago(getValue(data, headerMap, "PeriodoPago"));
                p.setFechaIngreso(parseFecha(getValue(data, headerMap, "FechaIngreso"), formatter));
                p.setFechaTermino(parseFecha(getValue(data, headerMap, "FechaTermino"), formatter));
                p.setDocReferencia(getValue(data, headerMap, "DocReferencia"));
                p.setCodigoModular(getValue(data, headerMap, "CodigoModular"));
                p.setAirhsp(getValue(data, headerMap, "Airhsp"));
                p.setCargo(getValue(data, headerMap, "Cargo"));
                p.setApePaterno(getValue(data, headerMap, "ApePaterno"));
                p.setApeMaterno(getValue(data, headerMap, "ApeMaterno"));
                p.setNombres(getValue(data, headerMap, "Nombres"));
                p.setSituacion(getValue(data, headerMap, "Situacion"));
                p.setDiasLicencia(parseInt(getValue(data, headerMap, "DiasLicencia")));
                p.setFecinilic(parseFecha(getValue(data, headerMap, "Fecinilic"), formatter));
                p.settPlanilla(getValue(data, headerMap, "TPlanilla"));
                p.setFechaNacimiento(parseFecha(getValue(data, headerMap, "FechaNacimiento"), formatter));
                p.setSexo(getValue(data, headerMap, "Sexo"));
                p.setTipoDocumento(getValue(data, headerMap, "TipoDocumento"));
                p.setNroDocumento(getValue(data, headerMap, "NroDocumento"));
                p.setIpss(getValue(data, headerMap, "IpSs"));
                p.setRegPensionario(getValue(data, headerMap, "RegPensionario"));
                p.setCodNexus(getValue(data, headerMap, "CodNexus"));
                p.setAfp(getValue(data, headerMap, "Afp"));
                p.setCuspp(getValue(data, headerMap, "Cuspp"));
                p.setFechaAfiliacion(parseFecha(getValue(data, headerMap, "FechaAfiliacion"), formatter));
                p.setFechaDevengue(parseFecha(getValue(data, headerMap, "FechaDevengue"), formatter));
                p.setUgel(getValue(data, headerMap, "Ugel"));
                p.setCodEstablecimiento(getValue(data, headerMap, "CodEstablecimiento"));
                p.setEstablecimiento(getValue(data, headerMap, "Establecimiento"));
                p.setNivel(getValue(data, headerMap, "Nivel"));
                p.setCaractEstablecimiento(parseInt(getValue(data, headerMap, "CaractEstablecimiento")));
                p.setUnidCosteo(getValue(data, headerMap, "UnidCosteo"));
                p.setCargoOrig(getValue(data, headerMap, "CargoOrig"));
                p.setLeyendaPermanente(getValue(data, headerMap, "LeyendaPermanente"));
                p.setModoPago(getValue(data, headerMap, "ModoPago"));
                p.setCtaCte(getValue(data, headerMap, "CtaCte"));
                p.setDiasTrabajados(parseInt(getValue(data, headerMap, "DiasTrabajados")));
                p.setDecimas(parseInt(getValue(data, headerMap, "Decimas")));
                p.setRegLaboral(getValue(data, headerMap, "RegLaboral"));
                p.setTipoServidor(getValue(data, headerMap, "TipoServidor"));
                p.setNivelMagisterial(getValue(data, headerMap, "NivelMagisterial"));
                p.setCodcomuna(getValue(data, headerMap, "CodComuna"));
                p.setGrupoRemunerativo(getValue(data, headerMap, "GrupoRemunerativo"));
                p.setJornadaLaboral(getValue(data, headerMap, "JornadaLaboral"));
                p.setTiempoServicio(getValue(data, headerMap, "TiempoServicio"));
                p.setCadPresupuestal(getValue(data, headerMap, "CadPresupuestal"));
                p.setTimpopen(getValue(data, headerMap, "Timpopen"));
                p.setTributable(parseBigDecimal(getValue(data, headerMap, "tributable")));
                p.setImponible(parseBigDecimal(getValue(data, headerMap, "imponible")));
                p.setTotalRemuneracion(parseBigDecimal(getValue(data, headerMap, "totalRemuneracion")));
                p.setTotalLiquido(parseBigDecimal(getValue(data, headerMap, "totalLiquido")));

                // INGRESOS dinámicos
                Map<String, BigDecimal> ingresosMap = new LinkedHashMap<>();
                for (int idx = ingresosIdx + 1; idx < egresosIdx; idx++) {
                    ingresosMap.put(header[idx], parseBigDecimal(data[idx]));
                }
                p.setIngresosJson(objectMapper.writeValueAsString(ingresosMap));

                // EGRESOS dinámicos
                Map<String, BigDecimal> egresosMap = new LinkedHashMap<>();
                for (int idx = egresosIdx + 1; idx < data.length && idx < header.length; idx++) {
                    egresosMap.put(header[idx], parseBigDecimal(data[idx]));
                }
                p.setEgresosJson(objectMapper.writeValueAsString(egresosMap));

                lista.add(p);
            }
        }
        repository2.saveAll(lista);
        return lista;
    }

    // Normaliza nombres para que coincidan siempre
    private String normalizaNombre(String s) {
        if (s == null) return "";
        // Elimina BOM y todo caracter no visible
        s = s.replace("\uFEFF", ""); // BOM
        s = s.replaceAll("[\\p{C}\\p{Z}]", ""); // Control chars y espacios Unicode
        // Elimina cualquier tipo de espacio (incluye tabs, non-breaking, etc)
        s = s.replaceAll("\\s+", "");
        // Quita tildes usando regex Unicode
        s = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Elimina guiones, diagonales, puntos, y cualquier caracter especial
        s = s.replaceAll("[_\\-\\./]", "");
        // Convierte a minúsculas
        s = s.toLowerCase();
        return s;
    }
    // Obtiene el valor de la columna usando el mapa normalizado
    private String getValue(String[] data, Map<String,Integer> headerMap, String colName) {
        String key = normalizaNombre(colName);
        Integer idx = headerMap.get(key);
        if (idx != null && idx < data.length) {
            return data[idx];
        }
        System.out.println("Columna NO encontrada: " + colName + " (buscada como: " + key + ")");
        return null;
    }

    private LocalDate parseFecha(String val, DateTimeFormatter formatter) {
        if (val == null || val.trim().isEmpty() || val.equals("1/1/1900") || val.equals("00/01/1900")) return null;
        try { return LocalDate.parse(val.trim(), formatter); }
        catch (Exception e) { return null; }
    }

    private Integer parseInt(String val) {
        try { return (val == null || val.trim().isEmpty()) ? null : Integer.valueOf(val.trim()); }
        catch (Exception e) { return null; }
    }

    private BigDecimal parseBigDecimal(String val) {
        try {
            if (val == null || val.trim().isEmpty()) return BigDecimal.ZERO;
            val = val.trim().replace(",", ".").replace("E+00", "");
            return new BigDecimal(val);
        } catch (Exception e) { return BigDecimal.ZERO; }
    }
}