package com.gestion_actas.gestion.de.actas.repository;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.ActasUsuarioDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.DetalleActasDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActasRepository extends JpaRepository<ActasPersonal, Long> {

    // Query nativa (usa nombres de columnas de la BD)
    @Query(
            value = "SELECT `codigo modular`, ape_paterno, ape_materno, nombres, tipo_documento, nro_documento, `cargo/orig`, COUNT(*) AS cantidad " +
                    "FROM actas_personal " +
                    "GROUP BY `codigo modular`, ape_paterno, ape_materno, nombres, tipo_documento, nro_documento, `cargo/orig` " +
                    "ORDER BY cantidad DESC",
            nativeQuery = true
    )
    List<Object[]> obtenerResumenUsuarios();

    @Query(
            value = "SELECT id, periodo_pago, `codigo modular`, total_remuneracion FROM actas_personal WHERE nro_documento = ?1",
            nativeQuery = true
    )
    List<Object[]> findActasByNroDocumento(String nroDocumento);

    //obtener el nombre por dni
    @Query(
            value = "SELECT CONCAT(nombres, ' ', ape_paterno, ' ', ape_materno) " +
                    "FROM actas_personal WHERE nro_documento = ?1 LIMIT 1",
            nativeQuery = true
    )
    String findNombreCompletoByNroDocumento(String nroDocumento);



    //actas version angular
    //obtener usuarios sin duplicados
//    @Query(
//            value = "SELECT " +
//                    "`codigo modular` as codigoModular, " +
//                    "nro_documento as dni, " +
//                    "MAX(ape_paterno) as ape_paterno, " +
//                    "MAX(ape_materno) as ape_materno, " +
//                    "MAX(nombres) as nombres, " +
//                    "MAX(cargo) as cargo, " +
//                    "MAX(cod_establecimiento) as codEstablecimiento, " +
//                    "MAX(situación) as situacion, " +
//                    "MAX(t_planilla) as tPlanilla, " +
//                    "MAX(ugel) as ugel, " +
//                    "COUNT(*) as vecesRepetido " +
//                    "FROM actas_personal " +
//                    "WHERE nro_documento IS NOT NULL AND nro_documento <> '' " +
//                    "GROUP BY nro_documento " +
//                    "ORDER BY vecesRepetido DESC",
//            nativeQuery = true
//    )
//    List<Object[]> obtenerResumenUsuariosSinDuplicados();


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


}
