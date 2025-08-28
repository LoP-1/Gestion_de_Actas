package com.gestion_actas.gestion.de.actas.model.DTO;

public class DetalleActasDTO {
    private Long id;
    private String periodoPago;
    private String codigoModular;
    private Double totalRemuneracion;

    public DetalleActasDTO(Long id, String periodoPago, String codigoModular, Double totalRemuneracion) {
        this.id = id;
        this.periodoPago = periodoPago;
        this.codigoModular = codigoModular;
        this.totalRemuneracion = totalRemuneracion;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

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