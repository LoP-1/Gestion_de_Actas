import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-detalle-completo',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatCardModule, MatIconModule],
  templateUrl: './detalle-completo.html',
  styleUrls: ['./detalle-completo.css']
})

// Mapea las claves de ingresos y egresos a descripciones legibles
// Actualmente NO se usan estan ahi porsiacaso
export class DetalleCompletoComponent implements OnInit, AfterViewInit, OnDestroy {
  id!: number;
  data: any = null;
  isLoading = true;
  public today: Date = new Date();

  ingresos: Array<{ concepto: string, monto: number }> = [];
  egresos: Array<{ concepto: string, monto: number }> = [];
  totalIngresos = 0;
  totalEgresos = 0;

  ingresosLabels: { [key: string]: string } = { /* ... */ };
  egresosLabels: { [key: string]: string } = { /* ... */ };

  ingresosDisplayedColumns: string[] = ['concepto', 'monto'];
  egresosDisplayedColumns: string[] = ['concepto', 'monto'];

  private beforePrintHandler = () => this.preparePrintScale();
  private afterPrintHandler = () => this.resetPrintScale();
  private mql?: MediaQueryList;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') || '1');
      localStorage.setItem('ultimoBoletaId', String(this.id));
      this.cargarDatos();
    });
  }

  // Ajusta la escala de impresión para que el contenido quepa en una hoja A4
  ngAfterViewInit(): void {
    window.addEventListener('beforeprint', this.beforePrintHandler);
    window.addEventListener('afterprint', this.afterPrintHandler);

    this.mql = window.matchMedia('print');
    const mqlRef = this.mql;
    if (mqlRef && (mqlRef as any).addEventListener) {
      mqlRef.addEventListener('change', (e) => e.matches ? this.preparePrintScale() : this.resetPrintScale());
    } else if (mqlRef) {
      (mqlRef as any).addListener((e: MediaQueryListEvent) => e.matches ? this.preparePrintScale() : this.resetPrintScale());
    }
  }

  // Limpia los event listeners
  ngOnDestroy(): void {
    window.removeEventListener('beforeprint', this.beforePrintHandler);
    window.removeEventListener('afterprint', this.afterPrintHandler);
  }

  // Carga los datos del usuario y procesa ingresos y egresos
  cargarDatos() {
    const url = `${environment.apiUrl}/usuarios/${this.id}`;
    this.isLoading = true;
    this.http.get<any>(url).subscribe(resp => {
      this.data = resp;
      this.isLoading = false;
      // INGRESOS: mostrar la clave tal cual viene en el JSON
      this.ingresos = [];
      if (resp && resp.ingresosJson) {
        try {
          const ingresosObj = typeof resp.ingresosJson === 'string' ? JSON.parse(resp.ingresosJson) : resp.ingresosJson;
          this.ingresos = Object.entries(ingresosObj)
            .filter(([concepto, monto]) => Number(monto) !== 0)
            .map(([concepto, monto]) => ({
              // mostrar la clave tal como viene en el JSON
              concepto: String(concepto),
              monto: Number(monto)
            }));
        } catch (e) {
          console.error("Error parsing ingresosJson", e);
        }
      }

      // EGRESOS: igual, mostrar la clave directamente
      this.egresos = [];
      if (resp && resp.egresosJson) {
        try {
          const egresosObj = typeof resp.egresosJson === 'string' ? JSON.parse(resp.egresosJson) : resp.egresosJson;
          this.egresos = Object.entries(egresosObj)
            .filter(([concepto, monto]) => Number(monto) !== 0)
            .map(([concepto, monto]) => ({
              concepto: String(concepto),
              monto: Number(monto)
            }));
        } catch (e) {
          console.error("Error parsing egresosJson", e);
        }
      }

      this.totalIngresos = this.ingresos.reduce((acc, cur) => acc + cur.monto, 0);
      this.totalEgresos = this.egresos.reduce((acc, cur) => acc + cur.monto, 0);
    }, _err => {
      this.isLoading = false;
      this.data = null;
    });
  }

  private mmToPx(mm: number): number {
    return (mm / 25.4) * 96;
  }

  private preparePrintScale(): void {
    const sheet = document.querySelector('.print-sheet.a4') as HTMLElement | null;
    const inner = document.querySelector('.print-inner') as HTMLElement | null;
    if (!sheet || !inner) return;

    // Asegura estado base sin escala
    sheet.style.removeProperty('--print-scale');

    // Medidas reales del contenido (sin escala)
    const contentWidth = inner.scrollWidth;
    const contentHeight = inner.scrollHeight;

    const availWidth = this.mmToPx(210);
    const availHeight = this.mmToPx(297);

    const scaleX = availWidth / contentWidth;
    const scaleY = availHeight / contentHeight;

    // Factor seguro (ligeramente menor para prevenir desbordes por redondeo)
    const scale = Math.min(1, scaleX, scaleY) * 0.995;

    sheet.style.setProperty('--print-scale', String(scale));
  }

  private resetPrintScale(): void {
    const sheet = document.querySelector('.print-sheet.a4') as HTMLElement | null;
    if (!sheet) return;
    sheet.style.removeProperty('--print-scale');
  }

  imprimir() {
    requestAnimationFrame(() => {
      this.preparePrintScale();
      setTimeout(() => window.print(), 60);
    });
  }

  imprimirEnPopup() {
    const area = document.getElementById('print-area');
    if (!area) return;
    const w = window.open('', '_blank', 'width=1024,height=768');
    if (!w) return;
    w.document.open();
    w.document.write(`
      <html>
        <head>
          <title>Detalle de Boleta</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>${area.innerHTML}
          <script>
            window.addEventListener('load', function(){
              setTimeout(function(){ window.print(); }, 200);
            });
          <\/script>
        </body>
      </html>
    `);
    w.document.close();
  }

  formatearAFP(afpCode: string): string {
  const afpMap: { [key: string]: string } = {
    '15': 'HABITAD',
    '14': 'HABITAD',
    '5': 'PROFUTURO',
    '12': 'PROFUTURO',
    '2': 'INTEGRA',
    '11': 'INTEGRA',
    '9': 'PRIMA',
    '13': 'PRIMA'
  };
  return afpMap[afpCode] || afpCode;
}
  formatearSexo(sexoCode: string): string {
    const sexoMap: { [key: string]: string } = {
      '0': 'Masculino',
      '1': 'Femenino'
    };
    return sexoMap[sexoCode] || sexoCode;
}

}
