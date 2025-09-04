import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

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
    HttpClientModule
  ]
})
export class LoginComponent {
  private apiUrl = `${environment.apiUrl}/auth/login`;
  form: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
  if (this.form.invalid) return;
  this.error = '';
  this.http.post<{ token: string, rol: string }>(this.apiUrl, this.form.value)
    .subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('rol', resp.rol);
        this.router.navigate(['/inicio']);
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
}
}