<?php

namespace App\Services;

use App\Models\ActasPersonal;
use App\Models\Beneficiario;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class BeneficiarioImportService
{
    public function importarCsv(UploadedFile $file): array
    {
        if (!$file || !$file->isValid()) {
            throw new FileException('Archivo inválido o no recibido.');
        }

        $real = $file->getRealPath();
        if (!$real || !is_readable($real)) {
            throw new FileException('No se puede leer la ruta temporal del archivo.');
        }

        // Detectar separador con la primera línea no vacía
        $bytes = @file_get_contents($real);
        if ($bytes === false) {
            throw new FileException('No se pudo leer el contenido del archivo.');
        }

        [$headerLine,] = $this->readFirstNonEmptyLine($bytes);
        if ($headerLine === null) {
            return ['inserted' => 0, 'items' => []];
        }
        $separator = $this->detectSeparator($headerLine);

        $handle = fopen($real, 'r');
        if ($handle === false) {
            throw new FileException('No se pudo abrir el archivo CSV.');
        }

        // Leer cabecera normalizada
        $rawHeader = fgetcsv($handle, 0, $separator);
        if (!$rawHeader) {
            fclose($handle);
            return ['inserted' => 0, 'items' => []];
        }

        $headerMap = [];
        foreach ($rawHeader as $i => $col) {
            $headerMap[$this->normalizaNombre($col)] = $i;
        }

        $inserted = 0;
        $preview = [];

        DB::beginTransaction();
        try {
            while (($row = fgetcsv($handle, 0, $separator)) !== false) {
                if ($this->isRowEmpty($row)) continue;

                // Obtener campos principales con validaciones robustas
                $periodoPago     = $this->getValue($row, $headerMap, 'PERIODO_PAGO');
                $codigoModular   = $this->getValue($row, $headerMap, 'COD_MOD_TIT');
                $dniTitular      = $this->getValue($row, $headerMap, 'DNI_TIT');

                // Buscar el acta_personal asociada
                $acta = ActasPersonal::where('codigo_modular', $codigoModular)
                                     ->where('nro_documento', $dniTitular)
                                     ->where('periodo_pago', $periodoPago)
                                     ->first();

                // Si no lo encuentra, buscar en periodos anteriores restando 20 al mes
                if (!$acta && $periodoPago) {
                    $anio = substr($periodoPago, 0, 4);
                    $mes = (int)substr($periodoPago, 4, 2);

                    while ($mes >= 11) {
                        $mes -= 20;
                        if ($mes < 11) break;
                        $nuevoPeriodo = $anio . str_pad($mes, 2, '0', STR_PAD_LEFT);
                        $acta = ActasPersonal::where('codigo_modular', $codigoModular)
                                             ->where('nro_documento', $dniTitular)
                                             ->where('periodo_pago', $nuevoPeriodo)
                                             ->first();
                        if ($acta) break;
                    }
                }

                if (!$acta) continue;

                // Generar datos del beneficiario
                $beneficiarioData = [
                    'acta_personal_id' => $acta->id,
                    'periodo_pago'     => $periodoPago,
                    'cod_mod_tit'      => $codigoModular,
                    'cargo_tit'        => $this->getValue($row, $headerMap, 'CARGO_TIT'),
                    'pat_tit'          => $this->getValue($row, $headerMap, 'PAT_TIT'),
                    'mat_tit'          => $this->getValue($row, $headerMap, 'MAT_TIT'),
                    'nom_tit'          => $this->getValue($row, $headerMap, 'NOM_TIT'),
                    'dni_tit'          => $dniTitular,
                    'fnac_tit'         => $this->parseFecha($this->getValue($row, $headerMap, 'FNAC_TIT')),
                    'rut_fam'          => $this->getValue($row, $headerMap, 'RUT_FAM'),
                    'dni_ben'          => $this->getValue($row, $headerMap, 'DNI_BEN'),
                    'airshp'           => $this->getValue($row, $headerMap, 'AIRSHP'),
                    'pat_ben'          => $this->getValue($row, $headerMap, 'PAT_BEN'),
                    'mat_ben'          => $this->getValue($row, $headerMap, 'MAT_BEN'),
                    'nom_ben'          => $this->getValue($row, $headerMap, 'NOM_BEN'),
                    'fnac_ben'         => $this->parseFecha($this->getValue($row, $headerMap, 'FNAC_BEN')),
                    'parent'           => $this->getValue($row, $headerMap, 'PARENT'),
                    'cuenta_ahorro'    => $this->getValue($row, $headerMap, 'CUENTA_AHORRO'),
                    'total_haber'      => $this->parseBigDecimal($this->getValue($row, $headerMap, 'TOTAL_HABER')),
                    'total_liquido'    => $this->parseBigDecimal($this->getValue($row, $headerMap, 'TOTAL_LIQUIDO')),
                    'tributable'       => $this->parseBigDecimal($this->getValue($row, $headerMap, 'TRIBUTABLE')),
                    'imponible'        => $this->parseBigDecimal($this->getValue($row, $headerMap, 'IMPONIBLE')),
                    'tipo_benef'       => $this->getValue($row, $headerMap, 'TIPO_BENEF'),
                    'leyenda'          => $this->getValue($row, $headerMap, 'LEYENDA'),
                    'haberes_json'     => json_encode($this->parseHaberes($row, $headerMap)),
                ];

                // Aquí solo se inserta SIEMPRE, permitiendo duplicados
                $beneficiario = Beneficiario::create($beneficiarioData);
                $inserted++;

                if (count($preview) < 3) {
                    $preview[] = $beneficiario->only(['id', 'acta_personal_id', 'dni_ben', 'nom_ben', 'airshp']);
                }
            }

            fclose($handle);
            DB::commit();

            return [
                'inserted' => $inserted,
                'items'    => $preview,
            ];
        } catch (\Throwable $e) {
            if (is_resource($handle)) fclose($handle);
            DB::rollBack();
            throw $e;
        }
    }

    // Funciones utilitarias robustas
    private function readFirstNonEmptyLine(string $bytes): array
    {
        $lines = preg_split("/\r\n|\n|\r/", $bytes);
        if (!$lines) return [null, false];
        foreach ($lines as $line) {
            if ($line === null) continue;
            if (str_starts_with($line, "\xEF\xBB\xBF")) {
                $line = substr($line, 3);
            }
            if (trim($line) !== '') {
                return [$line, true];
            }
        }
        return [null, false];
    }

    private function detectSeparator(string $headerLine): string
    {
        $commas = substr_count($headerLine, ',');
        $semis  = substr_count($headerLine, ';');
        return ($semis > $commas) ? ';' : ',';
    }

    private function isRowEmpty(array $row): bool
    {
        foreach ($row as $cell) {
            if (trim((string)$cell) !== '') return false;
        }
        return true;
    }

    private function normalizaNombre(?string $s): string
    {
        if ($s === null) return '';
        $s = str_replace("\xEF\xBB\xBF", '', $s);
        $s = preg_replace('/[\p{C}\p{Z}]+/u', '', $s);
        $s = preg_replace('/\s+/u', '', $s);
        if (class_exists(\Transliterator::class)) {
            $s = \Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC')->transliterate($s);
        } else {
            if (function_exists('iconv')) {
                $s = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s);
            }
        }
        $s = preg_replace('/[_\-\.\/]/', '', $s);
        $s = mb_strtolower($s);
        return $s ?? '';
    }

    private function getValue(array $data, array $headerMap, string $colName): ?string
    {
        $key = $this->normalizaNombre($colName);
        if (!array_key_exists($key, $headerMap)) return null;
        $idx = $headerMap[$key];
        return ($idx !== null && $idx < count($data)) ? ($data[$idx] ?? null) : null;
    }

    private function parseFecha(?string $val): ?string
    {
        if ($val === null) return null;
        $val = trim($val);
        if ($val === '' || in_array($val, ['1/1/1900', '01/01/1900', '00/01/1900'], true)) return null;
        $dt = \DateTime::createFromFormat('d/m/Y', $val);
        return $dt ? $dt->format('Y-m-d') : null;
    }

    private function parseBigDecimal(?string $val): string
    {
        if ($val === null) return '0.00';
        $s = trim($val);
        if ($s === '') return '0.00';
        if (preg_match('/^-?\d{1,3}(\.\d{3})*,\d+$/', $s)) {
            $s = str_replace('.', '', $s);
            $s = str_replace(',', '.', $s);
        } elseif (preg_match('/^-?\d{1,3}(,\d{3})*\.\d+$/', $s)) {
            $s = str_replace(',', '', $s);
        }
        if (!preg_match('/^-?\d+(\.\d+)?$/', $s)) {
            return '0.00';
        }
        return number_format((float)$s, 2, '.', '');
    }

    // Obtiene campos H1, M1... desde la cabecera en adelante
    private function parseHaberes(array $row, array $headerMap): array
    {
        $haberes = [];
        foreach ($headerMap as $col => $idx) {
            if (preg_match('/^h\d+$/i', $col) || preg_match('/^m\d+$/i', $col)) {
                $haberes[$col] = $this->parseBigDecimal($row[$idx] ?? null);
            }
        }
        return $haberes;
    }
}