<?php

namespace App\Services;

use App\Models\Beneficiario;

class BeneficiarioService
{
    public function buscarPorActaPersonalId($actaPersonalId)
    {
        return Beneficiario::where('acta_personal_id', $actaPersonalId)->get();
    }

    public function obtenerPorId($id)
    {
        return Beneficiario::find($id);
    }

    // Aquí puedes poner más lógica de negocio o importar CSV, etc.
}