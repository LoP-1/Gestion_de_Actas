<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Personal extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'personal';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'rol',
        'contrasena',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [
            'rol' => $this->rol,
            'dni' => $this->dni
        ];
    }

    /**
     * Get the password for authentication.
     */
    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    /**
     * Buscar por DNI (equivalente a findByDni en Spring)
     */
    public static function findByDni($dni)
    {
        return self::where('dni', $dni)->first();
    }

    /**
     * Verificar si es admin
     */
    public function isAdmin()
    {
        return $this->rol === 'ADMIN';
    }

    /**
     * Verificar si es usuario normal
     */
    public function isUser()
    {
        return $this->rol === 'USER';
    }
}