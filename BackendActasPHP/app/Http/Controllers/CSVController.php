<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CSVService;

class CSVController extends Controller
{
    protected $csvService;

    public function __construct(CSVService $csvService)
    {
        $this->csvService = $csvService;
    }

    public function importarCsv(Request $request)
    {
        $file = $request->file('file');
        $lista = $this->csvService->importarCsv($file);
        return response()->json($lista);
    }
}