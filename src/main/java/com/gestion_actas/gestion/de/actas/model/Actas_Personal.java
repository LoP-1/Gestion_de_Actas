package com.gestion_actas.gestion.de.actas.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Actas_Personal")
public class Actas_Personal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datos generales del Personal
    @Column(name = "PeriodoPago")
    private String periodoPago;

    @Column(name = "FechaIngreso")
    private LocalDate fechaIngreso;

    @Column(name = "FechaTérmino")
    private LocalDate fechaTermino;

    @Column(name = "DocReferencia")
    private String docReferencia;

    @Column(name = "CODIGO MODULAR")
    private String codigoModular;

    @Column(name = "AIRHSP")
    private String airhsp;

    @Column(name = "CARGO")
    private String cargo;

    @Column(name = "ApePaterno")
    private String apePaterno;

    @Column(name = "ApeMaterno")
    private String apeMaterno;

    @Column(name = "Nombres")
    private String nombres;

    @Column(name = "Situación")
    private String situacion;

    @Column(name = "diaslicencia")
    private Integer diasLicencia;

    @Column(name = "fecinilic")
    private LocalDate fecinilic;

    @Column(name = "T_Planilla")
    private String tPlanilla;

    @Column(name = "FechaNacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "Sexo")
    private String sexo;

    @Column(name = "TipoDocumento")
    private String tipoDocumento;

    @Column(name = "NroDocumento")
    private String nroDocumento;

    @Column(name = "IPSS")
    private String ipss;

    @Column(name = "RegPensionario")
    private String regPensionario;

    @Column(name = "CodNexus")
    private String codNexus;

    @Column(name = "AFP")
    private String afp;

    @Column(name = "CUSPP")
    private String cuspp;

    @Column(name = "FechaAfiliación")
    private LocalDate fechaAfiliacion;

    @Column(name = "FechaDevengue")
    private LocalDate fechaDevengue;

    @Column(name = "Ugel")
    private String ugel;

    @Column(name = "CodEstablecimiento")
    private String codEstablecimiento;

    @Column(name = "Establecimiento")
    private String establecimiento;

    @Column(name = "Nivel")
    private String nivel;

    @Column(name = "CaractEstablecimiento")
    private Integer caractEstablecimiento;

    @Column(name = "UnidCosteo")
    private String unidCosteo;

    @Column(name = "Cargo/Orig")
    private String cargoOrig;

    @Column(name = "LeyendaPermanente")
    private String leyendaPermanente;

    @Column(name = "ModoPago")
    private String modoPago;

    @Column(name = "CtaCte")
    private String ctaCte;

    @Column(name = "DíasTrabajados")
    private Integer diasTrabajados;

    @Column(name = "Décimas")
    private Integer decimas;

    @Column(name = "RegLaboral")
    private String regLaboral;

    @Column(name = "TipoServidor")
    private String tipoServidor;

    @Column(name = "NivelMagisterial")
    private String nivelMagisterial;

    @Column(name = "codcomuna")
    private String codcomuna;

    @Column(name = "GrupoRemunerativo")
    private String grupoRemunerativo;

    @Column(name = "JornadaLaboral")
    private String jornadaLaboral;

    @Column(name = "TiempoServicio")
    private String tiempoServicio;

    @Column(name = "CadPresupuestal")
    private String cadPresupuestal;

    @Column(name = "timpopen")
    private String timpopen;

    // adicional
    @Column(name = "tributable", precision = 10, scale = 2)
    private BigDecimal tributable;

    @Column(name = "imponible", precision = 10, scale = 2)
    private BigDecimal imponible;

    @Column(name = "TotalRemuneracion", precision = 10, scale = 2)
    private BigDecimal totalRemuneracion;

    @Column(name = "TotalLiquido", precision = 10, scale = 2)
    private BigDecimal totalLiquido;

    //Ingresos y Egresos en formato JSON
    @Column(name = "IngresosJson", columnDefinition = "json")
    private String ingresosJson;

    @Column(name = "EgresosJson", columnDefinition = "json")
    private String egresosJson;


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

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public LocalDate getFechaTermino() {
        return fechaTermino;
    }

    public void setFechaTermino(LocalDate fechaTermino) {
        this.fechaTermino = fechaTermino;
    }

    public String getDocReferencia() {
        return docReferencia;
    }

    public void setDocReferencia(String docReferencia) {
        this.docReferencia = docReferencia;
    }

    public String getCodigoModular() {
        return codigoModular;
    }

    public void setCodigoModular(String codigoModular) {
        this.codigoModular = codigoModular;
    }

    public String getAirhsp() {
        return airhsp;
    }

    public void setAirhsp(String airhsp) {
        this.airhsp = airhsp;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getApePaterno() {
        return apePaterno;
    }

    public void setApePaterno(String apePaterno) {
        this.apePaterno = apePaterno;
    }

    public String getApeMaterno() {
        return apeMaterno;
    }

    public void setApeMaterno(String apeMaterno) {
        this.apeMaterno = apeMaterno;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getSituacion() {
        return situacion;
    }

    public void setSituacion(String situacion) {
        this.situacion = situacion;
    }

    public Integer getDiasLicencia() {
        return diasLicencia;
    }

    public void setDiasLicencia(Integer diasLicencia) {
        this.diasLicencia = diasLicencia;
    }

    public LocalDate getFecinilic() {
        return fecinilic;
    }

    public void setFecinilic(LocalDate fecinilic) {
        this.fecinilic = fecinilic;
    }

    public String gettPlanilla() {
        return tPlanilla;
    }

    public void settPlanilla(String tPlanilla) {
        this.tPlanilla = tPlanilla;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNroDocumento() {
        return nroDocumento;
    }

    public void setNroDocumento(String nroDocumento) {
        this.nroDocumento = nroDocumento;
    }

    public String getIpss() {
        return ipss;
    }

    public void setIpss(String ipss) {
        this.ipss = ipss;
    }

    public String getRegPensionario() {
        return regPensionario;
    }

    public void setRegPensionario(String regPensionario) {
        this.regPensionario = regPensionario;
    }

    public String getCodNexus() {
        return codNexus;
    }

    public void setCodNexus(String codNexus) {
        this.codNexus = codNexus;
    }

    public String getAfp() {
        return afp;
    }

    public void setAfp(String afp) {
        this.afp = afp;
    }

    public String getCuspp() {
        return cuspp;
    }

    public void setCuspp(String cuspp) {
        this.cuspp = cuspp;
    }

    public LocalDate getFechaAfiliacion() {
        return fechaAfiliacion;
    }

    public void setFechaAfiliacion(LocalDate fechaAfiliacion) {
        this.fechaAfiliacion = fechaAfiliacion;
    }

    public LocalDate getFechaDevengue() {
        return fechaDevengue;
    }

    public void setFechaDevengue(LocalDate fechaDevengue) {
        this.fechaDevengue = fechaDevengue;
    }

    public String getUgel() {
        return ugel;
    }

    public void setUgel(String ugel) {
        this.ugel = ugel;
    }

    public String getCodEstablecimiento() {
        return codEstablecimiento;
    }

    public void setCodEstablecimiento(String codEstablecimiento) {
        this.codEstablecimiento = codEstablecimiento;
    }

    public String getEstablecimiento() {
        return establecimiento;
    }

    public void setEstablecimiento(String establecimiento) {
        this.establecimiento = establecimiento;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public Integer getCaractEstablecimiento() {
        return caractEstablecimiento;
    }

    public void setCaractEstablecimiento(Integer caractEstablecimiento) {
        this.caractEstablecimiento = caractEstablecimiento;
    }

    public String getUnidCosteo() {
        return unidCosteo;
    }

    public void setUnidCosteo(String unidCosteo) {
        this.unidCosteo = unidCosteo;
    }

    public String getCargoOrig() {
        return cargoOrig;
    }

    public void setCargoOrig(String cargoOrig) {
        this.cargoOrig = cargoOrig;
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

    public String getCtaCte() {
        return ctaCte;
    }

    public void setCtaCte(String ctaCte) {
        this.ctaCte = ctaCte;
    }

    public Integer getDiasTrabajados() {
        return diasTrabajados;
    }

    public void setDiasTrabajados(Integer diasTrabajados) {
        this.diasTrabajados = diasTrabajados;
    }

    public Integer getDecimas() {
        return decimas;
    }

    public void setDecimas(Integer decimas) {
        this.decimas = decimas;
    }

    public String getRegLaboral() {
        return regLaboral;
    }

    public void setRegLaboral(String regLaboral) {
        this.regLaboral = regLaboral;
    }

    public String getTipoServidor() {
        return tipoServidor;
    }

    public void setTipoServidor(String tipoServidor) {
        this.tipoServidor = tipoServidor;
    }

    public String getNivelMagisterial() {
        return nivelMagisterial;
    }

    public void setNivelMagisterial(String nivelMagisterial) {
        this.nivelMagisterial = nivelMagisterial;
    }

    public String getCodcomuna() {
        return codcomuna;
    }

    public void setCodcomuna(String codcomuna) {
        this.codcomuna = codcomuna;
    }

    public String getGrupoRemunerativo() {
        return grupoRemunerativo;
    }

    public void setGrupoRemunerativo(String grupoRemunerativo) {
        this.grupoRemunerativo = grupoRemunerativo;
    }

    public String getJornadaLaboral() {
        return jornadaLaboral;
    }

    public void setJornadaLaboral(String jornadaLaboral) {
        this.jornadaLaboral = jornadaLaboral;
    }

    public String getTiempoServicio() {
        return tiempoServicio;
    }

    public void setTiempoServicio(String tiempoServicio) {
        this.tiempoServicio = tiempoServicio;
    }

    public String getCadPresupuestal() {
        return cadPresupuestal;
    }

    public void setCadPresupuestal(String cadPresupuestal) {
        this.cadPresupuestal = cadPresupuestal;
    }

    public String getTimpopen() {
        return timpopen;
    }

    public void setTimpopen(String timpopen) {
        this.timpopen = timpopen;
    }

    public BigDecimal getTributable() {
        return tributable;
    }

    public void setTributable(BigDecimal tributable) {
        this.tributable = tributable;
    }

    public BigDecimal getImponible() {
        return imponible;
    }

    public void setImponible(BigDecimal imponible) {
        this.imponible = imponible;
    }

    public BigDecimal getTotalRemuneracion() {
        return totalRemuneracion;
    }

    public void setTotalRemuneracion(BigDecimal totalRemuneracion) {
        this.totalRemuneracion = totalRemuneracion;
    }

    public BigDecimal getTotalLiquido() {
        return totalLiquido;
    }

    public void setTotalLiquido(BigDecimal totalLiquido) {
        this.totalLiquido = totalLiquido;
    }

    public String getIngresosJson() {
        return ingresosJson;
    }

    public void setIngresosJson(String ingresosJson) {
        this.ingresosJson = ingresosJson;
    }

    public String getEgresosJson() {
        return egresosJson;
    }

    public void setEgresosJson(String egresosJson) {
        this.egresosJson = egresosJson;
    }
}