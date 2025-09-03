package com.gestion_actas.gestion.de.actas.controller;

import com.gestion_actas.gestion.de.actas.model.Actas_Personal;
import com.opencsv.exceptions.CsvException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.gestion_actas.gestion.de.actas.services.CSVservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CSVcontroller {

    @Autowired
    private CSVservice licenciaPersonalService;


    @PostMapping("/upload")
    public ResponseEntity<List<Actas_Personal>> importarCsv(@RequestParam("file") MultipartFile file) {
        try {
            List<Actas_Personal> lista = licenciaPersonalService.importarCsv(file);
            return ResponseEntity.ok(lista);
        } catch (IOException | CsvException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}