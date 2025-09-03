package com.gestion_actas.gestion.de.actas.model.DTO;

//formato de la lista de periodos
public class PeriodosDTO {
    private Long id;
    private String periodoPago;

    public PeriodosDTO() {}


    //getters y setters

    public PeriodosDTO(Long id, String periodoPago) {
        this.id = id;
        this.periodoPago = periodoPago;
    }

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
}