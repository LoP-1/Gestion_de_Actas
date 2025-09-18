import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';

interface ItemMonto {
  concepto: string;
  monto: number;
}

@Component({
  selector: 'app-detalle-simple',
  standalone: true,
  templateUrl: './detalle-simple.html',
  styleUrls: ['./detalle-simple.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ]
})
export class DetalleSimpleComponent {
  data: any = null;
  isLoading = true;

  ingresosDisplayedColumns = ['concepto', 'monto'];
  egresosDisplayedColumns = ['concepto', 'monto'];
  ingresos: ItemMonto[] = [];
  egresos: ItemMonto[] = [];
  totalIngresos = 0;
  totalEgresos = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<DetalleSimpleComponent>,
    private router: Router
  ) {
    if (dialogData?.id) {
      localStorage.setItem('ultimoBoletaId', String(dialogData.id));
      this.loadData(dialogData.id);
    } else {
      this.isLoading = false;
    }
  }

  private loadData(id: number) {
    this.isLoading = true;
    this.http.get<any>(`${environment.apiUrl}/usuarios/${id}`).subscribe({
      next: (resp) => {
        this.data = resp;
        this.parseIngresos(resp);
        this.parseEgresos(resp);
        this.totalIngresos = this.ingresos.reduce((a, c) => a + c.monto, 0);
        this.totalEgresos = this.egresos.reduce((a, c) => a + c.monto, 0);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando detalle boleta:', err);
        this.isLoading = false;
      }
    });
  }

  private parseIngresos(resp: any) {
    this.ingresos = [];
    if (resp?.ingresosJson) {
      try {
        const obj = typeof resp.ingresosJson === 'string' ? JSON.parse(resp.ingresosJson) : resp.ingresosJson;
        this.ingresos = Object.entries(obj)
          .filter(([_, monto]) => Number(monto) !== 0)
          .map(([concepto, monto]) => ({
            concepto: String(concepto),
            monto: Number(monto)
          }));
      } catch (e) {
        console.error('Error parsing ingresosJson', e);
      }
    }
  }

  private parseEgresos(resp: any) {
    this.egresos = [];
    if (resp?.egresosJson) {
      try {
        const obj = typeof resp.egresosJson === 'string' ? JSON.parse(resp.egresosJson) : resp.egresosJson;
        this.egresos = Object.entries(obj)
          .filter(([_, monto]) => Number(monto) !== 0)
          .map(([concepto, monto]) => ({
            concepto: String(concepto),
            monto: Number(monto)
          }));
      } catch (e) {
        console.error('Error parsing egresosJson', e);
      }
    }
  }

  agregarADetalles() {
    if (!this.data) return;
    const boleta = {
      id: this.data.id,
      nombre: `${this.data.nombres} ${this.data.apePaterno} ${this.data.apeMaterno}`.trim(),
      periodo: this.data.periodoPago,
      dni: this.data.nroDocumento
    };
    const carrito: any[] = JSON.parse(localStorage.getItem('carritoBoletas') || '[]');
    if (!carrito.find(item => item.id === boleta.id)) {
      carrito.push(boleta);
      localStorage.setItem('carritoBoletas', JSON.stringify(carrito));
      window.dispatchEvent(new Event('carritoActualizado'));
      this.cerrarDialogo();
    }
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

  verDetalleCompleto() {
    this.agregarADetalles();
    this.cerrarDialogo();
    this.router.navigate(['/detalles-completos', this.dialogData.id]);
  }

  verDescuentos() {
    this.agregarADetalles();
    this.cerrarDialogo();
    this.router.navigate(['/descuentos', this.data?.nroDocumento]);
  }

  formato(valor: number): string {
    if (isNaN(valor)) return 'S/ 0.00';
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(valor);
  }

  imprimirBoleta() {
    const area = document.getElementById('print-area-simple');
    if (!area) return;
    const clone = area.cloneNode(true) as HTMLElement;

    const win = window.open('', '_blank', 'width=900,height=1000');
    if (!win) return;

    const fecha = new Date().toLocaleString('es-PE');
    const titulo = `Boleta - ${this.data?.periodoPago || ''} - ${this.data?.nroDocumento || ''}`;

    win.document.write(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>${titulo}</title>
          <style>
            :root {
              --brand-navy: #00286a;
              --brand-green: #00d084;
              --brand-orange: #ff6900;
            }
            * { box-sizing:border-box; }
            body {
              font-family: "Inter","Segoe UI",Arial,sans-serif;
              margin: 14px 18px 24px;
              color:#222;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            h1 {
              font-size:1.25rem;
              margin:0 0 4px 0;
              color: var(--brand-navy);
              letter-spacing:.5px;
            }
            .print-header {
              text-align:center;
              border-bottom:2px solid var(--brand-navy);
              padding-bottom:6px;
              margin-bottom:14px;
            }
            .meta-line {
              font-size:.68rem;
              display:flex;
              gap:14px;
              justify-content:center;
              flex-wrap:wrap;
              color:#444;
              letter-spacing:.5px;
            }
            .resumen-bar {
              display:grid;
              grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
              gap:8px;
              margin: 8px 0 16px;
            }
            .resumen-box {
              border:1px solid #d7dde6;
              border-radius:10px;
              padding:8px 10px;
              background: linear-gradient(180deg,#fdfefe,#f5f8fb);
            }
            .resumen-box h3 {
              margin:0 0 2px 0;
              font-size:.6rem;
              text-transform:uppercase;
              letter-spacing:.12em;
              color:#555;
              font-weight:600;
            }
            .resumen-box .val {
              font-size:.95rem;
              font-weight:700;
              color:var(--brand-navy);
              word-break:break-word;
            }
            .resumen-box.neto .val { color: var(--brand-orange); }
            .group-title {
              margin:18px 0 6px;
              font-size:.8rem;
              text-transform:uppercase;
              letter-spacing:.08em;
              color: var(--brand-navy);
              font-weight:700;
              border-bottom:1px solid #ccd5e2;
              padding-bottom:4px;
            }
            table {
              width:100%;
              border-collapse:collapse;
              font-size:.7rem;
              margin-bottom:10px;
            }
            thead th {
              background: var(--brand-navy);
              color:#fff;
              padding:6px 8px;
              text-align:left;
              letter-spacing:.05em;
              font-weight:600;
            }
            tbody td {
              padding:5px 8px;
              border-bottom:1px solid #e0e6ee;
            }
            tbody tr:last-child td { border-bottom:none; }
            tbody tr:nth-child(even) td {
              background:#f7f9fc;
            }
            tfoot td {
              padding:6px 8px;
              border-top:2px solid var(--brand-navy);
              font-weight:600;
            }
            .col-num { text-align:right; font-variant-numeric: tabular-nums; }
            .tag {
              display:inline-block;
              font-size:.55rem;
              padding:2px 6px;
              border-radius:20px;
              background: var(--brand-green);
              color:#fff;
              letter-spacing:.07em;
              font-weight:600;
              margin-right:4px;
            }
            .tag.egreso { background: var(--brand-orange); }
            .datos-grid {
              display:grid;
              gap:6px 16px;
              grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
              font-size:.63rem;
              margin-top:4px;
            }
            .datos-grid div span.label {
              display:block;
              font-size:.55rem;
              text-transform:uppercase;
              letter-spacing:.1em;
              color:#555;
              font-weight:600;
              margin-bottom:1px;
            }
            .datos-grid div span.value {
              font-size:.8rem;
              font-weight:600;
              color:#222;
              word-break:break-word;
            }
            @page { size: A4; margin: 14mm 12mm 16mm 12mm; }
            @media print {
              body { margin:0; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Boleta de Pago</h1>
            <div class="meta-line">
              <span>Periodo: ${this.data?.periodoPago || '-'}</span>
              <span>DNI: ${this.data?.nroDocumento || '-'}</span>
              <span>Emitido: ${fecha}</span>
            </div>
          </div>
          ${clone.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 400);
  }
}