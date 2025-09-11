<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Personal;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Verificar si ya existe el admin
        $adminExists = Personal::where('dni', '99999999')->exists();
        
        if (!$adminExists) {
            Personal::create([
                'nombre' => 'Admin',
                'apellido' => 'System',
                'dni' => '99999999',
                'rol' => 'ADMIN',
                'contrasena' => Hash::make('admin'),
            ]);
            
            echo "Usuario ADMIN creado (DNI: 99999999, Password: admin)\n";
        } else {
            echo "Usuario ADMIN ya existe, no se crea otro.\n";
        }
    }
}