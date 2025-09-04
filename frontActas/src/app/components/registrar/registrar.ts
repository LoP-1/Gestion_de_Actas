import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';
import { Personal } from '../../models/personal';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './registrar.html',
  styleUrl: './registrar.css'
})
export class Registrar {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  loading = signal(false);

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{5,15}$/)]],
    rol: ['USER', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(3)]]
  });

  roles = [
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'USER', label: 'Usuario' }
  ];

  registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Por favor completa los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    const payload: Personal = this.form.value;

    this.loading.set(true);
    this.auth.register(payload).subscribe({
      next: (res) => {
        this.snack.open('Usuario registrado con éxito', 'OK', { duration: 3000 });
        this.form.reset({ rol: 'USER' });
      },
      error: (err) => {
        const msg = err?.error || 'No se pudo registrar el usuario';
        this.snack.open(typeof msg === 'string' ? msg : 'No se pudo registrar el usuario', 'Cerrar', { duration: 4000 });
      },
      complete: () => this.loading.set(false)
    });
  }

  // Helpers de UI
  hasError(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!c && c.touched && c.hasError(error);
  }
}