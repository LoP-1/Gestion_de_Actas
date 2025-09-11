<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        try {
            // Verificar si el token existe
            $user = JWTAuth::parseToken()->authenticate();
            
            // Si se especificaron roles, verificar que el usuario tenga el rol correcto
            if (!empty($roles) && !in_array($user->rol, $roles)) {
                return response()->json([
                    'error' => 'No tienes permisos para acceder a este recurso'
                ], 403);
            }
            
        } catch (TokenExpiredException $e) {
            return response()->json([
                'error' => 'Token expirado'
            ], 401);
            
        } catch (TokenInvalidException $e) {
            return response()->json([
                'error' => 'Token inválido'
            ], 401);
            
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Token no encontrado'
            ], 401);
        }

        return $next($request);
    }
}