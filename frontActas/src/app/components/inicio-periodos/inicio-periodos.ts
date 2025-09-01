import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeriodoService } from '../../services/periodo';
import { Periodo } from '../../models/periodo';

@Component({
  selector: 'app-inicio-periodos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-periodos.html',
  styleUrls: ['./inicio-periodos.css']
})
export class InicioPeriodosComponent implements OnInit {
  periodos: Periodo[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private periodoService: PeriodoService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.periodoService.getPeriodos().subscribe({
      next: (data) => {
        this.periodos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los periodos';
        this.loading = false;
      }
    });
  }

  seleccionarPeriodo(periodo: Periodo) {
  localStorage.setItem('ultimoPeriodo', periodo.periodoPago);
  this.router.navigate(['/usuarios-periodo', periodo.periodoPago]);
}
}