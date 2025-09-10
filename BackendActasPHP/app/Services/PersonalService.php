<?php

namespace App\Services;

use App\Models\Personal;
use Illuminate\Support\Facades\Hash;

class PersonalService
{
    public function registrarUsuario($data)
    {
        $data['contrasena'] = Hash::make($data['contrasena']);
        return Personal::create($data);
    }

    public function login($dni, $contrasena)
    {
        $user = Personal::where('dni', $dni)->first();
        if ($user && Hash::check($contrasena, $user->contrasena)) {
            return $user;
        }
        return null;
    }

    public function buscarPorDni($dni)
    {
        return Personal::where('dni', $dni)->first();
    }
}