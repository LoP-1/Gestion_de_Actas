<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beneficiario;

class BeneficiarioController extends Controller
{
    public function index(Request $request)
    {
        $q = Beneficiario::query();

        // Filtros opcionales
        $q->when($request->filled('periodo_pago'), fn($qq) => $qq->where('periodo_pago', $request->string('periodo_pago')));
        $q->when($request->filled('dni_tit'), fn($qq) => $qq->where('dni_tit', $request->string('dni_tit')));
        $q->when($request->filled('cod_mod_tit'), fn($qq) => $qq->where('cod_mod_tit', $request->string('cod_mod_tit')));
        $q->when($request->filled('airshp'), fn($qq) => $qq->where('airshp', $request->string('airshp')));

        // Puedes paginar si quieres:
        // return response()->json($q->paginate(50));
        return response()->json($q->get());
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


    // GET /api/beneficiarios/periodos/dni/{dni}
public function obtenerPeriodosPorDniBeneficiario($dni)
{
    $periodos = Beneficiario::where('dni_tit', $dni)
        ->distinct()
        ->orderBy('periodo_pago')
        ->pluck('periodo_pago');

    return response()->json($periodos);
}

    //GET /api/beneficiarios/periodo/{periodo}
    public function obtenerBeneficiariosPorPeriodo($periodo)
    {
        $beneficiarios = Beneficiario::where('periodo_pago', $periodo)->get();
        return response()->json($beneficiarios);
    }

    //GET /api/beneficiarios/dni/{dni}
    public function obtenerBeneficiariosPorDni($dni)
    {
        $beneficiarios = Beneficiario::where('dni_tit', $dni)->get();
        return response()->json($beneficiarios);
    }
    // GET /api/beneficiarios/periodos
    public function obtenerPeriodosUnicos()
{
    $periodos = Beneficiario::distinct()->pluck('periodo_pago');
    return response()->json($periodos);
}

}