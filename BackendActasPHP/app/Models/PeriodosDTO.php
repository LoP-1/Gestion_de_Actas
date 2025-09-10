<?php

namespace App\Models;

class PeriodosDTO
{
    public ?int $id;
    public ?string $periodoPago;

    public function __construct(?int $id = null, ?string $periodoPago = null)
    {
        $this->id = $id;
        $this->periodoPago = $periodoPago;
    }
}