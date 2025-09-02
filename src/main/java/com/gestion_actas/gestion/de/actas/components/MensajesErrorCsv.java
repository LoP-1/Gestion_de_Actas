package com.gestion_actas.gestion.de.actas.components;

public class MensajesErrorCsv {

    public static String columnaInsuficiente(int fila, int encontradas, int requeridas) {
        return String.format("Fila %d: número de columnas (%d) menor al requerido (%d).", fila, encontradas, requeridas);
    }

    public static String campoObligatorio(int fila, String campo) {
        return String.format("Fila %d: el campo '%s' es obligatorio y está vacío.", fila, campo);
    }

    public static String fechaInvalida(int fila, String campo, String valor) {
        return String.format("Fila %d: el campo '%s' tiene una fecha inválida ('%s').", fila, campo, valor);
    }

}