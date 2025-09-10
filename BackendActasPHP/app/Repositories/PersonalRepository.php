<?php

namespace App\Repositories;

use App\Models\Personal;

class PersonalRepository
{
    public function findByDni($dni)
    {
        return Personal::where('dni', $dni)->first();
    }
}