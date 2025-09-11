<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('actas_personal', function (Blueprint $table) {
            $table->id();
            
            // Datos generales del Personal
            $table->string('periodo_pago')->nullable();
            $table->date('fecha_ingreso')->nullable();
            $table->date('fecha_termino')->nullable();
            $table->string('doc_referencia')->nullable();
            $table->string('codigo_modular')->nullable();
            $table->string('airhsp')->nullable();
            $table->string('cargo')->nullable();
            $table->string('ape_paterno')->nullable();
            $table->string('ape_materno')->nullable();
            $table->string('nombres')->nullable();
            $table->string('situacion')->nullable();
            $table->integer('dias_licencia')->nullable();
            $table->date('fecinilic')->nullable();
            $table->string('t_planilla')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('sexo')->nullable();
            $table->string('tipo_documento')->nullable();
            $table->string('nro_documento')->nullable();
            $table->string('ipss')->nullable();
            $table->string('reg_pensionario')->nullable();
            $table->string('cod_nexus')->nullable();
            $table->string('afp')->nullable();
            $table->string('cuspp')->nullable();
            $table->date('fecha_afiliacion')->nullable();
            $table->date('fecha_devengue')->nullable();
            $table->string('ugel')->nullable();
            $table->string('cod_establecimiento')->nullable();
            $table->string('establecimiento')->nullable();
            $table->string('nivel')->nullable();
            $table->integer('caract_establecimiento')->nullable();
            $table->string('unid_costeo')->nullable();
            $table->string('cargo_orig')->nullable();
            $table->string('leyenda_permanente')->nullable();
            $table->string('modo_pago')->nullable();
            $table->string('cta_cte')->nullable();
            $table->integer('dias_trabajados')->nullable();
            $table->integer('decimas')->nullable();
            $table->string('reg_laboral')->nullable();
            $table->string('tipo_servidor')->nullable();
            $table->string('nivel_magisterial')->nullable();
            $table->string('codcomuna')->nullable();
            $table->string('grupo_remunerativo')->nullable();
            $table->string('jornada_laboral')->nullable();
            $table->string('tiempo_servicio')->nullable();
            $table->string('cad_presupuestal')->nullable();
            $table->string('timpopen')->nullable();
            
            // Campos numéricos
            $table->decimal('tributable', 10, 2)->nullable();
            $table->decimal('imponible', 10, 2)->nullable();
            $table->decimal('total_remuneracion', 10, 2)->nullable();
            $table->decimal('total_liquido', 10, 2)->nullable();
            
            // Campos JSON para ingresos y egresos
            $table->json('ingresos_json')->nullable();
            $table->json('egresos_json')->nullable();
            
            $table->timestamps();
            
            // Índices para optimizar consultas
            $table->index('nro_documento');
            $table->index('periodo_pago');
            $table->index('codigo_modular');
        });
    }

    public function down()
    {
        Schema::dropIfExists('actas_personal');
    }
};