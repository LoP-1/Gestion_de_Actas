<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtUtil
{
    private $key;
    private $expiration;

    public function __construct()
    {
        $this->key = env('JWT_SECRET');
        $this->expiration = env('JWT_EXPIRATION', 86400);
    }

    public function generateToken($username, $rol)
    {
        $now = time();
        $exp = $now + $this->expiration;

        $payload = [
            'sub' => $username,
            'rol' => $rol,
            'iat' => $now,
            'exp' => $exp,
        ];

        return JWT::encode($payload, $this->key, 'HS256');
    }

    public function extractUsername($token)
    {
        $payload = $this->claims($token);
        return $payload['sub'] ?? null;
    }

    public function extractRol($token)
    {
        $payload = $this->claims($token);
        return $payload['rol'] ?? null;
    }

    public function validateToken($token)
    {
        try {
            JWT::decode($token, new Key($this->key, 'HS256'));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function claims($token)
    {
        return (array) JWT::decode($token, new Key($this->key, 'HS256'));
    }
}