package com.gestion_actas.gestion.de.actas.model.DTO;

public class InicioTablaDTO {
    private String codigoModular;
    private String apePaterno;
    private String apeMaterno;
    private String nombres;
    private String tipoDocumento;
    private String nroDocumento;
    private String cargoOrig;
    private Long cantidad;

    public InicioTablaDTO(String codigoModular, String apePaterno, String apeMaterno, String nombres, String tipoDocumento, String nroDocumento, String cargoOrig, Long cantidad) {
        this.codigoModular = codigoModular;
        this.apePaterno = apePaterno;
        this.apeMaterno = apeMaterno;
        this.nombres = nombres;
        this.tipoDocumento = tipoDocumento;
        this.nroDocumento = nroDocumento;
        this.cargoOrig = cargoOrig;
        this.cantidad = cantidad;
    }

        public String getCodigoModular() { return codigoModular; }
        public String getApePaterno() { return apePaterno; }
        public String getApeMaterno() { return apeMaterno; }
        public String getNombres() { return nombres; }
        public String getTipoDocumento() { return tipoDocumento; }
        public String getNroDocumento() { return nroDocumento; }
        public String getCargoOrig() { return cargoOrig; }
        public Long getCantidad() { return cantidad; }

        public void setCodigoModular(String codigoModular) { this.codigoModular = codigoModular; }
        public void setApePaterno(String apePaterno) { this.apePaterno = apePaterno; }
        public void setApeMaterno(String apeMaterno) { this.apeMaterno = apeMaterno; }
        public void setNombres(String nombres) { this.nombres = nombres; }
        public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }
        public void setNroDocumento(String nroDocumento) { this.nroDocumento = nroDocumento; }
        public void setCargoOrig(String cargoOrig) { this.cargoOrig = cargoOrig; }
        public void setCantidad(Long cantidad) { this.cantidad = cantidad; }

}
