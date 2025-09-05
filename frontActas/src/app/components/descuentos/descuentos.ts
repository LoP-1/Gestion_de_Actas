import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { DescuentosService, PeriodRow } from '../../services/descuentos';

type Egreso = {
  id: string;
  concepto: string;
  monto: number;
  monthly: number[];
  expanded?: boolean;
};

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './descuentos.html', // verifica que el archivo exista con ese nombre
  styleUrls: ['./descuentos.css']
})
export class DescuentosComponent implements OnInit {
  dni = new FormControl('', [Validators.required, Validators.pattern(/^\d{6,8}$/)]);
  years: number[] = [];
  selectedYear?: number;
  egresos: Egreso[] = [];
  loaded = true;
  errorMsg = '';

  months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  // cache local de filas retornadas por el endpoint para re-filtrar sin pedir al backend
  private lastRows: PeriodRow[] = [];

  constructor(private desc: DescuentosService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: 6}, (_, i) => currentYear - i);

    // búsqueda reactiva con debounce — usa operador import correcto
    this.dni.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        this.errorMsg = '';
        if (!val || this.dni.invalid) {
          this.egresos = [];
          this.loaded = true;
          return of<PeriodRow[] | null>(null);
        }
        this.loaded = false;
        // pasar selectedYear para que el backend pueda filtrar (si lo soporta)
        return this.desc.getPeriodosEgresosByDni(String(val), this.selectedYear).pipe(
          catchError(err => {
            console.error(err);
            this.errorMsg = 'Error cargando datos';
            this.loaded = true;
            return of<PeriodRow[] | null>(null);
          })
        );
      })
    ).subscribe((rows: PeriodRow[] | null) => {
      if (!rows) return;
      this.lastRows = rows;
      this.egresos = this.buildEgresosFromPeriodRows(rows, this.selectedYear);
      this.loaded = true;
    });
  }

  searchByDni() {
    if (this.dni.invalid) {
      this.dni.markAsTouched();
      return;
    }
    this.loaded = false;
    this.desc.getPeriodosEgresosByDni(String(this.dni.value), this.selectedYear).pipe(
      catchError(err => {
        console.error(err);
        this.errorMsg = 'Error cargando datos';
        this.loaded = true;
        return of<PeriodRow[] | null>(null);
      })
    ).subscribe((rows: PeriodRow[] | null) => {
      if (!rows) {
        this.egresos = [];
        return;
      }
      this.lastRows = rows;
      this.egresos = this.buildEgresosFromPeriodRows(rows, this.selectedYear);
      this.loaded = true;
    });
  }

  selectYear(y: number) {
    if (this.selectedYear === y) {
      this.selectedYear = undefined;
    } else {
      this.selectedYear = y;
    }

    // re-filtrado local if tenemos lastRows, avoid extra backend call
    if (this.lastRows && this.lastRows.length) {
      this.egresos = this.buildEgresosFromPeriodRows(this.lastRows, this.selectedYear);
      return;
    }

    // otherwise call backend (fallback)
    if (this.dni.value) this.searchByDni();
  }

  private buildEgresosFromPeriodRows(rows: PeriodRow[], filterYear?: number): Egreso[] {
    const parsedRows = rows.map(r => {
      const periodoRaw = String(r.periodo_pago ?? '');
      let yyyymm = periodoRaw.replace(/[^0-9]/g, '');
      if (yyyymm.length === 6) {
        // ok
      } else {
        // if it's not 6 digits, leave empty so monthIndex becomes undefined
        yyyymm = '';
      }
      const year = yyyymm ? Number(yyyymm.slice(0,4)) : NaN;
      const month = yyyymm ? Number(yyyymm.slice(4,6)) : NaN;
      let parsed: Record<string, number> = {};
      if (r.egresos_json) {
        try {
          const obj = JSON.parse(r.egresos_json);
          if (Array.isArray(obj)) {
            obj.forEach(item => {
              if (typeof item === 'object' && item !== null) {
                const keys = Object.keys(item);
                if (keys.length === 2 && keys.includes('concepto') && keys.includes('monto')) {
                  parsed[item.concepto] = Number(item.monto || 0);
                } else {
                  keys.forEach(k => parsed[k] = Number(item[k] || 0));
                }
              }
            });
          } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(k => parsed[k] = Number(obj[k] || 0));
          }
        } catch (e) {
          console.warn('egresos_json parse error', e);
        }
      }
      return {
        periodo: yyyymm,
        year: isNaN(year) ? undefined : year,
        monthIndex: !isNaN(month) ? (month - 1) : undefined,
        egMap: parsed
      } as any;
    });

    const filtered = filterYear ? parsedRows.filter(r => r.year === filterYear) : parsedRows;

    const conceptosSet = new Set<string>();
    filtered.forEach(r => Object.keys(r.egMap || {}).forEach(c => conceptosSet.add(c)));

    const egresos: Egreso[] = Array.from(conceptosSet).map((concept, idx) => {
      const monthly = new Array(12).fill(0);
      let sum = 0;
      filtered.forEach(r => {
        if (typeof r.monthIndex === 'number' && r.egMap && r.egMap[concept] != null) {
          const val = Number(r.egMap[concept] || 0);
          monthly[r.monthIndex] += val;
          sum += val;
        }
      });
      return {
        id: `${idx}-${concept}`,
        concepto: concept,
        monto: sum,
        monthly,
        expanded: false
      } as Egreso;
    });

    egresos.sort((a,b) => b.monto - a.monto || a.concepto.localeCompare(b.concepto));
    return egresos;
  }

  toggleExpand(egreso: Egreso) {
    egreso.expanded = !egreso.expanded;
  }

  monthlySum(egreso: Egreso): number {
    return egreso.monthly.reduce((s, v) => s + (Number(v) || 0), 0);
  }

  trackByEgreso(index: number, e: Egreso) {
    return e.id;
  }

  get totalEgresos(): number {
    return this.egresos.reduce((acc, e) => acc + (e.monto || 0), 0);
  }
}