package com.gestion_actas.gestion.de.actas.services;

import com.gestion_actas.gestion.de.actas.components.CsvValidator;
import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.repository.ActasRepository;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class CSVservice {

    @Autowired
    private ActasRepository repository;

    @Autowired
    private CsvValidator validator;

    public void importarCsv(MultipartFile file) throws Exception {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String[] line;
            boolean isFirstLine = true;
            int filaActual = 1;
            while ((line = reader.readNext()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }
                filaActual++;
                validator.validateRow(line, filaActual);
                ActasPersonal lp = validator.mapRowToActasPersonal(line);
                repository.save(lp);
            }
        }
    }
}