<?php

namespace App\Models;

class InicioPeriodosDTO
{
    public ?string $PeriodoPago;
    public ?string $Month;
    public ?int $Year;

    public function __construct(?string $PeriodoPago)
    {
        $this->PeriodoPago = $PeriodoPago;
        $this->parsePeriodoPago();
    }

    private function parsePeriodoPago(): void
    {
        if ($this->PeriodoPago && strlen($this->PeriodoPago) === 6) {
            $yearStr = substr($this->PeriodoPago, 0, 4);
            $monthStr = substr($this->PeriodoPago, 4, 2);
            $this->Year = intval($yearStr);
            $this->Month = $this->getMonthName(intval($monthStr));
        }
    }

    private function getMonthName(int $month): string
    {
        $months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return ($month >= 1 && $month <= 12) ? $months[$month - 1] : "Mes inválido";
    }
}