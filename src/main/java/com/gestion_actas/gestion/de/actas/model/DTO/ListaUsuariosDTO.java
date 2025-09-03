package com.gestion_actas.gestion.de.actas.model.DTO;

//formato de respuesta para mostrar usuarios
public class ListaUsuariosDTO {
    private Long id;
    private String dni;
    private String nombres;
    private String apellido;
    private String codigoModular;

    public ListaUsuariosDTO() {}

    public ListaUsuariosDTO(Long id, String dni, String nombres, String apellido, String codigoModular) {
        this.id = id;
        this.dni = dni;
        this.nombres = nombres;
        this.apellido = apellido;
        this.codigoModular = codigoModular;
    }

    //getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCodigoModular() {
        return codigoModular;
    }

    public void setCodigoModular(String codigoModular) {
        this.codigoModular = codigoModular;
    }
}