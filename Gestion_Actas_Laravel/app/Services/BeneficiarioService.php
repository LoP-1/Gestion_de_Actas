<?php

namespace App\Services;

use App\Models\Beneficiario;

class BeneficiarioService
{
    public function listar(array $filters = [])
    {
        $q = Beneficiario::query();
        if (!empty($filters['periodo_pago'])) $q->where('periodo_pago', $filters['periodo_pago']);
        if (!empty($filters['dni_tit'])) $q->where('dni_tit', $filters['dni_tit']);
        if (!empty($filters['cod_mod_tit'])) $q->where('cod_mod_tit', $filters['cod_mod_tit']);
        if (!empty($filters['airshp'])) $q->where('airshp', $filters['airshp']);
        return $q->get();
    }

    public function obtenerPorId($id)
    {
        return Beneficiario::find($id);
    }
}