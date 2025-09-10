<?php

namespace App\Services;

use App\Models\ActasPersonal;
use App\Models\DetalleActasDTO;
use App\Models\UsuarioResumenDTO;
use App\Models\UsuarioDetalleDTO;
use App\Models\InicioPeriodosDTO;
use App\Models\ListaUsuariosDTO;
use App\Models\PeriodosDTO;
use App\Models\DescuentosDTO;
use App\Repositories\ActasPersonalRepository;

class ActasService
{
    protected $actasRepository;

    public function __construct(ActasPersonalRepository $actasRepository)
    {
        $this->actasRepository = $actasRepository;
    }

    public function getActasPorNroDocumento($nroDocumento)
    {
        $resultados = $this->actasRepository->findActasByNroDocumento($nroDocumento);
        $list = [];
        foreach ($resultados as $row) {
            $list[] = new DetalleActasDTO(
                isset($row->id) ? intval($row->id) : null,
                $row->periodo_pago ?? null,
                $row->codigo_modular ?? null,
                isset($row->total_remuneracion) ? floatval($row->total_remuneracion) : null
            );
        }
        return $list;
    }

    public function obtenerPorId($id)
    {
        return ActasPersonal::find($id);
    }

    public function obtenerUsuariosPorPeriodo($periodoPago)
    {
        $resultados = $this->actasRepository->listarUsuariosPorPeriodo($periodoPago);
        $lista = [];
        foreach ($resultados as $row) {
            $lista[] = new UsuarioResumenDTO(
                isset($row->id) ? intval($row->id) : null,
                $row->codigoModular ?? null,
                $row->dni ?? null,
                trim(($row->ape_paterno ?? '') . ' ' . ($row->ape_materno ?? '')),
                $row->nombres ?? null,
                $row->cargo ?? null,
                $row->cargoOrig ?? null,
                $row->codEstablecimiento ?? null,
                $row->situacion ?? null,
                $row->tPlanilla ?? null,
                $row->region ?? null
            );
        }
        return $lista;
    }

    public function obtenerFormularioPorDni($dni)
    {
        $filas = $this->actasRepository->findEmpleadoFormularioPorDni($dni);
        if (!$filas || count($filas) === 0) return null;

        $fila = $filas[0];
        $dto = new UsuarioDetalleDTO();
        $i = 0;
        $props = [
            'codigoModular', 'cargo', 'apePaterno', 'apeMaterno', 'nombres', 'tPlanilla', 'situacion', 'fechaNacimiento', 'sexo',
            'ugel', 'codEstablecimiento', 'establecimiento', 'codModIE', 'tipoDocumento', 'nroDocumento', 'fechaIngreso', 'fechaTermino',
            'docReferencia', 'cargoOrig', 'ipss', 'regPensionario', 'cadPresupuestal', 'afp', 'cuspp', 'fechaAfiliacion', 'fechaDevengue',
            'regLaboral', 'nivel', 'nivelMagisterial', 'modoPago', 'leyendaPermanente', 'ctaCte'
        ];
        foreach ($props as $prop) {
            $dto->$prop = $fila->$prop ?? null;
            $i++;
        }
        return $dto;
    }

    public function listarPeriodos()
    {
        $periodos = $this->actasRepository->listarPeriodoPago();
        $periodosPago = [];
        foreach ($periodos as $p) {
            $periodosPago[] = new InicioPeriodosDTO($p->periodo_pago ?? null);
        }
        return $periodosPago;
    }

    public function listarUsuariosUnicosPorDni()
    {
        $resultados = $this->actasRepository->listarUsuariosUnicosPorDni();
        $list = [];
        foreach ($resultados as $row) {
            $list[] = new ListaUsuariosDTO(
                isset($row->id) ? intval($row->id) : null,
                $row->dni ?? null,
                $row->nombres ?? null,
                $row->apellido ?? null,
                $row->codigoModular ?? null
            );
        }
        return $list;
    }

    public function listarPeriodosPorDni($dni)
    {
        $resultados = $this->actasRepository->listarPeriodosPorDni($dni);
        $list = [];
        foreach ($resultados as $row) {
            $list[] = new PeriodosDTO(
                isset($row->id) ? intval($row->id) : null,
                $row->periodo_pago ?? null
            );
        }
        return $list;
    }

    public function getPeriodosEgresosByNroDocumento($nroDocumento)
    {
        $rows = $this->actasRepository->descuentosPorPeriodoUsuario($nroDocumento);
        $all = [];
        foreach ($rows as $row) {
            $dto = DescuentosDTO::fromRow([$row->periodo_pago ?? null, $row->egresos_json ?? null]);
            if ($dto && $dto->periodoPago) $all[] = $dto;
        }
        return $all;
    }
}