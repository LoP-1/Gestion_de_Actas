<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('beneficiarios', function (Blueprint $table) {
            $table->id();

            $table->string('periodo_pago')->nullable();
            $table->string('cod_mod_tit')->nullable();
            $table->string('cargo_tit')->nullable();
            $table->string('pat_tit')->nullable();
            $table->string('mat_tit')->nullable();
            $table->string('nom_tit')->nullable();
            $table->string('dni_tit')->nullable();
            $table->date('fnac_tit')->nullable();
            $table->string('rut_fam')->nullable();
            $table->string('dni_ben')->nullable();
            $table->string('airshp')->nullable();
            $table->string('pat_ben')->nullable();
            $table->string('mat_ben')->nullable();
            $table->string('nom_ben')->nullable();
            $table->date('fnac_ben')->nullable();
            $table->string('parent')->nullable();
            $table->string('cuenta_ahorro')->nullable();
            $table->decimal('total_haber', 10, 2)->nullable();
            $table->decimal('total_liquido', 10, 2)->nullable();
            $table->decimal('tributable', 10, 2)->nullable();
            $table->decimal('imponible', 10, 2)->nullable();
            $table->string('tipo_benef')->nullable();
            $table->string('leyenda')->nullable();
            $table->json('haberes_json')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('beneficiarios');
    }
};