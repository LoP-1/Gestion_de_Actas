<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beneficiario;

class BeneficiarioController extends Controller
{
    // GET /api/beneficiarios/by-acta/{acta_personal_id}
    public function byActa($acta_personal_id)
    {
        $beneficiarios = Beneficiario::where('acta_personal_id', $acta_personal_id)->get();
        return response()->json($beneficiarios);
    }

    // GET /api/beneficiarios/{id}
    public function show($id)
    {
        $beneficiario = Beneficiario::find($id);
        if (!$beneficiario) {
            return response()->json(['error' => 'Beneficiario no encontrado'], 404);
        }
        return response()->json($beneficiario);
    }
}