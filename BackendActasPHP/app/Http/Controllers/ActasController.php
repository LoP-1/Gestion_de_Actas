<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ActasService;

class ActasController extends Controller
{
    protected $actasService;

    public function __construct(ActasService $actasService)
    {
        $this->actasService = $actasService;
    }

    public function obtenerUsuario($id)
    {
        return response()->json($this->actasService->obtenerPorId($id));
    }

    public function obtenerDetallesSimples(Request $request)
    {
        $nroDocumento = $request->get('nroDocumento');
        return response()->json($this->actasService->getActasPorNroDocumento($nroDocumento));
    }

    public function obtenerPorDni($dni)
    {
        $dto = $this->actasService->obtenerFormularioPorDni($dni);
        if ($dto === null) {
            return response()->json([], 404);
        }
        return response()->json($dto);
    }

    public function listarPeriodos()
    {
        return response()->json($this->actasService->listarPeriodos());
    }

    public function listarUsuariosPorPeriodo($periodoPago)
    {
        return response()->json($this->actasService->obtenerUsuariosPorPeriodo($periodoPago));
    }

    public function listarUsuariosUnicosPorDni()
    {
        return response()->json($this->actasService->listarUsuariosUnicosPorDni());
    }

    public function listarPeriodosPorDni($dni)
    {
        return response()->json($this->actasService->listarPeriodosPorDni($dni));
    }

    public function getPeriodosEgresos(Request $request)
    {
        $nroDocumento = $request->get('nro_documento');
        if (!$nroDocumento) {
            return response()->json([], 400);
        }
        $result = $this->actasService->getPeriodosEgresosByNroDocumento($nroDocumento);
        return response()->json($result);
    }
}