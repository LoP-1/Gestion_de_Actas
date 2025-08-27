package com.gestion_actas.gestion.de.actas.model.DTO;

public class DetalleActasDTO {
    private String periodoPago;
    private String codigoModular;
    private Double totalRemuneracion; // Mejor como Double porque en la BD es decimal(10,2)

    // Constructor

    public DetalleActasDTO(String periodoPago, String codigoModular, Double totalRemuneracion) {
        this.periodoPago = periodoPago;
        this.codigoModular = codigoModular;
        this.totalRemuneracion = totalRemuneracion;
    }

    // Getters y Setters
    public String getPeriodoPago() {
        return periodoPago;
    }

    public void setPeriodoPago(String periodoPago) {
        this.periodoPago = periodoPago;
    }

    public String getCodigoModular() {
        return codigoModular;
    }

    public void setCodigoModular(String codigoModular) {
        this.codigoModular = codigoModular;
    }

    public Double getTotalRemuneracion() {
        return totalRemuneracion;
    }

    public void setTotalRemuneracion(Double totalRemuneracion) {
        this.totalRemuneracion = totalRemuneracion;
    }
}
