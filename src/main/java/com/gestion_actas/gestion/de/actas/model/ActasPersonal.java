package com.gestion_actas.gestion.de.actas.model;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Actas_Personal")
public class ActasPersonal {

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

    @Column(name = "TotalRemuneración", precision = 10, scale = 2)
    private BigDecimal totalRemuneracion;

    @Column(name = "TotalLiquido", precision = 10, scale = 2)
    private BigDecimal totalLiquido;

    // Ingresos
    @Column(name = "RMS.C.ESFA", precision = 10, scale = 2)
    private BigDecimal rmsCesfa;
    @Column(name = "rural_cont", precision = 10, scale = 2)
    private BigDecimal ruralCont;
    @Column(name = "RMS_EES", precision = 10, scale = 2)
    private BigDecimal rmsEes;
    @Column(name = "RIMS_EES", precision = 10, scale = 2)
    private BigDecimal rimsEes;
    @Column(name = "B_Ext_Tran_Vari", precision = 10, scale = 2)
    private BigDecimal bExtTranVari;
    @Column(name = "B_Ext_Tran_Fijo", precision = 10, scale = 2)
    private BigDecimal bExtTranFijo;
    @Column(name = "asg_vra_30512", precision = 10, scale = 2)
    private BigDecimal asgVra30512;
    @Column(name = "asg_rural_30512", precision = 10, scale = 2)
    private BigDecimal asgRural30512;
    @Column(name = "Mont_Uni_Cons", precision = 10, scale = 2)
    private BigDecimal montUniCons;
    @Column(name = "RMS_30512", precision = 10, scale = 2)
    private BigDecimal rms30512;
    @Column(name = "A.carg_esp_LRM", precision = 10, scale = 2)
    private BigDecimal aCargEspLrm;
    @Column(name = "Rem.Transi.ESFA", precision = 10, scale = 2)
    private BigDecimal remTransiEsfa;
    @Column(name = "RIMS", precision = 10, scale = 2)
    private BigDecimal rims;
    @Column(name = "A.carg_dir_Ges_", precision = 10, scale = 2)
    private BigDecimal aCargDirGes;
    @Column(name = "Palmas MagMaes", precision = 10, scale = 2)
    private BigDecimal palmasMagMaes;
    @Column(name = "Jor_Trab.Ad_lrm", precision = 10, scale = 2)
    private BigDecimal jorTrabAdLrm;
    @Column(name = "A.carg_dir_LRM", precision = 10, scale = 2)
    private BigDecimal aCargDirLrm;
    @Column(name = "RIM_Ley 29944", precision = 10, scale = 2)
    private BigDecimal rimLey29944;
    @Column(name = "Ley29702", precision = 10, scale = 2)
    private BigDecimal ley29702;
    @Column(name = "DS065-2003-EF", precision = 10, scale = 2)
    private BigDecimal ds0652003Ef;
    @Column(name = "D.U.011-99", precision = 10, scale = 2)
    private BigDecimal du01199;
    @Column(name = "Reint Man No Af", precision = 10, scale = 2)
    private BigDecimal reintManNoAf;
    @Column(name = "Reintg. Manual", precision = 10, scale = 2)
    private BigDecimal reintgManual;
    @Column(name = "D.U.073-97", precision = 10, scale = 2)
    private BigDecimal du07397;
    @Column(name = "D.L. 26504", precision = 10, scale = 2)
    private BigDecimal dl26504;
    @Column(name = "DS011-93-ED", precision = 10, scale = 2)
    private BigDecimal ds01193Ed;
    @Column(name = "Dif Pensionable", precision = 10, scale = 2)
    private BigDecimal difPensionable;
    @Column(name = "DS261-91-EF IGV", precision = 10, scale = 2)
    private BigDecimal ds26191EfIgv;
    @Column(name = "Reunificada", precision = 10, scale = 2)
    private BigDecimal reunificada;
    @Column(name = "Bon. Especial", precision = 10, scale = 2)
    private BigDecimal bonEspecial;
    @Column(name = "aguinaldo", precision = 10, scale = 2)
    private BigDecimal aguinaldo;
    @Column(name = "CVid.DS154-91EF", precision = 10, scale = 2)
    private BigDecimal cvidDs15491Ef;
    @Column(name = "DSE 021-92-PCM", precision = 10, scale = 2)
    private BigDecimal dse02192Pcm;
    @Column(name = "DS. 019-94-PCM", precision = 10, scale = 2)
    private BigDecimal ds01994Pcm;
    @Column(name = "Bon. D.U. 90-96", precision = 10, scale = 2)
    private BigDecimal bonDu9096;
    @Column(name = "Refrig. y Mov.", precision = 10, scale = 2)
    private BigDecimal refrigMov;
    @Column(name = "D.U. 080-94", precision = 10, scale = 2)
    private BigDecimal du08094;
    @Column(name = "Asig. D.S.081", precision = 10, scale = 2)
    private BigDecimal asigDs081;
    @Column(name = "Asig.D.L. 25671", precision = 10, scale = 2)
    private BigDecimal asigDl25671;
    @Column(name = "Sueldo Base", precision = 10, scale = 2)
    private BigDecimal sueldoBase;

    // Egresos
    @Column(name = "DL19990 SNP", precision = 10, scale = 2)
    private BigDecimal dl19990Snp;
    @Column(name = "Dscto. Judicial", precision = 10, scale = 2)
    private BigDecimal dsctoJudicial;
    @Column(name = "Derr Magisteria", precision = 10, scale = 2)
    private BigDecimal derrMagisteria;
    @Column(name = "Coop Capac Yupa", precision = 10, scale = 2)
    private BigDecimal coopCapacYupa;
    @Column(name = "IPSSVIDA", precision = 10, scale = 2)
    private BigDecimal ipssvida;
    @Column(name = "Tardanzas", precision = 10, scale = 2)
    private BigDecimal tardanzas;
    @Column(name = "D.L. 25897 AFP", precision = 10, scale = 2)
    private BigDecimal dl25897Afp;
    @Column(name = "pagindnoaf", precision = 10, scale = 2)
    private BigDecimal pagindnoaf;
    @Column(name = "quintacat", precision = 10, scale = 2)
    private BigDecimal quintacat;
    @Column(name = "segrimac", precision = 10, scale = 2)
    private BigDecimal segrimac;
    @Column(name = "cmcusco", precision = 10, scale = 2)
    private BigDecimal cmcusco;
    @Column(name = "cmarequipa", precision = 10, scale = 2)
    private BigDecimal cmarequipa;
    @Column(name = "interbank", precision = 10, scale = 2)
    private BigDecimal interbank;
    @Column(name = "cmhuancayo", precision = 10, scale = 2)
    private BigDecimal cmhuancayo;
    @Column(name = "prderrmag", precision = 10, scale = 2)
    private BigDecimal prderrmag;
    @Column(name = "idg", precision = 10, scale = 2)
    private BigDecimal idg;
    @Column(name = "fentase", precision = 10, scale = 2)
    private BigDecimal fentase;
    @Column(name = "Inasistencias", precision = 10, scale = 2)
    private BigDecimal inasistencias;
    @Column(name = "AEHERME", precision = 10, scale = 2)
    private BigDecimal aeherme;
    @Column(name = "BRIPLEY", precision = 10, scale = 2)
    private BigDecimal bripley;
    @Column(name = "CRACCENTRO", precision = 10, scale = 2)
    private BigDecimal craccentro;
    @Column(name = "Bco.Pichincha", precision = 10, scale = 2)
    private BigDecimal bcoPichincha;
    @Column(name = "GPROEDUCAR", precision = 10, scale = 2)
    private BigDecimal gproeducar;
    @Column(name = "CONSTANTE", precision = 10, scale = 2)
    private BigDecimal constante;
    @Column(name = "SUBCAFAE", precision = 10, scale = 2)
    private BigDecimal subcafae;
    //Constructor vacio

    public ActasPersonal() {
    }

    //getters y setters

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

    public BigDecimal getRmsCesfa() {
        return rmsCesfa;
    }

    public void setRmsCesfa(BigDecimal rmsCesfa) {
        this.rmsCesfa = rmsCesfa;
    }

    public BigDecimal getRuralCont() {
        return ruralCont;
    }

    public void setRuralCont(BigDecimal ruralCont) {
        this.ruralCont = ruralCont;
    }

    public BigDecimal getRmsEes() {
        return rmsEes;
    }

    public void setRmsEes(BigDecimal rmsEes) {
        this.rmsEes = rmsEes;
    }

    public BigDecimal getRimsEes() {
        return rimsEes;
    }

    public void setRimsEes(BigDecimal rimsEes) {
        this.rimsEes = rimsEes;
    }

    public BigDecimal getbExtTranVari() {
        return bExtTranVari;
    }

    public void setbExtTranVari(BigDecimal bExtTranVari) {
        this.bExtTranVari = bExtTranVari;
    }

    public BigDecimal getbExtTranFijo() {
        return bExtTranFijo;
    }

    public void setbExtTranFijo(BigDecimal bExtTranFijo) {
        this.bExtTranFijo = bExtTranFijo;
    }

    public BigDecimal getAsgVra30512() {
        return asgVra30512;
    }

    public void setAsgVra30512(BigDecimal asgVra30512) {
        this.asgVra30512 = asgVra30512;
    }

    public BigDecimal getAsgRural30512() {
        return asgRural30512;
    }

    public void setAsgRural30512(BigDecimal asgRural30512) {
        this.asgRural30512 = asgRural30512;
    }

    public BigDecimal getMontUniCons() {
        return montUniCons;
    }

    public void setMontUniCons(BigDecimal montUniCons) {
        this.montUniCons = montUniCons;
    }

    public BigDecimal getRms30512() {
        return rms30512;
    }

    public void setRms30512(BigDecimal rms30512) {
        this.rms30512 = rms30512;
    }

    public BigDecimal getaCargEspLrm() {
        return aCargEspLrm;
    }

    public void setaCargEspLrm(BigDecimal aCargEspLrm) {
        this.aCargEspLrm = aCargEspLrm;
    }

    public BigDecimal getRemTransiEsfa() {
        return remTransiEsfa;
    }

    public void setRemTransiEsfa(BigDecimal remTransiEsfa) {
        this.remTransiEsfa = remTransiEsfa;
    }

    public BigDecimal getRims() {
        return rims;
    }

    public void setRims(BigDecimal rims) {
        this.rims = rims;
    }

    public BigDecimal getaCargDirGes() {
        return aCargDirGes;
    }

    public void setaCargDirGes(BigDecimal aCargDirGes) {
        this.aCargDirGes = aCargDirGes;
    }

    public BigDecimal getPalmasMagMaes() {
        return palmasMagMaes;
    }

    public void setPalmasMagMaes(BigDecimal palmasMagMaes) {
        this.palmasMagMaes = palmasMagMaes;
    }

    public BigDecimal getJorTrabAdLrm() {
        return jorTrabAdLrm;
    }

    public void setJorTrabAdLrm(BigDecimal jorTrabAdLrm) {
        this.jorTrabAdLrm = jorTrabAdLrm;
    }

    public BigDecimal getaCargDirLrm() {
        return aCargDirLrm;
    }

    public void setaCargDirLrm(BigDecimal aCargDirLrm) {
        this.aCargDirLrm = aCargDirLrm;
    }

    public BigDecimal getRimLey29944() {
        return rimLey29944;
    }

    public void setRimLey29944(BigDecimal rimLey29944) {
        this.rimLey29944 = rimLey29944;
    }

    public BigDecimal getLey29702() {
        return ley29702;
    }

    public void setLey29702(BigDecimal ley29702) {
        this.ley29702 = ley29702;
    }

    public BigDecimal getDs0652003Ef() {
        return ds0652003Ef;
    }

    public void setDs0652003Ef(BigDecimal ds0652003Ef) {
        this.ds0652003Ef = ds0652003Ef;
    }

    public BigDecimal getDu01199() {
        return du01199;
    }

    public void setDu01199(BigDecimal du01199) {
        this.du01199 = du01199;
    }

    public BigDecimal getReintManNoAf() {
        return reintManNoAf;
    }

    public void setReintManNoAf(BigDecimal reintManNoAf) {
        this.reintManNoAf = reintManNoAf;
    }

    public BigDecimal getReintgManual() {
        return reintgManual;
    }

    public void setReintgManual(BigDecimal reintgManual) {
        this.reintgManual = reintgManual;
    }

    public BigDecimal getDu07397() {
        return du07397;
    }

    public void setDu07397(BigDecimal du07397) {
        this.du07397 = du07397;
    }

    public BigDecimal getDl26504() {
        return dl26504;
    }

    public void setDl26504(BigDecimal dl26504) {
        this.dl26504 = dl26504;
    }

    public BigDecimal getDs01193Ed() {
        return ds01193Ed;
    }

    public void setDs01193Ed(BigDecimal ds01193Ed) {
        this.ds01193Ed = ds01193Ed;
    }

    public BigDecimal getDifPensionable() {
        return difPensionable;
    }

    public void setDifPensionable(BigDecimal difPensionable) {
        this.difPensionable = difPensionable;
    }

    public BigDecimal getDs26191EfIgv() {
        return ds26191EfIgv;
    }

    public void setDs26191EfIgv(BigDecimal ds26191EfIgv) {
        this.ds26191EfIgv = ds26191EfIgv;
    }

    public BigDecimal getReunificada() {
        return reunificada;
    }

    public void setReunificada(BigDecimal reunificada) {
        this.reunificada = reunificada;
    }

    public BigDecimal getBonEspecial() {
        return bonEspecial;
    }

    public void setBonEspecial(BigDecimal bonEspecial) {
        this.bonEspecial = bonEspecial;
    }

    public BigDecimal getAguinaldo() {
        return aguinaldo;
    }

    public void setAguinaldo(BigDecimal aguinaldo) {
        this.aguinaldo = aguinaldo;
    }

    public BigDecimal getCvidDs15491Ef() {
        return cvidDs15491Ef;
    }

    public void setCvidDs15491Ef(BigDecimal cvidDs15491Ef) {
        this.cvidDs15491Ef = cvidDs15491Ef;
    }

    public BigDecimal getDse02192Pcm() {
        return dse02192Pcm;
    }

    public void setDse02192Pcm(BigDecimal dse02192Pcm) {
        this.dse02192Pcm = dse02192Pcm;
    }

    public BigDecimal getDs01994Pcm() {
        return ds01994Pcm;
    }

    public void setDs01994Pcm(BigDecimal ds01994Pcm) {
        this.ds01994Pcm = ds01994Pcm;
    }

    public BigDecimal getBonDu9096() {
        return bonDu9096;
    }

    public void setBonDu9096(BigDecimal bonDu9096) {
        this.bonDu9096 = bonDu9096;
    }

    public BigDecimal getRefrigMov() {
        return refrigMov;
    }

    public void setRefrigMov(BigDecimal refrigMov) {
        this.refrigMov = refrigMov;
    }

    public BigDecimal getDu08094() {
        return du08094;
    }

    public void setDu08094(BigDecimal du08094) {
        this.du08094 = du08094;
    }

    public BigDecimal getAsigDs081() {
        return asigDs081;
    }

    public void setAsigDs081(BigDecimal asigDs081) {
        this.asigDs081 = asigDs081;
    }

    public BigDecimal getAsigDl25671() {
        return asigDl25671;
    }

    public void setAsigDl25671(BigDecimal asigDl25671) {
        this.asigDl25671 = asigDl25671;
    }

    public BigDecimal getSueldoBase() {
        return sueldoBase;
    }

    public void setSueldoBase(BigDecimal sueldoBase) {
        this.sueldoBase = sueldoBase;
    }

    public BigDecimal getDl19990Snp() {
        return dl19990Snp;
    }

    public void setDl19990Snp(BigDecimal dl19990Snp) {
        this.dl19990Snp = dl19990Snp;
    }

    public BigDecimal getDsctoJudicial() {
        return dsctoJudicial;
    }

    public void setDsctoJudicial(BigDecimal dsctoJudicial) {
        this.dsctoJudicial = dsctoJudicial;
    }

    public BigDecimal getDerrMagisteria() {
        return derrMagisteria;
    }

    public void setDerrMagisteria(BigDecimal derrMagisteria) {
        this.derrMagisteria = derrMagisteria;
    }

    public BigDecimal getCoopCapacYupa() {
        return coopCapacYupa;
    }

    public void setCoopCapacYupa(BigDecimal coopCapacYupa) {
        this.coopCapacYupa = coopCapacYupa;
    }

    public BigDecimal getIpssvida() {
        return ipssvida;
    }

    public void setIpssvida(BigDecimal ipssvida) {
        this.ipssvida = ipssvida;
    }

    public BigDecimal getTardanzas() {
        return tardanzas;
    }

    public void setTardanzas(BigDecimal tardanzas) {
        this.tardanzas = tardanzas;
    }

    public BigDecimal getDl25897Afp() {
        return dl25897Afp;
    }

    public void setDl25897Afp(BigDecimal dl25897Afp) {
        this.dl25897Afp = dl25897Afp;
    }

    public BigDecimal getPagindnoaf() {
        return pagindnoaf;
    }

    public void setPagindnoaf(BigDecimal pagindnoaf) {
        this.pagindnoaf = pagindnoaf;
    }

    public BigDecimal getQuintacat() {
        return quintacat;
    }

    public void setQuintacat(BigDecimal quintacat) {
        this.quintacat = quintacat;
    }

    public BigDecimal getSegrimac() {
        return segrimac;
    }

    public void setSegrimac(BigDecimal segrimac) {
        this.segrimac = segrimac;
    }

    public BigDecimal getCmcusco() {
        return cmcusco;
    }

    public void setCmcusco(BigDecimal cmcusco) {
        this.cmcusco = cmcusco;
    }

    public BigDecimal getCmarequipa() {
        return cmarequipa;
    }

    public void setCmarequipa(BigDecimal cmarequipa) {
        this.cmarequipa = cmarequipa;
    }

    public BigDecimal getInterbank() {
        return interbank;
    }

    public void setInterbank(BigDecimal interbank) {
        this.interbank = interbank;
    }

    public BigDecimal getCmhuancayo() {
        return cmhuancayo;
    }

    public void setCmhuancayo(BigDecimal cmhuancayo) {
        this.cmhuancayo = cmhuancayo;
    }

    public BigDecimal getPrderrmag() {
        return prderrmag;
    }

    public void setPrderrmag(BigDecimal prderrmag) {
        this.prderrmag = prderrmag;
    }

    public BigDecimal getIdg() {
        return idg;
    }

    public void setIdg(BigDecimal idg) {
        this.idg = idg;
    }

    public BigDecimal getFentase() {
        return fentase;
    }

    public void setFentase(BigDecimal fentase) {
        this.fentase = fentase;
    }

    public BigDecimal getInasistencias() {
        return inasistencias;
    }

    public void setInasistencias(BigDecimal inasistencias) {
        this.inasistencias = inasistencias;
    }

    public BigDecimal getAeherme() {
        return aeherme;
    }

    public void setAeherme(BigDecimal aeherme) {
        this.aeherme = aeherme;
    }

    public BigDecimal getBripley() {
        return bripley;
    }

    public void setBripley(BigDecimal bripley) {
        this.bripley = bripley;
    }

    public BigDecimal getCraccentro() {
        return craccentro;
    }

    public void setCraccentro(BigDecimal craccentro) {
        this.craccentro = craccentro;
    }

    public BigDecimal getBcoPichincha() {
        return bcoPichincha;
    }

    public void setBcoPichincha(BigDecimal bcoPichincha) {
        this.bcoPichincha = bcoPichincha;
    }

    public BigDecimal getGproeducar() {
        return gproeducar;
    }

    public void setGproeducar(BigDecimal gproeducar) {
        this.gproeducar = gproeducar;
    }

    public BigDecimal getConstante() {
        return constante;
    }

    public void setConstante(BigDecimal constante) {
        this.constante = constante;
    }

    public BigDecimal getSubcafae() {
        return subcafae;
    }

    public void setSubcafae(BigDecimal subcafae) {
        this.subcafae = subcafae;
    }
}

