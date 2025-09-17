<?php

namespace App\Http\Controllers;

use App\Services\BeneficiarioImportService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class BeneficiarioCSVController extends Controller
{
    public function __construct(private BeneficiarioImportService $beneficiarioImportService) {}

    // POST /upload/beneficiario
    public function importarCsv(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:csv,txt|max:51200', // 50MB
            ]);

            if (!$request->hasFile('file')) {
                return response()->json([
                    'error' => 'No se recibió el archivo. Verifica el nombre del campo (file) y los límites de tamaño.'
                ], 422);
            }

            $file = $request->file('file');
            if (!$file->isValid()) {
                return response()->json([
                    'error' => 'El archivo no es válido o se truncó al subir.'
                ], 422);
            }

            $result = $this->beneficiarioImportService->importarCsv($file);
            return response()->json($result);

        } catch (ValidationException $ve) {
            return response()->json([
                'error' => 'Validación fallida',
                'details' => $ve->errors(),
            ], 422);

        } catch (FileException $fe) {
            return response()->json([
                'error' => 'Error de archivo',
                'details' => $fe->getMessage(),
            ], 400);

        } catch (\Throwable $e) {
            report($e);
            return response()->json([
                'error' => 'Error interno al procesar el CSV',
                'details' => config('app.debug') ? $e->getMessage() : 'Revisa storage/logs/laravel.log',
            ], 500);
        }
    }
}