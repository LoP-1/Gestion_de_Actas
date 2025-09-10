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
import { ActivatedRoute, Router } from '@angular/router';
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
  templateUrl: './descuentos.html',
  styleUrls: ['./descuentos.css']
})
//Logica para el manejo de descuentos
export class DescuentosComponent implements OnInit {
  dni = new FormControl('', [Validators.required, Validators.pattern(/^\d{6,8}$/)]);
  years: number[] = [];
  selectedYear?: number;
  egresos: Egreso[] = [];
  loaded = true;
  errorMsg = '';

  months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  private lastRows: PeriodRow[] = [];

  private lastRouteDni?: string;

  constructor(
    private desc: DescuentosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //búsqueda reactiva con debounce al escribir manualmente
    this.dni.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        this.errorMsg = '';
        if (!val || this.dni.invalid) {
          this.egresos = [];
          this.years = [];
          this.selectedYear = undefined;
          this.loaded = true;
          return of<any | null>(null);
        }
        this.loaded = false;
        return this.desc.getPeriodosEgresosByDni(String(val), this.selectedYear).pipe(
          catchError(err => {
            console.error(err);
            this.errorMsg = 'Error cargando datos';
            this.loaded = true;
            return of<any | null>(null);
          })
        );
      })
    ).subscribe((data: any | null) => {
      if (!data) return;
      const rows = this.toPeriodRows(data);
      this.lastRows = rows;
      this.years = this.computeYearsFromRows(rows);
      if (this.selectedYear != null && !this.years.includes(this.selectedYear)) {
        this.selectedYear = undefined;
      }
      this.egresos = this.buildEgresosFromPeriodRows(rows, this.selectedYear);
      this.loaded = true;
    });

    //Bootstrap desde la ruta: si viene /descuentos/:dni o ?dni=... se carga el dni al redirigir
    this.bootstrapFromRoute();
  }

  // Cargar/actualizar DNI si viene por ruta y disparar la búsqueda una sola vez por cambio
  private bootstrapFromRoute(): void {
    const initial =
      this.route.snapshot.paramMap.get('dni') ||
      this.route.snapshot.queryParamMap.get('dni') ||
      this.route.snapshot.queryParamMap.get('nro_documento');

    if (initial) {
      this.setDniAndSearch(initial);
    }

    // Escuchar cambios posteriores (si se reusa el componente)
    this.route.paramMap.subscribe(pm => {
      const d = pm.get('dni');
      if (d && d !== this.lastRouteDni) {
        this.setDniAndSearch(d);
      }
    });

    this.route.queryParamMap.subscribe(qm => {
      const d = qm.get('dni') || qm.get('nro_documento');
      if (d && d !== this.lastRouteDni) {
        this.setDniAndSearch(d);
      }
    });
  }

  private sanitizeDni(raw: string | null | undefined): string | null {
    if (!raw) return null;
    const onlyDigits = String(raw).replace(/\D+/g, '');
    if (onlyDigits.length < 6 || onlyDigits.length > 8) return null;
    return onlyDigits;
  }

  private setDniAndSearch(raw: string): void {
    const clean = this.sanitizeDni(raw);
    if (!clean) return;
    this.lastRouteDni = clean;
    this.dni.setValue(clean, { emitEvent: false });
    this.searchByDni();
  }
  //funcion para buscar por dni
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
        return of<any | null>(null);
      })
    ).subscribe((data: any | null) => {
      if (!data) {
        this.egresos = [];
        this.years = [];
        this.selectedYear = undefined;
        this.loaded = true;
        return;
      }
      const rows = this.toPeriodRows(data);
      this.lastRows = rows;
      this.years = this.computeYearsFromRows(rows);
      if (this.selectedYear != null && !this.years.includes(this.selectedYear)) {
        this.selectedYear = undefined;
      }
      this.egresos = this.buildEgresosFromPeriodRows(rows, this.selectedYear);
      this.loaded = true;
    });
  }

  //seleccionar año para filtrar
  selectYear(y: number) {
    if (this.selectedYear === y) {
      this.selectedYear = undefined;
    } else {
      this.selectedYear = y;
    }

    // re-filtrado local si tenemos cache
    if (this.lastRows && this.lastRows.length) {
      this.egresos = this.buildEgresosFromPeriodRows(this.lastRows, this.selectedYear);
      return;
    }

    // si no hay cache pero hay DNI, consultamos
    if (this.dni.value) this.searchByDni();
  }

  //normalizar la respuesta, evitar errores
  private toPeriodRows(data: unknown): PeriodRow[] {
    if (!data) return [];

    if (Array.isArray(data)) {
      const arr = data as any[];

      const isAlternating =
        arr.length % 2 === 0 &&
        arr.every((v, idx) =>
          idx % 2 === 0 ? (typeof v === 'string' || typeof v === 'number') : (v && typeof v === 'object' && !Array.isArray(v))
        );

      if (isAlternating) {
        const rows: PeriodRow[] = [];
        for (let i = 0; i < arr.length; i += 2) {
          const periodo = String(arr[i] ?? '');
          const egresosObj = arr[i + 1] ?? {};
          rows.push({
            periodo_pago: periodo,
            egresos_json: JSON.stringify(egresosObj)
          } as PeriodRow);
        }
        return rows;
      }

      const asRows = arr
        .map(item => {
          if (item && typeof item === 'object') {
            const i = item as any;
            const periodo_pago = String(i.periodo_pago ?? i.periodo ?? i.periodoPago ?? '');
            let eg: any = i.egresos_json;
            if (eg == null) eg = i.egresos;
            if (eg == null) eg = i.egresosJson; // camelCase del backend actual
            const egresos_json = typeof eg === 'string' ? eg : JSON.stringify(eg ?? {});
            if (!periodo_pago) return null;
            return {
              // @ts-ignore
              periodo_pago,
              // @ts-ignore
              egresos_json
            } as PeriodRow;
          }
          return null;
        })
        .filter(Boolean) as PeriodRow[];

      if (asRows.length) return asRows;
      return [];
    }

    // Objeto mapa { "YYYYMM": { ... } }
    if (typeof data === 'object') {
      const rows: PeriodRow[] = [];
      Object.entries(data as Record<string, unknown>).forEach(([periodo, eg]) => {
        rows.push({
          // @ts-ignore
          periodo_pago: String(periodo),
          // @ts-ignore
          egresos_json: JSON.stringify(eg ?? {})
        } as PeriodRow);
      });
      return rows;
    }

    return [];
  }

  // Años únicos a partir de YYYYMM separando el año del mes, tomando datos del periodo_pago
  private computeYearsFromRows(rows: PeriodRow[]): number[] {
    const yearsSet = new Set<number>();
    for (const r of rows) {
      const yyyymm = String(r.periodo_pago ?? '').replace(/[^0-9]/g, '');
      if (yyyymm.length === 6) {
        const year = Number(yyyymm.slice(0, 4));
        if (!Number.isNaN(year)) yearsSet.add(year);
      }
    }
    return Array.from(yearsSet).sort((a, b) => b - a);
  }

  // Construye el arreglo de egresos con totales y desglose mensual
  private buildEgresosFromPeriodRows(rows: PeriodRow[], filterYear?: number): Egreso[] {
    const parsedRows = rows.map(r => {
      const periodoRaw = String(r.periodo_pago ?? '');
      let yyyymm = periodoRaw.replace(/[^0-9]/g, '');
      if (yyyymm.length !== 6) {
        yyyymm = '';
      }
      const year = yyyymm ? Number(yyyymm.slice(0,4)) : NaN;
      const month = yyyymm ? Number(yyyymm.slice(4,6)) : NaN;

      const parsed: Record<string, number> = {};
      const raw = r.egresos_json;
      if (raw != null) {
        try {
          const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
          const addKeyVal = (k: string, v: any) => {
            const key = String(k ?? '').trim();
            if (!key) return; // ignora claves vacías
            const num = Number(v || 0);
            parsed[key] = (parsed[key] || 0) + num;
          };

          if (Array.isArray(obj)) {
            obj.forEach(item => {
              if (typeof item === 'object' && item !== null) {
                const keys = Object.keys(item);
                if (keys.length === 2 && keys.includes('concepto') && keys.includes('monto')) {
                  addKeyVal((item as any).concepto, (item as any).monto);
                } else {
                  keys.forEach(k => addKeyVal(k, (item as any)[k]));
                }
              }
            });
          } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(k => addKeyVal(k, (obj as any)[k]));
          }
        } catch (e) {
          console.warn('egresos_json parse error', e);
        }
      }

      return {
        periodo: yyyymm,
        year: isNaN(year) ? undefined : year,
        monthIndex: !isNaN(month) ? month - 1 : undefined,
        egMap: parsed
      } as any;
    });

    
    const filtered = filterYear ? parsedRows.filter(r => r.year === filterYear) : parsedRows;
 
    // Recolectar todos los conceptos únicos
    const conceptosSet = new Set<string>();
    filtered.forEach(r => Object.keys(r.egMap || {}).forEach(c => conceptosSet.add(c)));

    // Construir el arreglo de egresos con totales y desglose mensual
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
    })
    .filter(e => (e.monto || 0) > 0);

    egresos.sort((a, b) => {
      const aIsQ = (a.concepto ?? '').trim().toLowerCase() === 'quintacat';
      const bIsQ = (b.concepto ?? '').trim().toLowerCase() === 'quintacat';
      if (aIsQ !== bIsQ) return aIsQ ? -1 : 1;
      return b.monto - a.monto || a.concepto.localeCompare(b.concepto);
    });

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

  get isAllYearsSelected(): boolean {
    return !this.selectedYear;
  }
}