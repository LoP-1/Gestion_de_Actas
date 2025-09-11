<?php

namespace App\Services;

use App\Models\ActasPersonal;

class ActasService
{
    // GET /usuarios/{id}
    public function obtenerPorId(int $id): ?array
    {
        $row = ActasPersonal::find($id);
        return $row ? $row->toArray() : null;
    }

    // GET /usuarios/detalles?nroDocumento=...
    public function getActasPorNroDocumento(string $nroDocumento): array
    {
        $rows = ActasPersonal::getActasByNroDocumento($nroDocumento);
        $list = [];
        foreach ($rows as $r) {
            $list[] = [
                'id' => (int) $r->id,
                'periodoPago' => $r->periodo_pago,
                'codigoModular' => $r->codigo_modular,
                'totalRemuneracion' => $r->total_remuneracion !== null ? (float) $r->total_remuneracion : null,
                // opcional: 'sueldoBase' => $r->sueldo_base
            ];
        }
        return $list;
    }

    // GET /usuarios/detalle/{dni}
    public function obtenerFormularioPorDni(string $dni): ?array
    {
        $rows = ActasPersonal::getEmpleadoFormularioPorDni($dni);
        if (!$rows || count($rows) === 0) return null;
        $r = $rows[0];

        return [
            'codigoModular'     => $r->codigo_modular,
            'cargo'             => $r->cargo,
            'apePaterno'        => $r->ape_paterno,
            'apeMaterno'        => $r->ape_materno,
            'nombres'           => $r->nombres,
            'tPlanilla'         => $r->t_planilla,
            'situacion'         => $r->situacion,
            'fechaNacimiento'   => $r->fecha_nacimiento,
            'sexo'              => $r->sexo,
            'ugel'              => $r->ugel,
            'codEstablecimiento'=> $r->cod_establecimiento,
            'establecimiento'   => $r->establecimiento,
            'codModIE'          => $r->cod_nexus,
            'tipoDocumento'     => $r->tipo_documento,
            'nroDocumento'      => $r->nro_documento,
            'fechaIngreso'      => $r->fecha_ingreso,
            'fechaTermino'      => $r->fecha_termino,
            'docReferencia'     => $r->doc_referencia,
            'cargoOrig'         => $r->cargo_orig,
            'ipss'              => $r->ipss,
            'regPensionario'    => $r->reg_pensionario,
            'cadPresupuestal'   => $r->cad_presupuestal,
            'afp'               => $r->afp,
            'cuspp'             => $r->cuspp,
            'fechaAfiliacion'   => $r->fecha_afiliacion,
            'fechaDevengue'     => $r->fecha_devengue,
            'regLaboral'        => $r->reg_laboral,
            'nivel'             => $r->nivel,
            'nivelMagisterial'  => $r->nivel_magisterial,
            'modoPago'          => $r->modo_pago,
            'leyendaPermanente' => $r->leyenda_permanente,
            'ctaCte'            => $r->cta_cte,
        ];
    }

    // GET /periodo
    public function listarPeriodos(): array
    {
        $rows = ActasPersonal::listarPeriodosPago();
        $out = [];
        foreach ($rows as $r) {
            $p = $r->periodo_pago;
            if (!$p || strlen($p) !== 6) continue;
            $year = (int) substr($p, 0, 4);
            $monthNum = (int) substr($p, 4, 2);
            $out[] = [
                'PeriodoPago' => $p,
                'Month' => $this->monthNameEs($monthNum),
                'Year'  => $year,
            ];
        }
        return $out;
    }

    // GET /periodo/{periodoPago}
    public function obtenerUsuariosPorPeriodo(string $periodoPago): array
    {
        $rows = ActasPersonal::listarUsuariosPorPeriodo($periodoPago);
        $out = [];
        foreach ($rows as $r) {
            $out[] = [
                'id' => (int) $r->id,
                'codigoModular' => $r->codigoModular,
                'dni' => $r->dni,
                'apellidos' => trim(($r->ape_paterno ?? '') . ' ' . ($r->ape_materno ?? '')),
                'nombres' => $r->nombres,
                'cargo' => $r->cargo,
                'cargoOrig' => $r->cargoOrig,
                'codEstablecimiento' => $r->codEstablecimiento,
                'situacion' => $r->situacion,
                'tPlanilla' => $r->tPlanilla,
                'region' => $r->region,
            ];
        }
        return $out;
    }

    // GET /usuarios/lista-unicos
    public function listarUsuariosUnicosPorDni(): array
    {
        $rows = ActasPersonal::listarUsuariosUnicosPorDni();
        $out = [];
        foreach ($rows as $r) {
            $out[] = [
                'id' => (int) $r->id,
                'dni' => $r->dni,
                'nombres' => $r->nombres,
                'apellido' => $r->apellido,
                'codigoModular' => $r->codigo_modular,
            ];
        }
        return $out;
    }

    // GET /usuarios/periodos/{dni}
    public function listarPeriodosPorDni(string $dni): array
    {
        $rows = ActasPersonal::listarPeriodosPorDni($dni);
        $out = [];
        foreach ($rows as $r) {
            $out[] = [
                'id' => (int) $r->id,
                'periodoPago' => $r->periodo_pago,
            ];
        }
        return $out;
    }

    // GET /descuentos?nro_documento=...
    public function getPeriodosEgresosByNroDocumento(string $nroDocumento): array
    {
        $rows = ActasPersonal::descuentosPorPeriodoUsuario($nroDocumento);
        $out = [];
        foreach ($rows as $r) {
            if (!$r->periodo_pago) continue;
            $out[] = [
                'periodoPago' => $r->periodo_pago,
                'egresosJson' => $r->egresos_json,
            ];
        }
        return $out;
    }

    private function monthNameEs(int $month): string
    {
        $months = [
            1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
            5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
            9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
        ];
        return $months[$month] ?? 'Mes inválido';
    }
}