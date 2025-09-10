<?php

namespace App\Models;

class UsuarioResumenDTO
{
    public ?int $id;
    public ?string $codigoModular;
    public ?string $dni;
    public ?string $apellidos;
    public ?string $nombres;
    public ?string $cargo;
    public ?string $cargoOrig;
    public ?string $codEstablecimiento;
    public ?string $situacion;
    public ?string $tPlanilla;
    public ?string $region;

    public function __construct(
        ?int $id = null,
        ?string $codigoModular = null,
        ?string $dni = null,
        ?string $apellidos = null,
        ?string $nombres = null,
        ?string $cargo = null,
        ?string $cargoOrig = null,
        ?string $codEstablecimiento = null,
        ?string $situacion = null,
        ?string $tPlanilla = null,
        ?string $region = null
    ) {
        $this->id = $id;
        $this->codigoModular = $codigoModular;
        $this->dni = $dni;
        $this->apellidos = $apellidos;
        $this->nombres = $nombres;
        $this->cargo = $cargo;
        $this->cargoOrig = $cargoOrig;
        $this->codEstablecimiento = $codEstablecimiento;
        $this->situacion = $situacion;
        $this->tPlanilla = $tPlanilla;
        $this->region = $region;
    }
}