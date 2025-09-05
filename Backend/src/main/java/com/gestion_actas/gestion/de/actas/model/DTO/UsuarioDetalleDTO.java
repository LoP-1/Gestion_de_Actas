package com.gestion_actas.gestion.de.actas.model.DTO;

import java.time.LocalDate;

//formato extenso para datos completos de usuarios
public class UsuarioDetalleDTO {
    private String codigoModular;         // codigo modular
    private String cargo;                 // cargo
    private String apePaterno;            // ape_paterno
    private String apeMaterno;            // ape_materno
    private String nombres;               // nombres
    private String tPlanilla;             // t_planilla
    private String situacion;             // situación
    private LocalDate fechaNacimiento;    // fecha_nacimiento
    private String sexo;                  // sexo
    private String ugel;                  // ugel
    private String codEstablecimiento;    // cod_establecimiento
    private String establecimiento;       // establecimiento
    private String codModIE;              // cod_nexus
    private String tipoDocumento;         // tipo_documento
    private String nroDocumento;          // nro_documento
    private LocalDate fechaIngreso;       // fecha_ingreso
    private LocalDate fechaTermino;       // fecha_término
    private String docReferencia;         // doc_referencia
    private String cargoOrig;             // cargo/orig
    private String ipss;                  // ipss
    private String regPensionario;        // reg_pensionario
    private String cadPresupuestal;       // cad_presupuestal
    private String afp;                   // afp
    private String cuspp;                 // cuspp
    private LocalDate fechaAfiliacion;    // fecha_afiliación
    private LocalDate fechaDevengue;      // fecha_devengue
    private String regLaboral;            // reg_laboral
    private String nivel;                 // nivel
    private String nivelMagisterial;      // nivel_magisterial
    private String modoPago;              // modo_pago
    private String leyendaPermanente;     // leyenda_permanente
    private String ctaCte;

    //getters y setters

    public String getCtaCte() {
        return ctaCte;
    }

    public void setCtaCte(String ctaCte) {
        this.ctaCte = ctaCte;
    }

    public String getLeyendaPermanente() {
        return leyendaPermanente;
    }

    public void setLeyendaPermanente(String leyendaPermanente) {
        this.leyendaPermanente = leyendaPermanente;
    }

    public String getModoPago() {
        return modoPago;
    }

    public void setModoPago(String modoPago) {
        this.modoPago = modoPago;
    }

    public String getNivelMagisterial() {
        return nivelMagisterial;
    }

    public void setNivelMagisterial(String nivelMagisterial) {
        this.nivelMagisterial = nivelMagisterial;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getRegLaboral() {
        return regLaboral;
    }

    public void setRegLaboral(String regLaboral) {
        this.regLaboral = regLaboral;
    }

    public LocalDate getFechaDevengue() {
        return fechaDevengue;
    }

    public void setFechaDevengue(LocalDate fechaDevengue) {
        this.fechaDevengue = fechaDevengue;
    }

    public LocalDate getFechaAfiliacion() {
        return fechaAfiliacion;
    }

    public void setFechaAfiliacion(LocalDate fechaAfiliacion) {
        this.fechaAfiliacion = fechaAfiliacion;
    }

    public String getCuspp() {
        return cuspp;
    }

    public void setCuspp(String cuspp) {
        this.cuspp = cuspp;
    }

    public String getAfp() {
        return afp;
    }

    public void setAfp(String afp) {
        this.afp = afp;
    }

    public String getCadPresupuestal() {
        return cadPresupuestal;
    }

    public void setCadPresupuestal(String cadPresupuestal) {
        this.cadPresupuestal = cadPresupuestal;
    }

    public String getRegPensionario() {
        return regPensionario;
    }

    public void setRegPensionario(String regPensionario) {
        this.regPensionario = regPensionario;
    }

    public String getIpss() {
        return ipss;
    }

    public void setIpss(String ipss) {
        this.ipss = ipss;
    }

    public String getCargoOrig() {
        return cargoOrig;
    }

    public void setCargoOrig(String cargoOrig) {
        this.cargoOrig = cargoOrig;
    }

    public String getDocReferencia() {
        return docReferencia;
    }

    public void setDocReferencia(String docReferencia) {
        this.docReferencia = docReferencia;
    }

    public LocalDate getFechaTermino() {
        return fechaTermino;
    }

    public void setFechaTermino(LocalDate fechaTermino) {
        this.fechaTermino = fechaTermino;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getNroDocumento() {
        return nroDocumento;
    }

    public void setNroDocumento(String nroDocumento) {
        this.nroDocumento = nroDocumento;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getCodModIE() {
        return codModIE;
    }

    public void setCodModIE(String codModIE) {
        this.codModIE = codModIE;
    }

    public String getEstablecimiento() {
        return establecimiento;
    }

    public void setEstablecimiento(String establecimiento) {
        this.establecimiento = establecimiento;
    }

    public String getCodEstablecimiento() {
        return codEstablecimiento;
    }

    public void setCodEstablecimiento(String codEstablecimiento) {
        this.codEstablecimiento = codEstablecimiento;
    }

    public String getUgel() {
        return ugel;
    }

    public void setUgel(String ugel) {
        this.ugel = ugel;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
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

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApeMaterno() {
        return apeMaterno;
    }

    public void setApeMaterno(String apeMaterno) {
        this.apeMaterno = apeMaterno;
    }

    public String getApePaterno() {
        return apePaterno;
    }

    public void setApePaterno(String apePaterno) {
        this.apePaterno = apePaterno;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCodigoModular() {
        return codigoModular;
    }

    public void setCodigoModular(String codigoModular) {
        this.codigoModular = codigoModular;
    }
}