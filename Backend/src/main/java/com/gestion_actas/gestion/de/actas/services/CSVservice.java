package com.gestion_actas.gestion.de.actas.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestion_actas.gestion.de.actas.model.Actas_Personal;
import com.gestion_actas.gestion.de.actas.repository.ActasPersonalRepository;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
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

        // Leemos bytes para poder "asomar" la primera línea y luego volver a leer desde el principio
        byte[] bytes = file.getBytes();

        // Detecta el separador mirando la primera línea no vacía
        String headerLine = readFirstNonEmptyLine(bytes);
        if (headerLine == null) return lista;
        char separator = detectSeparator(headerLine); // ',' o ';'

        CSVParser parser = new CSVParserBuilder()
                .withSeparator(separator)
                .withIgnoreQuotations(false)
                .build();

        try (CSVReader reader = new CSVReaderBuilder(
                new InputStreamReader(new ByteArrayInputStream(bytes), StandardCharsets.UTF_8))
                .withCSVParser(parser)
                .build()) {

            List<String[]> rows = reader.readAll();
            if (rows.isEmpty()) return lista;

            String[] header = rows.get(0);

            Map<String, Integer> headerMap = new HashMap<>();
            for (int i = 0; i < header.length; i++) {
                headerMap.put(normalizaNombre(header[i]), i);
            }

            int ingresosIdx = headerMap.getOrDefault(normalizaNombre("INGRESOS"), -1);
            int egresosIdx = headerMap.getOrDefault(normalizaNombre("EGRESOS"), -1);
            if (ingresosIdx == -1) ingresosIdx = header.length;
            if (egresosIdx == -1) egresosIdx = header.length;

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy");

            for (int i = 1; i < rows.size(); i++) {
                String[] data = rows.get(i);
                Actas_Personal p = new Actas_Personal();

                p.setPeriodoPago(getValue(data, headerMap, "PeriodoPago"));
                p.setFechaIngreso(parseFecha(getValue(data, headerMap, "FechaIngreso"), formatter));
                p.setFechaTermino(parseFecha(getValue(data, headerMap, "FechaTérmino"), formatter));
                p.setDocReferencia(getValue(data, headerMap, "DocReferencia"));
                p.setCodigoModular(getValue(data, headerMap, "CODIGO MODULAR"));
                p.setAirhsp(getValue(data, headerMap, "AIRHSP"));
                p.setCargo(getValue(data, headerMap, "CARGO"));
                p.setApePaterno(getValue(data, headerMap, "ApePaterno"));
                p.setApeMaterno(getValue(data, headerMap, "ApeMaterno"));
                p.setNombres(getValue(data, headerMap, "Nombres"));
                p.setSituacion(getValue(data, headerMap, "Situación"));
                p.setDiasLicencia(parseInt(getValue(data, headerMap, "diaslicencia")));
                p.setFecinilic(parseFecha(getValue(data, headerMap, "fecinilic"), formatter));
                p.settPlanilla(getValue(data, headerMap, "T_Planilla"));
                p.setFechaNacimiento(parseFecha(getValue(data, headerMap, "FechaNacimiento"), formatter));
                p.setSexo(getValue(data, headerMap, "Sexo"));
                p.setTipoDocumento(getValue(data, headerMap, "TipoDocumento"));
                p.setNroDocumento(getValue(data, headerMap, "NroDocumento"));
                p.setIpss(getValue(data, headerMap, "IPSS"));
                p.setRegPensionario(getValue(data, headerMap, "RegPensionario"));
                p.setCodNexus(getValue(data, headerMap, "CodNexus"));
                p.setAfp(getValue(data, headerMap, "AFP"));
                p.setCuspp(getValue(data, headerMap, "CUSPP"));
                p.setFechaAfiliacion(parseFecha(getValue(data, headerMap, "FechaAfiliación"), formatter));
                p.setFechaDevengue(parseFecha(getValue(data, headerMap, "FechaDevengue"), formatter));
                p.setUgel(getValue(data, headerMap, "Ugel"));
                p.setCodEstablecimiento(getValue(data, headerMap, "CodEstablecimiento"));
                p.setEstablecimiento(getValue(data, headerMap, "Establecimiento"));
                p.setNivel(getValue(data, headerMap, "Nivel"));
                p.setCaractEstablecimiento(parseInt(getValue(data, headerMap, "CaractEstablecimiento")));
                p.setUnidCosteo(getValue(data, headerMap, "UnidCosteo"));
                p.setCargoOrig(getValue(data, headerMap, "Cargo/Orig"));
                p.setLeyendaPermanente(getValue(data, headerMap, "LeyendaPermanente"));
                p.setModoPago(getValue(data, headerMap, "ModoPago"));
                p.setCtaCte(getValue(data, headerMap, "CtaCte"));
                p.setDiasTrabajados(parseInt(getValue(data, headerMap, "DíasTrabajados")));
                p.setDecimas(parseInt(getValue(data, headerMap, "Décimas")));
                p.setRegLaboral(getValue(data, headerMap, "RegLaboral"));
                p.setTipoServidor(getValue(data, headerMap, "TipoServidor"));
                p.setNivelMagisterial(getValue(data, headerMap, "NivelMagisterial"));
                p.setCodcomuna(getValue(data, headerMap, "codcomuna"));
                p.setGrupoRemunerativo(getValue(data, headerMap, "GrupoRemunerativo"));
                p.setJornadaLaboral(getValue(data, headerMap, "JornadaLaboral"));
                p.setTiempoServicio(getValue(data, headerMap, "TiempoServicio"));
                p.setCadPresupuestal(getValue(data, headerMap, "CadPresupuestal"));
                p.setTimpopen(getValue(data, headerMap, "timpopen"));
                p.setTributable(parseBigDecimal(getValue(data, headerMap, "tributable")));
                p.setImponible(parseBigDecimal(getValue(data, headerMap, "imponible")));
                p.setTotalRemuneracion(parseBigDecimal(getValue(data, headerMap, "TotalRemuneración")));
                p.setTotalLiquido(parseBigDecimal(getValue(data, headerMap, "TotalLiquido")));

                // INGRESOS
                Map<String, BigDecimal> ingresosMap = new LinkedHashMap<>();
                if (ingresosIdx >= 0 && ingresosIdx < header.length) {
                    int end = (egresosIdx > ingresosIdx) ? egresosIdx : header.length;
                    for (int idx = ingresosIdx + 1; idx < end && idx < header.length && idx < data.length; idx++) {
                        String colName = header[idx] != null ? header[idx].trim() : ("Col_" + idx);
                        ingresosMap.put(colName, parseBigDecimal(safeCell(data, idx)));
                    }
                }
                p.setIngresosJson(objectMapper.writeValueAsString(ingresosMap));

                // EGRESOS
                Map<String, BigDecimal> egresosMap = new LinkedHashMap<>();
                if (egresosIdx >= 0 && egresosIdx < header.length) {
                    for (int idx = egresosIdx + 1; idx < header.length && idx < data.length; idx++) {
                        String colName = header[idx] != null ? header[idx].trim() : ("Col_" + idx);
                        egresosMap.put(colName, parseBigDecimal(safeCell(data, idx)));
                    }
                }
                p.setEgresosJson(objectMapper.writeValueAsString(egresosMap));

                lista.add(p);
            }
        }

        repository2.saveAll(lista);
        return lista;
    }

    private String readFirstNonEmptyLine(byte[] bytes) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(bytes), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.startsWith("\uFEFF")) line = line.substring(1); // quita BOM
                if (!line.trim().isEmpty()) return line;
            }
            return null;
        }
    }

    private char detectSeparator(String headerLine) {
        int commas = countChar(headerLine, ',');
        int semis = countChar(headerLine, ';');
        // Si aparecen ambos, elegimos el más frecuente
        if (semis > commas) return ';';
        // por defecto coma
        return ',';
    }

    private int countChar(String s, char c) {
        int n = 0;
        for (int i = 0; i < s.length(); i++) if (s.charAt(i) == c) n++;
        return n;
    }

    private String safeCell(String[] data, int idx) {
        return (idx >= 0 && idx < data.length) ? data[idx] : null;
    }

    private String normalizaNombre(String s) {
        if (s == null) return "";
        s = s.replace("\uFEFF", ""); // BOM
        s = s.replaceAll("[\\p{C}\\p{Z}]", "");
        s = s.replaceAll("\\s+", "");
        s = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        s = s.replaceAll("[_\\-\\./]", "");
        s = s.toLowerCase();
        return s;
    }

    private String getValue(String[] data, Map<String,Integer> headerMap, String colName) {
        String key = normalizaNombre(colName);
        Integer idx = headerMap.get(key);
        if (idx != null && idx < data.length) {
            return data[idx];
        }
        return null;
    }

    private LocalDate parseFecha(String val, DateTimeFormatter formatter) {
        if (val == null) return null;
        val = val.trim();
        if (val.isEmpty() || val.equals("1/1/1900") || val.equals("01/01/1900") || val.equals("00/01/1900")) return null;
        try { return LocalDate.parse(val, formatter); }
        catch (Exception e) { return null; }
    }

    private Integer parseInt(String val) {
        try {
            if (val == null) return null;
            val = val.trim();
            return val.isEmpty() ? null : Integer.valueOf(val);
        } catch (Exception e) {
            return null;
        }
    }

    private BigDecimal parseBigDecimal(String val) {
        try {
            if (val == null) return BigDecimal.ZERO;
            String s = val.trim();
            if (s.isEmpty()) return BigDecimal.ZERO;

            if (s.matches("^-?\\d{1,3}(\\.\\d{3})*,\\d+$")) {
                s = s.replace(".", "").replace(",", ".");
            } else if (s.matches("^-?\\d{1,3}(,\\d{3})*\\.\\d+$")) {
                s = s.replace(",", "");
            }
            return new BigDecimal(s);
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }
}