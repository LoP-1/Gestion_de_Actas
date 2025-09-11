<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActaPersonalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                   => $this->id,
            'periodoPago'          => $this->periodo_pago,
            'fechaIngreso'         => $this->fecha_ingreso,
            'fechaTermino'         => $this->fecha_termino,
            'docReferencia'        => $this->doc_referencia,
            'codigoModular'        => $this->codigo_modular,
            'airhsp'               => $this->airhsp,
            'cargo'                => $this->cargo,
            'apePaterno'           => $this->ape_paterno,
            'apeMaterno'           => $this->ape_materno,
            'nombres'              => $this->nombres,
            'situacion'            => $this->situacion,
            'diasLicencia'         => $this->dias_licencia,
            'fecinilic'            => $this->fecinilic,
            'tPlanilla'            => $this->t_planilla,
            'fechaNacimiento'      => $this->fecha_nacimiento,
            'sexo'                 => $this->sexo,
            'tipoDocumento'        => $this->tipo_documento,
            'nroDocumento'         => $this->nro_documento,
            'ipss'                 => $this->ipss,
            'regPensionario'       => $this->reg_pensionario,
            'codNexus'             => $this->cod_nexus,
            'afp'                  => $this->afp,
            'cuspp'                => $this->cuspp,
            'fechaAfiliacion'      => $this->fecha_afiliacion,
            'fechaDevengue'        => $this->fecha_devengue,
            'ugel'                 => $this->ugel,
            'codEstablecimiento'   => $this->cod_establecimiento,
            'establecimiento'      => $this->establecimiento,
            'nivel'                => $this->nivel,
            'caractEstablecimiento'=> $this->caract_establecimiento,
            'unidCosteo'           => $this->unid_costeo,
            'cargoOrig'            => $this->cargo_orig,
            'leyendaPermanente'    => $this->leyenda_permanente,
            'modoPago'             => $this->modo_pago,
            'ctaCte'               => $this->cta_cte,
            'diasTrabajados'       => $this->dias_trabajados,
            'decimas'              => $this->decimas,
            'regLaboral'           => $this->reg_laboral,
            'tipoServidor'         => $this->tipo_servidor,
            'nivelMagisterial'     => $this->nivel_magisterial,
            'codcomuna'            => $this->codcomuna,
            'grupoRemunerativo'    => $this->grupo_remunerativo,
            'jornadaLaboral'       => $this->jornada_laboral,
            'tiempoServicio'       => $this->tiempo_servicio,
            'cadPresupuestal'      => $this->cad_presupuestal,
            'timpopen'             => $this->timpopen,
            'tributable'           => $this->tributable,
            'imponible'            => $this->imponible,
            'totalRemuneracion'    => $this->total_remuneracion,
            'totalLiquido'         => $this->total_liquido,
            'ingresosJson'         => $this->ingresos_json,
            'egresosJson'          => $this->egresos_json,
        ];
    }
}