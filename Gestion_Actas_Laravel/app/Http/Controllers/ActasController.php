<?php

namespace App\Http\Controllers;

use App\Services\ActasService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\ActasPersonal;
use App\Http\Resources\ActaPersonalResource;

class ActasController extends Controller
{
    public function __construct(private ActasService $actasService) {}

    // GET /usuarios/{id} -> ahora con claves camelCase como en Java
    public function obtenerUsuario(int $id): JsonResponse
    {
        $model = ActasPersonal::find($id);
        if (!$model) return response()->json(['error' => 'No encontrado'], 404);
        return response()->json((new ActaPersonalResource($model))->toArray(request()));
    }

    // GET /usuarios/detalles?nroDocumento=...
    public function obtenerDetallesSimples(Request $request): JsonResponse
    {
        $request->validate(['nroDocumento' => 'required|string']);
        $list = $this->actasService->getActasPorNroDocumento($request->get('nroDocumento'));
        return response()->json($list);
    }

    // GET /usuarios/detalle/{dni}
    public function obtenerPorDni(string $dni): JsonResponse
    {
        $dto = $this->actasService->obtenerFormularioPorDni($dni);
        if (!$dto) return response()->json(['error' => 'No encontrado'], 404);
        return response()->json($dto);
    }

    // GET /periodo
    public function listarPeriodos(): JsonResponse
    {
        return response()->json($this->actasService->listarPeriodos());
    }

    // GET /periodo/{periodoPago}
    public function listarUsuariosPorPeriodo(string $periodoPago): JsonResponse
    {
        return response()->json($this->actasService->obtenerUsuariosPorPeriodo($periodoPago));
    }

    // GET /usuarios/lista-unicos
    public function listarUsuariosUnicosPorDni(): JsonResponse
    {
        return response()->json($this->actasService->listarUsuariosUnicosPorDni());
    }

    // GET /usuarios/periodos/{dni}
    public function listarPeriodosPorDni(string $dni): JsonResponse
    {
        return response()->json($this->actasService->listarPeriodosPorDni($dni));
    }

    // GET /descuentos?nro_documento=...
    public function getPeriodosEgresos(Request $request): JsonResponse
    {
        $request->validate(['nro_documento' => 'required|string']);
        $list = $this->actasService->getPeriodosEgresosByNroDocumento($request->get('nro_documento'));
        return response()->json($list);
    }
}