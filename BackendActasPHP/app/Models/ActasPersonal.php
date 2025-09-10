<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActasPersonal extends Model
{
    protected $table = 'Actas_Personal';

    protected $fillable = [
        'periodoPago',
        'fechaIngreso',
        'fechaTermino',
        'docReferencia',
        'codigoModular',
        'airhsp',
        'cargo',
        'apePaterno',
        'apeMaterno',
        'nombres',
        'situacion',
        'diasLicencia',
        'fecinilic',
        'tPlanilla',
        'fechaNacimiento',
        'sexo',
        'tipoDocumento',
        'nroDocumento',
        'ipss',
        'regPensionario',
        'codNexus',
        'afp',
        'cuspp',
        'fechaAfiliacion',
        'fechaDevengue',
        'ugel',
        'codEstablecimiento',
        'establecimiento',
        'nivel',
        'caractEstablecimiento',
        'unidCosteo',
        'cargoOrig',
        'leyendaPermanente',
        'modoPago',
        'ctaCte',
        'diasTrabajados',
        'decimas',
        'regLaboral',
        'tipoServidor',
        'nivelMagisterial',
        'codcomuna',
        'grupoRemunerativo',
        'jornadaLaboral',
        'tiempoServicio',
        'cadPresupuestal',
        'timpopen',
        'tributable',
        'imponible',
        'totalRemuneracion',
        'totalLiquido',
        'ingresosJson',
        'egresosJson',
    ];

    // Si la clave primaria es 'id', no necesitas especificar nada más
    // Si usas fechas tipo Carbon, Eloquent puede manejarlas automáticamente si los campos son tipo 'date'
    protected $casts = [
        'fechaIngreso' => 'date',
        'fechaTermino' => 'date',
        'fecinilic' => 'date',
        'fechaNacimiento' => 'date',
        'fechaAfiliacion' => 'date',
        'fechaDevengue' => 'date',
        // Puedes agregar más si necesitas
        'tributable' => 'decimal:2',
        'imponible' => 'decimal:2',
        'totalRemuneracion' => 'decimal:2',
        'totalLiquido' => 'decimal:2',
    ];
}