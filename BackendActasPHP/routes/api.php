<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/usuarios/{id}', [ActasController::class, 'obtenerUsuario']);
Route::get('/usuarios/detalles', [ActasController::class, 'obtenerDetallesSimples']);
Route::get('/usuarios/detalle/{dni}', [ActasController::class, 'obtenerPorDni']);
Route::get('/periodo', [ActasController::class, 'listarPeriodos']);
Route::get('/periodo/{periodoPago}', [ActasController::class, 'listarUsuariosPorPeriodo']);
Route::get('/usuarios/lista-unicos', [ActasController::class, 'listarUsuariosUnicosPorDni']);
Route::get('/usuarios/periodos/{dni}', [ActasController::class, 'listarPeriodosPorDni']);
Route::get('/descuentos', [ActasController::class, 'getPeriodosEgresos']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'registrar']);

Route::post('/upload', [CSVController::class, 'importarCsv']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
