<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ActasPersonal extends Model
{
    protected $table = 'actas_personal';

    protected $fillable = [
        'periodo_pago',
        'fecha_ingreso',
        'fecha_termino',
        'doc_referencia',
        'codigo_modular',
        'airhsp',
        'cargo',
        'ape_paterno',
        'ape_materno',
        'nombres',
        'situacion',
        'dias_licencia',
        'fecinilic',
        't_planilla',
        'fecha_nacimiento',
        'sexo',
        'tipo_documento',
        'nro_documento',
        'ipss',
        'reg_pensionario',
        'cod_nexus',
        'afp',
        'cuspp',
        'fecha_afiliacion',
        'fecha_devengue',
        'ugel',
        'cod_establecimiento',
        'establecimiento',
        'nivel',
        'caract_establecimiento',
        'unid_costeo',
        'cargo_orig',
        'leyenda_permanente',
        'modo_pago',
        'cta_cte',
        'dias_trabajados',
        'decimas',
        'reg_laboral',
        'tipo_servidor',
        'nivel_magisterial',
        'codcomuna',
        'grupo_remunerativo',
        'jornada_laboral',
        'tiempo_servicio',
        'cad_presupuestal',
        'timpopen',
        'tributable',
        'imponible',
        'total_remuneracion',
        'total_liquido',
        'ingresos_json',
        'egresos_json',
    ];

    public function beneficiarios()
    {
        return $this->hasMany(Beneficiario::class, 'acta_personal_id');
    }

    protected $casts = [
        'ingresos_json' => 'array',
        'egresos_json'  => 'array',
    ];

    public $timestamps = true;

    // Distintos periodos de pago
    public static function listarPeriodosPago()
    {
        return DB::table('actas_personal')
            ->select('periodo_pago')
            ->whereNotNull('periodo_pago')
            ->distinct()
            ->orderBy('periodo_pago', 'desc')
            ->get();
    }

    // Lista de usuarios (resumen) por periodo
    public static function listarUsuariosPorPeriodo(string $periodoPago)
    {
        return DB::table('actas_personal')
            ->select([
                'id',
                DB::raw('codigo_modular AS codigoModular'),
                DB::raw('nro_documento AS dni'),
                'ape_paterno',
                'ape_materno',
                'nombres',
                'cargo',
                DB::raw('cargo_orig AS cargoOrig'),
                DB::raw('cod_establecimiento AS codEstablecimiento'),
                'situacion',
                DB::raw('t_planilla AS tPlanilla'),
                DB::raw('ugel AS region'),
            ])
            ->where('periodo_pago', $periodoPago)
            ->orderBy('ape_paterno')
            ->orderBy('ape_materno')
            ->orderBy('nombres')
            ->get();
    }

    // Lista única de usuarios por DNI (toma el último periodo por DNI)
    public static function listarUsuariosUnicosPorDni()
    {
        return DB::table(DB::raw('(
                SELECT ap.*,
                       ROW_NUMBER() OVER (
                           PARTITION BY ap.nro_documento
                           ORDER BY ap.periodo_pago DESC, ap.id DESC
                       ) AS rn
                FROM actas_personal ap
                WHERE ap.nro_documento IS NOT NULL AND ap.nro_documento <> ""
            ) t'))
            ->where('t.rn', 1)
            ->select([
                't.id',
                DB::raw('t.nro_documento AS dni'),
                't.nombres',
                DB::raw('CONCAT_WS(" ", t.ape_paterno, t.ape_materno) AS apellido'),
                't.codigo_modular',
            ])
            ->orderBy('apellido')
            ->orderBy('t.nombres')
            ->get();
    }

    // Periodos por DNI
    public static function listarPeriodosPorDni(string $dni)
    {
        return DB::table('actas_personal')
            ->select([
                'id',
                DB::raw('periodo_pago AS periodo_pago'),
            ])
            ->where('nro_documento', $dni)
            ->orderBy('periodo_pago', 'desc')
            ->get();
    }

    // Resumen por NroDocumento (para /usuarios/detalles)
    public static function getActasByNroDocumento(string $nroDocumento)
    {
        return DB::table('actas_personal')
            ->select([
                'id',
                'periodo_pago',
                'codigo_modular',
                'total_remuneracion',
            ])
            ->where('nro_documento', $nroDocumento)
            ->orderBy('periodo_pago', 'desc')
            ->get();
    }

    // Detalle de formulario por DNI (último periodo)
    public static function getEmpleadoFormularioPorDni(string $dni)
    {
        return DB::table('actas_personal')
            ->select([
                'codigo_modular',
                'cargo',
                'ape_paterno',
                'ape_materno',
                'nombres',
                't_planilla',
                'situacion',
                'fecha_nacimiento',
                'sexo',
                'ugel',
                'cod_establecimiento',
                'establecimiento',
                'cod_nexus',
                'tipo_documento',
                'nro_documento',
                'fecha_ingreso',
                'fecha_termino',
                'doc_referencia',
                'cargo_orig',
                'ipss',
                'reg_pensionario',
                'cad_presupuestal',
                'afp',
                'cuspp',
                'fecha_afiliacion',
                'fecha_devengue',
                'reg_laboral',
                'nivel',
                'nivel_magisterial',
                'modo_pago',
                'leyenda_permanente',
                'cta_cte',
            ])
            ->where('nro_documento', $dni)
            ->orderBy('periodo_pago', 'desc')
            ->limit(1)
            ->get();
    }

    // Descuentos (egresos) por NroDocumento
    public static function descuentosPorPeriodoUsuario(string $nroDocumento)
    {
        return DB::table('actas_personal')
            ->select([
                'periodo_pago',
                'egresos_json',
            ])
            ->where('nro_documento', $nroDocumento)
            ->orderBy('periodo_pago', 'desc')
            ->get();
    }
}