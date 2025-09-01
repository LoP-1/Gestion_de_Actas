package com.gestion_actas.gestion.de.actas.model.DTO;

public class UsuarioResumenDTO {
    private Long id;
    private String codigoModular;
    private String dni;
    private String apellidos;
    private String nombres;
    private String cargo;
    private String cargoOrig;
    private String codEstablecimiento;
    private String situacion;
    private String tPlanilla;
    private String region;

    public UsuarioResumenDTO(
            Long id,
            String codigoModular,
            String dni,
            String apellidos,
            String nombres,
            String cargo,
            String cargoOrig,
            String codEstablecimiento,
            String situacion,
            String tPlanilla,
            String region
    ) {
        this.id = id;
        this.codigoModular = codigoModular;
        this.dni = dni;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.cargo = cargo;
        this.cargoOrig = cargoOrig;
        this.codEstablecimiento = codEstablecimiento;
        this.situacion = situacion;
        this.tPlanilla = tPlanilla;
        this.region = region;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoModular() {
        return codigoModular;
    }

    public void setCodigoModular(String codigoModular) {
        this.codigoModular = codigoModular;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCargoOrig() {
        return cargoOrig;
    }

    public void setCargoOrig(String cargoOrig) {
        this.cargoOrig = cargoOrig;
    }

    public String getCodEstablecimiento() {
        return codEstablecimiento;
    }

    public void setCodEstablecimiento(String codEstablecimiento) {
        this.codEstablecimiento = codEstablecimiento;
    }

    public String getSituacion() {
        return situacion;
    }

    public void setSituacion(String situacion) {
        this.situacion = situacion;
    }

    public String gettPlanilla() {
        return tPlanilla;
    }

    public void settPlanilla(String tPlanilla) {
        this.tPlanilla = tPlanilla;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}

