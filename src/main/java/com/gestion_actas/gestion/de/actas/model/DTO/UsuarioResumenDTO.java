package com.gestion_actas.gestion.de.actas.model.DTO;

public class UsuarioResumenDTO {
    private String codigoModular;
    private String dni;
    private String apellidos;
    private String nombres;
    private String cargo;
    private String codEstablecimiento;
    private String situacion;
    private String tPlanilla;
    private String region;
    private int vecesRepetido;

    public UsuarioResumenDTO(String codigoModular, String dni, String apellidos, String nombres,
                             String cargo, String codEstablecimiento, String situacion,
                             String tPlanilla, String region, int vecesRepetido) {
        this.codigoModular = codigoModular;
        this.dni = dni;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.cargo = cargo;
        this.codEstablecimiento = codEstablecimiento;
        this.situacion = situacion;
        this.tPlanilla = tPlanilla;
        this.region = region;
        this.vecesRepetido = vecesRepetido;
    }

    // getters y setters
    public String getCodigoModular() { return codigoModular; }
    public void setCodigoModular(String codigoModular) { this.codigoModular = codigoModular; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getCodEstablecimiento() { return codEstablecimiento; }
    public void setCodEstablecimiento(String codEstablecimiento) { this.codEstablecimiento = codEstablecimiento; }

    public String getSituacion() { return situacion; }
    public void setSituacion(String situacion) { this.situacion = situacion; }

    public String gettPlanilla() { return tPlanilla; }
    public void settPlanilla(String tPlanilla) { this.tPlanilla = tPlanilla; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public int getVecesRepetido() { return vecesRepetido; }
    public void setVecesRepetido(int vecesRepetido) { this.vecesRepetido = vecesRepetido; }
}