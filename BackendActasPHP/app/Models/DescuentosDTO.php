<?php

namespace App\Models;

class DescuentosDTO
{
    public ?string $periodoPago;
    public ?string $egresosJson;

    public function __construct(?string $periodoPago = null, ?string $egresosJson = null)
    {
        $this->periodoPago = $periodoPago;
        $this->egresosJson = $egresosJson;
    }

    public static function fromRow(array $row): ?DescuentosDTO
    {
        if (!$row) return null;
        $periodo = $row[0] ?? null;
        $egresos = $row[1] ?? null;
        return new DescuentosDTO($periodo, $egresos);
    }
}