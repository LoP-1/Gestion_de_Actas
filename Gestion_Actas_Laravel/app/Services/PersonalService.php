<?php

namespace App\Services;

use App\Models\Personal;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class PersonalService
{
    /**
     * Registrar usuario (equivalente a registrarUsuario)
     */
    public function registrarUsuario($datos)
    {
        $datos['contrasena'] = Hash::make($datos['contrasena']);
        return Personal::create($datos);
    }

    /**
     * Login (equivalente a login)
     */
    public function login($dni, $contrasena)
    {
        $usuario = Personal::findByDni($dni);
        
        if ($usuario && Hash::check($contrasena, $usuario->contrasena)) {
            // Generar token JWT
            $token = JWTAuth::fromUser($usuario);
            
            return [
                'success' => true,
                'token' => $token,
                'user' => $usuario,
            ];
        }
        
        return [
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ];
    }

    /**
     * Buscar por DNI
     */
    public function buscarPorDni($dni)
    {
        return Personal::findByDni($dni);
    }

    /**
     * Validar token JWT
     */
    public function validateToken($token)
    {
        try {
            $usuario = JWTAuth::parseToken()->authenticate();
            return $usuario;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Refresh token
     */
    public function refreshToken()
    {
        try {
            $newToken = JWTAuth::refresh();
            return $newToken;
        } catch (\Exception $e) {
            return null;
        }
    }
}