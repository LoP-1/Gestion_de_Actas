<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beneficiario extends Model
{
    protected $table = 'beneficiarios';

    protected $fillable = [
        'periodo_pago',
        'cod_mod_tit',
        'cargo_tit',
        'pat_tit',
        'mat_tit',
        'nom_tit',
        'dni_tit',
        'fnac_tit',
        'rut_fam',
        'dni_ben',
        'airshp',
        'pat_ben',
        'mat_ben',
        'nom_ben',
        'fnac_ben',
        'parent',
        'cuenta_ahorro',
        'total_haber',
        'total_liquido',
        'tributable',
        'imponible',
        'tipo_benef',
        'leyenda',
        'haberes_json',
    ];

    protected $casts = [
        'haberes_json' => 'array',
        'fnac_tit'     => 'date',
        'fnac_ben'     => 'date',
        'total_haber'      => 'decimal:2',
        'total_liquido'    => 'decimal:2',
        'tributable'       => 'decimal:2',
        'imponible'        => 'decimal:2',
    ];

}