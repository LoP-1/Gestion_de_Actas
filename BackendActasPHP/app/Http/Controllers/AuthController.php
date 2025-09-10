<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PersonalService;
use App\Helpers\JwtUtil;

class AuthController extends Controller
{
    protected $personalService;
    protected $jwtUtil;

    public function __construct(PersonalService $personalService, JwtUtil $jwtUtil)
    {
        $this->personalService = $personalService;
        $this->jwtUtil = $jwtUtil;
    }

    public function login(Request $request)
    {
        $dni = $request->input('dni');
        $contrasena = $request->input('contrasena');
        $user = $this->personalService->login($dni, $contrasena);

        if ($user) {
            $token = $this->jwtUtil->generateToken($user->dni, $user->rol);
            return response()->json([
                'token' => $token,
                'rol' => $user->rol,
            ]);
        } else {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }
    }

    public function registrar(Request $request)
    {
        $dni = $request->input('dni');
        if ($this->personalService->buscarPorDni($dni)) {
            return response()->json(['error' => 'Ya existe un usuario con el DNI ingresado'], 400);
        }
        $nuevo = $this->personalService->registrarUsuario($request->all());
        return response()->json($nuevo);
    }
}