<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',   // asegúrate de tener esta línea
        commands: __DIR__ . '/../routes/console.php',
        health: '/up'
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Registra alias de middlewares de ruta (equivalente a Kernel::$routeMiddleware)
        $middleware->alias([
            'jwt.auth' => \App\Http\Middleware\JwtMiddleware::class,
        ]);

        // Si quieres middlewares globales, puedes usar:
        // $middleware->append(\Illuminate\Foundation\Http\Middleware\ValidatePostSize::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();