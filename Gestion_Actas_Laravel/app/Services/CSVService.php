<?php

namespace App\Services;

use App\Models\ActasPersonal;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class CSVService
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

        $rawHeader = fgetcsv($handle, 0, $separator);
        if (!$rawHeader) {
            fclose($handle);
            return ['inserted' => 0, 'items' => []];
        }

        // Normalizar cabeceras
        $headerMap = [];
        foreach ($rawHeader as $i => $col) {
            $headerMap[$this->normalizaNombre($col)] = $i;
        }

        $ingresosIdx = $headerMap[$this->normalizaNombre('INGRESOS')] ?? -1;
        $egresosIdx  = $headerMap[$this->normalizaNombre('EGRESOS')] ?? -1;
        if ($ingresosIdx === -1) $ingresosIdx = count($rawHeader);
        if ($egresosIdx === -1)  $egresosIdx = count($rawHeader);

        $inserted = 0;
        $preview = [];

        DB::beginTransaction();
        try {
            while (($data = fgetcsv($handle, 0, $separator)) !== false) {
                if ($this->isRowEmpty($data)) continue;

                $p = [
                    'periodo_pago'        => $this->getValue($data, $headerMap, 'PeriodoPago'),
                    'fecha_ingreso'       => $this->parseFecha($this->getValue($data, $headerMap, 'FechaIngreso')),
                    'fecha_termino'       => $this->parseFecha($this->getValue($data, $headerMap, 'FechaTérmino')),
                    'doc_referencia'      => $this->getValue($data, $headerMap, 'DocReferencia'),
                    'codigo_modular'      => $this->getValue($data, $headerMap, 'CODIGO MODULAR'),
                    'airhsp'              => $this->getValue($data, $headerMap, 'AIRHSP'),
                    'cargo'               => $this->getValue($data, $headerMap, 'CARGO'),
                    'ape_paterno'         => $this->getValue($data, $headerMap, 'ApePaterno'),
                    'ape_materno'         => $this->getValue($data, $headerMap, 'ApeMaterno'),
                    'nombres'             => $this->getValue($data, $headerMap, 'Nombres'),
                    'situacion'           => $this->getValue($data, $headerMap, 'Situación'),
                    'dias_licencia'       => $this->parseInt($this->getValue($data, $headerMap, 'diaslicencia')),
                    'fecinilic'           => $this->parseFecha($this->getValue($data, $headerMap, 'fecinilic')),
                    't_planilla'          => $this->getValue($data, $headerMap, 'T_Planilla'),
                    'fecha_nacimiento'    => $this->parseFecha($this->getValue($data, $headerMap, 'FechaNacimiento')),
                    'sexo'                => $this->getValue($data, $headerMap, 'Sexo'),
                    'tipo_documento'      => $this->getValue($data, $headerMap, 'TipoDocumento'),
                    'nro_documento'       => $this->getValue($data, $headerMap, 'NroDocumento'),
                    'ipss'                => $this->getValue($data, $headerMap, 'IPSS'),
                    'reg_pensionario'     => $this->getValue($data, $headerMap, 'RegPensionario'),
                    'cod_nexus'           => $this->getValue($data, $headerMap, 'CodNexus'),
                    'afp'                 => $this->getValue($data, $headerMap, 'AFP'),
                    'cuspp'               => $this->getValue($data, $headerMap, 'CUSPP'),
                    'fecha_afiliacion'    => $this->parseFecha($this->getValue($data, $headerMap, 'FechaAfiliación')),
                    'fecha_devengue'      => $this->parseFecha($this->getValue($data, $headerMap, 'FechaDevengue')),
                    'ugel'                => $this->getValue($data, $headerMap, 'Ugel'),
                    'cod_establecimiento' => $this->getValue($data, $headerMap, 'CodEstablecimiento'),
                    'establecimiento'     => $this->getValue($data, $headerMap, 'Establecimiento'),
                    'nivel'               => $this->getValue($data, $headerMap, 'Nivel'),
                    'caract_establecimiento'=> $this->parseInt($this->getValue($data, $headerMap, 'CaractEstablecimiento')),
                    'unid_costeo'         => $this->getValue($data, $headerMap, 'UnidCosteo'),
                    'cargo_orig'          => $this->getValue($data, $headerMap, 'Cargo/Orig'),
                    'leyenda_permanente'  => $this->getValue($data, $headerMap, 'LeyendaPermanente'),
                    'modo_pago'           => $this->getValue($data, $headerMap, 'ModoPago'),
                    'cta_cte'             => $this->getValue($data, $headerMap, 'CtaCte'),
                    'dias_trabajados'     => $this->parseInt($this->getValue($data, $headerMap, 'DíasTrabajados')),
                    'decimas'             => $this->parseInt($this->getValue($data, $headerMap, 'Décimas')),
                    'reg_laboral'         => $this->getValue($data, $headerMap, 'RegLaboral'),
                    'tipo_servidor'       => $this->getValue($data, $headerMap, 'TipoServidor'),
                    'nivel_magisterial'   => $this->getValue($data, $headerMap, 'NivelMagisterial'),
                    'codcomuna'           => $this->getValue($data, $headerMap, 'codcomuna'),
                    'grupo_remunerativo'  => $this->getValue($data, $headerMap, 'GrupoRemunerativo'),
                    'jornada_laboral'     => $this->getValue($data, $headerMap, 'JornadaLaboral'),
                    'tiempo_servicio'     => $this->getValue($data, $headerMap, 'TiempoServicio'),
                    'cad_presupuestal'    => $this->getValue($data, $headerMap, 'CadPresupuestal'),
                    'timpopen'            => $this->getValue($data, $headerMap, 'timpopen'),
                    'tributable'          => $this->parseBigDecimal($this->getValue($data, $headerMap, 'tributable')),
                    'imponible'           => $this->parseBigDecimal($this->getValue($data, $headerMap, 'imponible')),
                    'total_remuneracion'  => $this->parseBigDecimal($this->getValue($data, $headerMap, 'TotalRemuneración')),
                    'total_liquido'       => $this->parseBigDecimal($this->getValue($data, $headerMap, 'TotalLiquido')),
                ];

                // Ingresos
                $ingresosMap = [];
                if ($ingresosIdx >= 0 && $ingresosIdx < count($rawHeader)) {
                    $end = ($egresosIdx > $ingresosIdx) ? $egresosIdx : count($rawHeader);
                    for ($idx = $ingresosIdx + 1; $idx < $end && $idx < count($rawHeader) && $idx < count($data); $idx++) {
                        $colName = isset($rawHeader[$idx]) ? trim((string) $rawHeader[$idx]) : ("Col_" . $idx);
                        $ingresosMap[$colName] = $this->parseBigDecimal($data[$idx] ?? null);
                    }
                }
                $p['ingresos_json'] = $ingresosMap;

                // Egresos
                $egresosMap = [];
                if ($egresosIdx >= 0 && $egresosIdx < count($rawHeader)) {
                    for ($idx = $egresosIdx + 1; $idx < count($rawHeader) && $idx < count($data); $idx++) {
                        $colName = isset($rawHeader[$idx]) ? trim((string) $rawHeader[$idx]) : ("Col_" . $idx);
                        $egresosMap[$colName] = $this->parseBigDecimal($data[$idx] ?? null);
                    }
                }
                $p['egresos_json'] = $egresosMap;

                $model = ActasPersonal::create($p);
                $inserted++;

                if (count($preview) < 3) {
                    $preview[] = $model->only(['id', 'periodo_pago', 'nro_documento', 'total_remuneracion']);
                }
            }

            fclose($handle);
            DB::commit();

            return [
                'inserted' => $inserted,
                'items' => $preview,
            ];
        } catch (\Throwable $e) {
            if (is_resource($handle)) fclose($handle);
            DB::rollBack();
            throw $e;
        }
    }

    private function readFirstNonEmptyLine(string $bytes): array
    {
        $lines = preg_split("/\r\n|\n|\r/", $bytes);
        if (!$lines) return [null, false];
        foreach ($lines as $line) {
            if ($line === null) continue;
            // Quitar BOM
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
        $s = str_replace("\xEF\xBB\xBF", '', $s); // BOM
        $s = preg_replace('/[\p{C}\p{Z}]+/u', '', $s); // control y separadores
        $s = preg_replace('/\s+/u', '', $s);
        // Quitar diacríticos
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

    private function parseInt(?string $val): ?int
    {
        if ($val === null) return null;
        $val = trim($val);
        if ($val === '') return null;
        if (!preg_match('/^-?\d+$/', $val)) return null;
        return (int)$val;
    }

    private function parseBigDecimal(?string $val): string
    {
        if ($val === null) return '0.00';
        $s = trim($val);
        if ($s === '') return '0.00';
        // 1.234,56 -> 1234.56
        if (preg_match('/^-?\d{1,3}(\.\d{3})*,\d+$/', $s)) {
            $s = str_replace('.', '', $s);
            $s = str_replace(',', '.', $s);
        } elseif (preg_match('/^-?\d{1,3}(,\d{3})*\.\d+$/', $s)) {
            // 1,234.56 -> 1234.56
            $s = str_replace(',', '', $s);
        }
        if (!preg_match('/^-?\d+(\.\d+)?$/', $s)) {
            return '0.00';
        }
        return number_format((float)$s, 2, '.', '');
    }
}