<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActasController;
use App\Http\Controllers\CSVController;
use App\Http\Controllers\BeneficiarioCSVController;
use App\Http\Controllers\BeneficiarioController;

// Rutas de autenticación (sin middleware)
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register'])->middleware('jwt.auth:ADMIN'); // Solo ADMIN
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
});

// Ruta protegida de prueba
Route::middleware('jwt.auth')->get('/user', function (Request $request) {
    return auth()->user();
});

// Endpoints protegidos con JWT
Route::middleware('jwt.auth')->group(function () {
    // Usuarios: rutas más específicas primero
    Route::get('/usuarios/detalles', [ActasController::class, 'obtenerDetallesSimples']);  // ?nroDocumento=...
    Route::get('/usuarios/detalle/{dni}', [ActasController::class, 'obtenerPorDni']);
    Route::get('/usuarios/lista-unicos', [ActasController::class, 'listarUsuariosUnicosPorDni']);
    Route::get('/usuarios/periodos/{dni}', [ActasController::class, 'listarPeriodosPorDni']);

    // Periodos
    Route::get('/periodo', [ActasController::class, 'listarPeriodos']);
    Route::get('/periodo/{periodoPago}', [ActasController::class, 'listarUsuariosPorPeriodo']);

    // Descuentos
    Route::get('/descuentos', [ActasController::class, 'getPeriodosEgresos']);

    // Ruta dinámica numérica al final
    Route::get('/usuarios/{id}', [ActasController::class, 'obtenerUsuario'])
        ->whereNumber('id');
});
Route::get('/beneficiarios/periodos/dni/{dni}', [BeneficiarioController::class, 'obtenerPeriodosPorDniBeneficiario']);
// Beneficiarios: rutas más específicas primero
Route::get('/beneficiarios/periodos', [BeneficiarioController::class, 'obtenerPeriodosUnicos']);
Route::get('/beneficiarios/periodo/{periodo}', [BeneficiarioController::class, 'obtenerBeneficiariosPorPeriodo']);
Route::get('/beneficiarios/dni/{dni}', [BeneficiarioController::class, 'obtenerBeneficiariosPorDni']);
Route::get('/beneficiarios', [BeneficiarioController::class, 'index']);
Route::get('/beneficiarios/{id}', [BeneficiarioController::class, 'show'])->whereNumber('id'); // Si quieres restringir a números

// Upload CSV (público)
Route::post('/upload', [CSVController::class, 'importarCsv']);
Route::post('/upload/beneficiario', [BeneficiarioCSVController::class, 'importarCsv']);

// Rutas demo por rol (opcionales)
Route::middleware('jwt.auth:ADMIN')->group(function () {
    Route::get('/admin/users', fn() => response()->json(['message' => 'Lista de usuarios - Solo ADMIN']));
});
Route::middleware('jwt.auth:USER')->group(function () {
    Route::get('/user/profile', fn() => response()->json(['message' => 'Perfil de usuario - Solo USER']));
});