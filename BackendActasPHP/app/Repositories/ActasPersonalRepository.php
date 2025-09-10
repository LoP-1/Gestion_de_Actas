<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ActasPersonalRepository
{
    // Consulta para obtener actas por nro_documento
    public function findActasByNroDocumento($nroDocumento)
    {
        return DB::select(
            "SELECT id, periodo_pago, codigo_modular, total_remuneracion,
                JSON_UNQUOTE(JSON_EXTRACT(ingresos_json, '$.\"Sueldo Base\"')) AS sueldo_base
             FROM actas_personal_json
             WHERE nro_documento = ?", [$nroDocumento]
        );
    }

    // Consulta para todos los usuarios por periodo
    public function listarUsuariosPorPeriodo($periodoPago)
    {
        return DB::select(
            "SELECT id, `codigo modular` as codigoModular, nro_documento as dni, ape_paterno, ape_materno, nombres, cargo,
            `cargo/orig` as cargoOrig, cod_establecimiento as codEstablecimiento, situación as situacion, t_planilla as tPlanilla, ugel as region
            FROM actas_personal
            WHERE nro_documento IS NOT NULL AND nro_documento <> '' AND periodo_pago = ?
            ORDER BY dni, id", [$periodoPago]
        );
    }

    // Consulta grande para conseguir datos de usuarios por DNI
    public function findEmpleadoFormularioPorDni($dni)
    {
        return DB::select(
            "SELECT `codigo modular`, `cargo`, `ape_paterno`, `ape_materno`, `nombres`, `t_planilla`, `situación`, `fecha_nacimiento`,
            `sexo`, `ugel`, `cod_establecimiento`, `establecimiento`, `cod_nexus`, `tipo_documento`, `nro_documento`, `fecha_ingreso`,
            `fecha_término`, `doc_referencia`, `cargo/orig`, `ipss`, `reg_pensionario`, `cad_presupuestal`, `afp`, `cuspp`, `fecha_afiliación`,
            `fecha_devengue`, `reg_laboral`, `nivel`, `nivel_magisterial`, `modo_pago`, `leyenda_permanente`, `cta_cte`
            FROM actas_personal
            WHERE nro_documento = ?
            ORDER BY periodo_pago DESC
            LIMIT 1", [$dni]
        );
    }

    // Obtener periodos
    public function listarPeriodoPago()
    {
        return DB::select(
            "SELECT DISTINCT periodo_pago FROM actas_personal ORDER BY periodo_pago DESC"
        );
    }

    // Usuarios únicos por DNI
    public function listarUsuariosUnicosPorDni()
    {
        return DB::select(
            "SELECT MIN(id) as id, nro_documento as dni, nombres, CONCAT(ape_paterno, ' ', ape_materno) as apellido, `codigo modular`
            FROM actas_personal
            WHERE nro_documento IS NOT NULL AND nro_documento <> ''
            GROUP BY nro_documento, nombres, ape_paterno, ape_materno, `codigo modular`"
        );
    }

    // Todos los periodos de cada usuario
    public function listarPeriodosPorDni($dni)
    {
        return DB::select(
            "SELECT id, periodo_pago FROM actas_personal WHERE nro_documento = ? ORDER BY periodo_pago DESC", [$dni]
        );
    }

    // Periodo_pago y egresos_json para un nro_documento
    public function descuentosPorPeriodoUsuario($nroDocumento)
    {
        return DB::select(
            "SELECT periodo_pago, egresos_json FROM actas_personal WHERE nro_documento = ? ORDER BY periodo_pago DESC", [$nroDocumento]
        );
    }
}