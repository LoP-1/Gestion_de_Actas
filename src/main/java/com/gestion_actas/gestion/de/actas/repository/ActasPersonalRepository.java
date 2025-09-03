package com.gestion_actas.gestion.de.actas.repository;

import com.gestion_actas.gestion.de.actas.model.Actas_Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActasPersonalRepository extends JpaRepository<Actas_Personal, Long> {

    //consulta sql para obtener Las actas usando el numero de documento
    @Query(
            value = "SELECT id, periodo_pago, codigo_modular, total_remuneracion, " +
                    "JSON_UNQUOTE(JSON_EXTRACT(ingresos_json, '$.\"Sueldo Base\"')) AS sueldo_base " +
                    "FROM actas_personal_json WHERE nro_documento = ?1",
            nativeQuery = true
    )
    List<Object[]> findActasByNroDocumento(String nroDocumento);

    //Consulta para seleccionar todos los usuarios por periodo
    @Query(
            value = "SELECT " +
                    "id, " +
                    "`codigo modular` as codigoModular, " +
                    "nro_documento as dni, " +
                    "ape_paterno, " +
                    "ape_materno, " +
                    "nombres, " +
                    "cargo, " +
                    "`cargo/orig` as cargoOrig, " +
                    "cod_establecimiento as codEstablecimiento, " +
                    "situación as situacion, " +
                    "t_planilla as tPlanilla, " +
                    "ugel as region " +
                    "FROM actas_personal " +
                    "WHERE nro_documento IS NOT NULL " +
                    "AND nro_documento <> '' " +
                    "AND periodo_pago = ?1 " +
                    "ORDER BY dni, id",
            nativeQuery = true
    )
    List<Object[]> ListarUsuariosPorPeriodo(String periodoPago);


    //consulta grande para conseguir los datos de usuarios
    @Query(
            value = "SELECT " +
                    "`codigo modular`, " +
                    "`cargo`, " +
                    "`ape_paterno`, " +
                    "`ape_materno`, " +
                    "`nombres`, " +
                    "`t_planilla`, " +
                    "`situación`, " +
                    "`fecha_nacimiento`, " +
                    "`sexo`, " +
                    "`ugel`, " +
                    "`cod_establecimiento`, " +
                    "`establecimiento`, " +
                    "`cod_nexus`, " +
                    "`tipo_documento`, " +
                    "`nro_documento`, " +
                    "`fecha_ingreso`, " +
                    "`fecha_término`, " +
                    "`doc_referencia`, " +
                    "`cargo/orig`, " +
                    "`ipss`, " +
                    "`reg_pensionario`, " +
                    "`cad_presupuestal`, " +
                    "`afp`, " +
                    "`cuspp`, " +
                    "`fecha_afiliación`, " +
                    "`fecha_devengue`, " +
                    "`reg_laboral`, " +
                    "`nivel`, " +
                    "`nivel_magisterial`, " +
                    "`modo_pago`, " +
                    "`leyenda_permanente`, " +
                    "`cta_cte` " +
                    "FROM actas_personal WHERE `nro_documento` = ?1 ORDER BY `periodo_pago` DESC LIMIT 1",
            nativeQuery = true
    )
    List<Object[]> findEmpleadoFormularioPorDni(String dni);

    //obtener periodos
    @Query(
            value = "SELECT DISTINCT periodo_pago FROM actas_personal ORDER BY periodo_pago DESC",
            nativeQuery = true
    )
    List<String> ListarPeriodoPago();



    //obtener los usuarios, evitando duplicados y usando dni para realizar la busqueda
    @Query(
            value = "SELECT MIN(id) as id, nro_documento as dni, nombres, CONCAT(ape_paterno, ' ', ape_materno) as apellido, `codigo modular` " +
                    "FROM actas_personal " +
                    "WHERE nro_documento IS NOT NULL AND nro_documento <> '' " +
                    "GROUP BY nro_documento, nombres, ape_paterno, ape_materno, `codigo modular`",
            nativeQuery = true
    )
    List<Object[]> listarUsuariosUnicosPorDni();

    //lista todos los periodos de cada usuario
    @Query(
            value = "SELECT id, periodo_pago FROM actas_personal WHERE nro_documento = ?1 ORDER BY periodo_pago DESC",
            nativeQuery = true
    )
    List<Object[]> listarPeriodosPorDni(String dni);



}