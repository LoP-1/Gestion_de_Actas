<?php

namespace App\Models;

class ListaUsuariosDTO
{
    public ?int $id;
    public ?string $dni;
    public ?string $nombres;
    public ?string $apellido;
    public ?string $codigoModular;

    public function __construct(?int $id = null, ?string $dni = null, ?string $nombres = null, ?string $apellido = null, ?string $codigoModular = null)
    {
        $this->id = $id;
        $this->dni = $dni;
        $this->nombres = $nombres;
        $this->apellido = $apellido;
        $this->codigoModular = $codigoModular;
    }
}