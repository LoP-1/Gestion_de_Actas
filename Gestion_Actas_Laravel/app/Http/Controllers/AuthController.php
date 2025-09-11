<?php

namespace App\Http\Controllers;

use App\Services\PersonalService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    private $personalService;

    public function __construct(PersonalService $personalService)
    {
        $this->personalService = $personalService;
    }

    /**
     * Login (equivalente a tu endpoint /auth/login)
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'dni' => 'required|string',
            'contrasena' => 'required|string',
        ]);

        $resultado = $this->personalService->login(
            $request->dni, 
            $request->contrasena
        );

        if ($resultado['success']) {
            return response()->json([
                'token' => $resultado['token'],
                'rol' => $resultado['user']->rol,
            ]);
        }

        return response()->json([
            'error' => $resultado['message']
        ], 401);
    }

    /**
     * Register (equivalente a tu endpoint /auth/register)
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'dni' => 'required|string|unique:personal,dni',
            'rol' => 'sometimes|string|in:ADMIN,USER',
            'contrasena' => 'required|string|min:6',
        ]);

        // Verificar si ya existe un usuario con ese DNI
        if ($this->personalService->buscarPorDni($request->dni)) {
            return response()->json([
                'error' => 'Ya existe un usuario con el DNI ingresado'
            ], 400);
        }

        $datos = $request->all();
        $datos['rol'] = $datos['rol'] ?? 'USER'; // Default USER si no se especifica

        $usuario = $this->personalService->registrarUsuario($datos);

        return response()->json($usuario, 201);
    }

    /**
     * Refresh token
     */
    public function refresh(): JsonResponse
    {
        $newToken = $this->personalService->refreshToken();
        
        if ($newToken) {
            return response()->json(['token' => $newToken]);
        }
        
        return response()->json(['error' => 'No se pudo refrescar el token'], 401);
    }

    /**
     * Logout
     */
    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Logout exitoso']);
    }
}