package com.gestion_actas.gestion.de.actas.model.DTO;

public class DescuentosDTO {
    private String periodoPago;
    private String egresosJson;

    public DescuentosDTO() {}

    public DescuentosDTO(String periodoPago, String egresosJson) {
        this.periodoPago = periodoPago;
        this.egresosJson = egresosJson;
    }

    public String getPeriodoPago() {
        return periodoPago;
    }

    public void setPeriodoPago(String periodoPago) {
        this.periodoPago = periodoPago;
    }

    public String getEgresosJson() {
        return egresosJson;
    }

    public void setEgresosJson(String egresosJson) {
        this.egresosJson = egresosJson;
    }

    public static DescuentosDTO fromRow(Object[] row) {
        if (row == null) return null;
        String periodo = null;
        String egresos = null;
        if (row.length > 0 && row[0] != null) periodo = String.valueOf(row[0]);
        if (row.length > 1 && row[1] != null) egresos = String.valueOf(row[1]);
        return new DescuentosDTO(periodo, egresos);
    }

}
