<?php

namespace App\Models;

class DetalleActasDTO
{
    public ?int $id;
    public ?string $periodoPago;
    public ?string $codigoModular;
    public ?float $totalRemuneracion;

    public function __construct(?int $id, ?string $periodoPago, ?string $codigoModular, ?float $totalRemuneracion)
    {
        $this->id = $id;
        $this->periodoPago = $periodoPago;
        $this->codigoModular = $codigoModular;
        $this->totalRemuneracion = $totalRemuneracion;
    }
}