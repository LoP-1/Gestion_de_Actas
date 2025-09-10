<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'usuarios'; // Nombre de la tabla en tu base de datos

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'rol',
        'contrasena',
    ];
}