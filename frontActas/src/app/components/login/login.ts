import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class LoginComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/auth/login`;
  form: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token && this.isTokenValid(token)) {
      // Si el token es válido, redirige al inicio
      this.router.navigate(['/inicio'], { replaceUrl: true });
    } else if (token) {
      // Si el token existe pero está inválido/expirado se limpia
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    }
  }
  // Maneja el envío del formulario de login
  login() {
    if (this.form.invalid) return;
    this.error = '';
    this.http.post<{ token: string, rol: string }>(this.apiUrl, this.form.value)
      .subscribe({
        next: (resp) => {
          // Guarda el token y rol en localStorage y navega al inicio
          localStorage.setItem('token', resp.token);
          localStorage.setItem('rol', resp.rol);
          this.router.navigate(['/inicio'], { replaceUrl: true });
        },
        error: () => {
          this.error = 'Usuario o contraseña incorrectos';
        }
      });
  }

  // Valida un JWT de manera sencilla: que tenga formato y que no esté expirado
  private isTokenValid(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const payloadJson = this.base64UrlDecode(parts[1]);
      const payload = JSON.parse(payloadJson);
      if (payload && typeof payload.exp === 'number') {
        const nowSec = Math.floor(Date.now() / 1000);
        return payload.exp > nowSec;
      }
      return true;
    } catch {
      return false;
    }
  }

  // Decodifica base64url (JWT) ... el token trae el payload en base64url
  private base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) {
      base64 += '='.repeat(4 - pad);
    }
    return atob(base64);
  }
}