<?php

return [

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // El guard API debe usar el driver 'jwt' y el provider 'personal'
        'api' => [
            'driver' => 'jwt',
            'provider' => 'personal',
        ],
    ],

    'providers' => [
        // Puedes dejar el provider 'users' por defecto si lo necesitas
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // Provider para tu modelo Personal
        'personal' => [
            'driver' => 'eloquent',
            'model' => App\Models\Personal::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];