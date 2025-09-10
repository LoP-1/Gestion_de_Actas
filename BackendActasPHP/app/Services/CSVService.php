<?php

namespace App\Services;

use App\Models\ActasPersonal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class CSVService
{
    // Importa el CSV y guarda los registros en la base de datos
    public function importarCsv($file)
    {
        $lista = [];

        // Leer el archivo completo en memoria
        $bytes = File::get($file->getRealPath());

        // Detectar la primera línea no vacía y el separador
        $headerLine = $this->readFirstNonEmptyLine($bytes);
        if ($headerLine === null) return $lista;
        $separator = $this->detectSeparator($headerLine);

        // Convertir el archivo en array de líneas
        $lines = preg_split("/(\r\n|\n|\r)/", $bytes);
        $rows = [];
        foreach ($lines as $line) {
            if (strlen(trim($line)) > 0) {
                $rows[] = str_getcsv($line, $separator);
            }
        }
        if (empty($rows)) return $lista;
        $header = $rows[0];

        // Mapear nombres normalizados a índices
        $headerMap = [];
        foreach ($header as $i => $col) {
            $headerMap[$this->normalizaNombre($col)] = $i;
        }

        $ingresosIdx = $headerMap[$this->normalizaNombre('INGRESOS')] ?? count($header);
        $egresosIdx = $headerMap[$this->normalizaNombre('EGRESOS')] ?? count($header);

        $formatter = 'd/m/Y'; // Formato fecha

        for ($i = 1; $i < count($rows); $i++) {
            $data = $rows[$i];
            $p = new ActasPersonal();

            // Asignar los datos generales
            $p->periodoPago = $this->getValue($data, $headerMap, 'PeriodoPago');
            $p->fechaIngreso = $this->parseFecha($this->getValue($data, $headerMap, 'FechaIngreso'), $formatter);
            $p->fechaTermino = $this->parseFecha($this->getValue($data, $headerMap, 'FechaTérmino'), $formatter);
            $p->docReferencia = $this->getValue($data, $headerMap, 'DocReferencia');
            $p->codigoModular = $this->getValue($data, $headerMap, 'CODIGO MODULAR');
            $p->airhsp = $this->getValue($data, $headerMap, 'AIRHSP');
            $p->cargo = $this->getValue($data, $headerMap, 'CARGO');
            $p->apePaterno = $this->getValue($data, $headerMap, 'ApePaterno');
            $p->apeMaterno = $this->getValue($data, $headerMap, 'ApeMaterno');
            $p->nombres = $this->getValue($data, $headerMap, 'Nombres');
            $p->situacion = $this->getValue($data, $headerMap, 'Situación');
            $p->diasLicencia = $this->parseInt($this->getValue($data, $headerMap, 'diaslicencia'));
            $p->fecinilic = $this->parseFecha($this->getValue($data, $headerMap, 'fecinilic'), $formatter);
            $p->tPlanilla = $this->getValue($data, $headerMap, 'T_Planilla');
            $p->fechaNacimiento = $this->parseFecha($this->getValue($data, $headerMap, 'FechaNacimiento'), $formatter);
            $p->sexo = $this->getValue($data, $headerMap, 'Sexo');
            $p->tipoDocumento = $this->getValue($data, $headerMap, 'TipoDocumento');
            $p->nroDocumento = $this->getValue($data, $headerMap, 'NroDocumento');
            $p->ipss = $this->getValue($data, $headerMap, 'IPSS');
            $p->regPensionario = $this->getValue($data, $headerMap, 'RegPensionario');
            $p->codNexus = $this->getValue($data, $headerMap, 'CodNexus');
            $p->afp = $this->getValue($data, $headerMap, 'AFP');
            $p->cuspp = $this->getValue($data, $headerMap, 'CUSPP');
            $p->fechaAfiliacion = $this->parseFecha($this->getValue($data, $headerMap, 'FechaAfiliación'), $formatter);
            $p->fechaDevengue = $this->parseFecha($this->getValue($data, $headerMap, 'FechaDevengue'), $formatter);
            $p->ugel = $this->getValue($data, $headerMap, 'Ugel');
            $p->codEstablecimiento = $this->getValue($data, $headerMap, 'CodEstablecimiento');
            $p->establecimiento = $this->getValue($data, $headerMap, 'Establecimiento');
            $p->nivel = $this->getValue($data, $headerMap, 'Nivel');
            $p->caractEstablecimiento = $this->parseInt($this->getValue($data, $headerMap, 'CaractEstablecimiento'));
            $p->unidCosteo = $this->getValue($data, $headerMap, 'UnidCosteo');
            $p->cargoOrig = $this->getValue($data, $headerMap, 'Cargo/Orig');
            $p->leyendaPermanente = $this->getValue($data, $headerMap, 'LeyendaPermanente');
            $p->modoPago = $this->getValue($data, $headerMap, 'ModoPago');
            $p->ctaCte = $this->getValue($data, $headerMap, 'CtaCte');
            $p->diasTrabajados = $this->parseInt($this->getValue($data, $headerMap, 'DíasTrabajados'));
            $p->decimas = $this->parseInt($this->getValue($data, $headerMap, 'Décimas'));
            $p->regLaboral = $this->getValue($data, $headerMap, 'RegLaboral');
            $p->tipoServidor = $this->getValue($data, $headerMap, 'TipoServidor');
            $p->nivelMagisterial = $this->getValue($data, $headerMap, 'NivelMagisterial');
            $p->codcomuna = $this->getValue($data, $headerMap, 'codcomuna');
            $p->grupoRemunerativo = $this->getValue($data, $headerMap, 'GrupoRemunerativo');
            $p->jornadaLaboral = $this->getValue($data, $headerMap, 'JornadaLaboral');
            $p->tiempoServicio = $this->getValue($data, $headerMap, 'TiempoServicio');
            $p->cadPresupuestal = $this->getValue($data, $headerMap, 'CadPresupuestal');
            $p->timpopen = $this->getValue($data, $headerMap, 'timpopen');
            $p->tributable = $this->parseBigDecimal($this->getValue($data, $headerMap, 'tributable'));
            $p->imponible = $this->parseBigDecimal($this->getValue($data, $headerMap, 'imponible'));
            $p->totalRemuneracion = $this->parseBigDecimal($this->getValue($data, $headerMap, 'TotalRemuneración'));
            $p->totalLiquido = $this->parseBigDecimal($this->getValue($data, $headerMap, 'TotalLiquido'));

            // INGRESOS JSON
            $ingresosMap = [];
            if ($ingresosIdx >= 0 && $ingresosIdx < count($header)) {
                $end = ($egresosIdx > $ingresosIdx) ? $egresosIdx : count($header);
                for ($idx = $ingresosIdx + 1; $idx < $end && $idx < count($header) && $idx < count($data); $idx++) {
                    $colName = $header[$idx] ?? ("Col_" . $idx);
                    $ingresosMap[$colName] = $this->parseBigDecimal($data[$idx] ?? null);
                }
            }
            $p->ingresosJson = json_encode($ingresosMap, JSON_UNESCAPED_UNICODE);

            // EGRESOS JSON
            $egresosMap = [];
            if ($egresosIdx >= 0 && $egresosIdx < count($header)) {
                for ($idx = $egresosIdx + 1; $idx < count($header) && $idx < count($data); $idx++) {
                    $colName = $header[$idx] ?? ("Col_" . $idx);
                    $egresosMap[$colName] = $this->parseBigDecimal($data[$idx] ?? null);
                }
            }
            $p->egresosJson = json_encode($egresosMap, JSON_UNESCAPED_UNICODE);

            $p->save();
            $lista[] = $p;
        }

        return $lista;
    }

    // Helpers

    private function readFirstNonEmptyLine($bytes)
    {
        $lines = preg_split("/(\r\n|\n|\r)/", $bytes);
        foreach ($lines as $line) {
            if (strpos($line, "\uFEFF") === 0) $line = substr($line, 1);
            if (trim($line) !== '') return $line;
        }
        return null;
    }

    private function detectSeparator($headerLine)
    {
        $commas = substr_count($headerLine, ',');
        $semis = substr_count($headerLine, ';');
        return ($semis > $commas) ? ';' : ',';
    }

    private function normalizaNombre($s)
    {
        if ($s === null) return "";
        $s = str_replace("\uFEFF", "", $s); // BOM
        $s = preg_replace('/[\p{C}\p{Z}]/u', '', $s);
        $s = preg_replace('/\s+/', '', $s);
        $s = iconv('UTF-8', 'ASCII//TRANSLIT', $s);
        $s = preg_replace('/[_\-\.\/]/', '', $s);
        $s = strtolower($s);
        return $s;
    }

    private function getValue($data, $headerMap, $colName)
    {
        $key = $this->normalizaNombre($colName);
        $idx = $headerMap[$key] ?? null;
        return ($idx !== null && $idx < count($data)) ? $data[$idx] : null;
    }

    private function parseFecha($val, $format)
    {
        if ($val === null) return null;
        $val = trim($val);
        if ($val === '' || $val === '1/1/1900' || $val === '01/01/1900' || $val === '00/01/1900') return null;
        $d = \DateTime::createFromFormat($format, $val);
        return $d ? $d->format('Y-m-d') : null;
    }

    private function parseInt($val)
    {
        try {
            if ($val === null) return null;
            $val = trim($val);
            return ($val === '') ? null : intval($val);
        } catch (\Exception $e) {
            return null;
        }
    }

    private function parseBigDecimal($val)
    {
        try {
            if ($val === null) return 0;
            $s = trim($val);
            if ($s === '') return 0;
            // Europeo: 1.234,56 -> 1234.56
            if (preg_match('/^-?\d{1,3}(\.\d{3})*,\d+$/', $s)) {
                $s = str_replace('.', '', $s);
                $s = str_replace(',', '.', $s);
            } elseif (preg_match('/^-?\d{1,3}(,\d{3})*\.\d+$/', $s)) {
                $s = str_replace(',', '', $s);
            }
            return floatval($s);
        } catch (\Exception $e) {
            return 0;
        }
    }
}