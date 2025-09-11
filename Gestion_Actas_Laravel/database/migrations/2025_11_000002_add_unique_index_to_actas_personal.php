<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('actas_personal', function (Blueprint $table) {
            $table->unique(['periodo_pago', 'nro_documento', 'cod_establecimiento'], 'uniq_periodo_dni_estab');
        });
    }

    public function down(): void
    {
        Schema::table('actas_personal', function (Blueprint $table) {
            $table->dropUnique('uniq_periodo_dni_estab');
        });
    }
};