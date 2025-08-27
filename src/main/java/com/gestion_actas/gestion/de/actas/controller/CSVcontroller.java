package com.gestion_actas.gestion.de.actas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.gestion_actas.gestion.de.actas.services.CSVservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class CSVcontroller {
    @Autowired
    private CSVservice licenciaPersonalService;

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            licenciaPersonalService.importarCsv(file);
            return "Archivo procesado correctamente.";
        } catch (Exception e) {
            return "Error al procesar el archivo: " + e.getMessage();
        }
    }
}