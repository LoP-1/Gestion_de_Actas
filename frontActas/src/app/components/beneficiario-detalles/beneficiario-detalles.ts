import { Component, Inject, computed, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Beneficiario {
  dni_ben: string;
  nom_ben?: string;
  pat_ben?: string;
  mat_ben?: string;
  fnac_ben?: string | Date;
  cuenta_ahorro?: string;
  total_haber?: number | string;
  total_liquido?: number | string;
  leyenda?: string;
  haberes_json?: string | Record<string, any>;
}

@Component({
  selector: 'app-beneficiario-detalles',
  standalone: true,
  templateUrl: './beneficiario-detalles.html',
  styleUrls: ['./beneficiario-detalles.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ]
})
export class BeneficiarioDetallesComponent {
  beneficiarios = signal<Beneficiario[]>([]);
  loading = signal(true);
  error = signal('');
  seleccionado = signal<Beneficiario | null>(null);

  // Computed para evitar lógica duplicada en template
  seleccionadoHaberes = computed(() => {
    const b = this.seleccionado();
    if (!b) return [];
    return this.parseHaberes(b.haberes_json);
  });

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { periodo: string; dni: string }
  ) {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios() {
    const url = `http://localhost:8000/api/beneficiarios?periodo_pago=${this.data.periodo}&dni_tit=${this.data.dni}`;
    this.loading.set(true);
    this.http.get<Beneficiario[]>(url).subscribe({
      next: (resp) => {
        this.beneficiarios.set(resp || []);
        this.seleccionado.set(resp.length > 0 ? resp[0] : null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la información');
        this.loading.set(false);
      }
    });
  }

  trackByDni = (_: number, item: Beneficiario) => item.dni_ben;

  seleccionar(b: Beneficiario) {
    this.seleccionado.set(b);
  }

  getNombreCompletoBen(b: Beneficiario | null): string {
    if (!b) return '';
    return `${b.nom_ben ?? ''} ${b.pat_ben ?? ''} ${b.mat_ben ?? ''}`.replace(/\s+/g, ' ').trim();
  }

  parseHaberes(h: Beneficiario['haberes_json']): Array<{ key: string; value: string }> {
    if (!h) return [];
    try {
      const obj = typeof h === 'string' ? JSON.parse(h) : h;
      return Object.entries(obj).map(([k, v]) => ({ key: k, value: String(v) }));
    } catch {
      return [];
    }
  }

  imprimirBoleta() {
    // Evita bloquear pestaña principal
    const area = document.getElementById('print-area');
    if (!area) return;
    // Clona el nodo para asegurar estilos internos
    const clone = area.cloneNode(true) as HTMLElement;

      const printBtn = clone.querySelector('.print-btn');
  if (printBtn) {
    printBtn.remove();
  }


    const win = window.open('', '_blank', 'width=840,height=1000');
    if (!win) return;
    win.document.open();
    win.document.write(`
      <html>
        <head>
          <title>Boleta Beneficiario - ${this.getNombreCompletoBen(this.seleccionado())}</title>
          <meta charset="utf-8"/>
          <style>
            /* Reutilizamos parte de la paleta y un layout limpio */
            :root {
              --brand-navy: #00286a;
              --brand-green: #00d084;
              --brand-orange: #ff6900;
            }
            body {
              font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
              margin: 14px 18px;
              color: #222;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-header {
              text-align: center;
              margin-bottom: 14px;
              border-bottom: 2px solid var(--brand-navy);
              padding-bottom: 6px;
            }
            .print-header h1 {
              margin: 0;
              font-size: 1.25rem;
              letter-spacing: .5px;
              color: var(--brand-navy);
            }
            .print-meta {
              font-size: .78rem;
              color: #555;
              display: flex;
              justify-content: center;
              gap: 18px;
              flex-wrap: wrap;
              margin-top: 4px;
            }
            .boleta-section {
              margin-bottom: 10px;
            }
            .boleta-section h2 {
              font-size: .9rem;
              margin: 0 0 6px 0;
              text-transform: uppercase;
              letter-spacing: .05em;
              color: var(--brand-navy);
            }
            .datos-grid {
              display: grid;
              gap: 4px 16px;
              grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
              font-size: .8rem;
              margin-bottom: 8px;
            }
            .tag-monto {
              display: inline-flex;
              align-items: center;
              background: var(--brand-green);
              color: #fff;
              font-weight: 600;
              border-radius: 6px;
              padding: 2px 10px;
              font-size: .78rem;
              margin: 4px 6px 4px 0;
            }
            .leyenda-box {
              background: rgba(255,105,0,0.07);
              border: 1px solid rgba(255,105,0,0.4);
              padding: 6px 10px;
              border-radius: 8px;
              font-size: .75rem;
              line-height: 1.25rem;
              color: #553314;
              margin: 8px 0;
              word-break: break-word;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: .72rem;
            }
            thead th {
              background: var(--brand-navy);
              color: #fff;
              text-align: left;
              padding: 6px 8px;
              font-weight: 600;
              letter-spacing: .04em;
            }
            tbody td {
              border-bottom: 1px solid #e2e6ef;
              padding: 4px 8px;
            }
            tbody tr:last-child td {
              border-bottom: none;
            }
            tfoot td {
              font-weight: 600;
              padding: 6px 8px;
              border-top: 2px solid var(--brand-navy);
            }
            .resaltado {
              color: var(--brand-orange);
              font-weight: 600;
            }
            @page {
              size: A4;
              margin: 14mm 12mm 16mm 12mm;
            }
            @media print {
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Boleta de Beneficiario</h1>
            <div class="print-meta">
              <span>Periodo: ${this.data.periodo}</span>
              <span>DNI Titular: ${this.data.dni}</span>
              <span>Generado: ${new Date().toLocaleString()}</span>
            </div>
          </div>
          ${clone.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
      // Opcional: cerrar auto
      // win.close();
    }, 400);
  }
}