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
export class DetalleCompletoComponent implements OnInit, AfterViewInit, OnDestroy {
  id!: number;
  data: any = null;
  isLoading = true;
  public today: Date = new Date();

  ingresos: Array<{ concepto: string, monto: number }> = [];
  egresos: Array<{ concepto: string, monto: number }> = [];
  totalIngresos = 0;
  totalEgresos = 0;

  ingresosLabels: { [key: string]: string } = {
    "RMS.C.ESFA": "Remuneración Mensual por Servicio en ESFA",
    "rural_cont": "Rural Continúa",
    "RMS_EES": "Remuneración Mensual por Servicio en EES",
    "RIMS_EES": "Remuneración por Incentivos en EES",
    "B_Ext_Tran_Vari": "Bonif. Ext. Transf. Variable",
    "B_Ext_Tran_Fijo": "Bonif. Ext. Transf. Fija",
    "asg_vra_30512": "Asignación VRA 30512",
    "asg_rural_30512": "Asignación Rural 30512",
    "Mont_Uni_Cons": "Monto Único de Consumo",
    "RMS_30512": "Remuneración Mensual 30512",
    "A.carg_esp_LRM": "A cargo Especial LRM",
    "Rem.Transi.ESFA": "Remuneración Transitoria ESFA",
    "RIMS": "Remuneración por Incentivos",
    "A.carg_dir_Ges_": "A cargo Dirección Gestión",
    "Palmas MagMaes": "Palmas Magisteriales Maestros",
    "Jor_Trab.Ad_lrm": "Jornada Trabajo Adicional LRM",
    "A.carg_dir_LRM": "A cargo Dirección LRM",
    "RIM_Ley 29944": "RIM Ley 29944",
    "Ley29702": "Ley 29702",
    "DS065-2003-EF": "DS065-2003-EF",
    "D.U.011-99": "D.U. 011-99",
    "Reint Man No Af": "Reintegro Manual No Afiliado",
    "Reintg. Manual": "Reintegro Manual",
    "D.U.073-97": "D.U. 073-97",
    "D.L. 26504": "D.L. 26504",
    "DS011-93-ED": "DS011-93-ED",
    "Dif Pensionable": "Diferencia Pensionable",
    "DS261-91-EF IGV": "DS261-91-EF IGV",
    "Reunificada": "Remuneración Unificada",
    "Bon. Especial": "Bonificación Especial",
    "aguinaldo": "Aguinaldo",
    "CVid.DS154-91EF": "Compensación Vida DS154-91EF",
    "DSE 021-92-PCM": "DSE 021-92-PCM",
    "DS. 019-94-PCM": "DS. 019-94-PCM",
    "Bon. D.U. 90-96": "Bonificación D.U. 90-96",
    "Refrig. y Mov.": "Refrigerio y Movilidad",
    "D.U. 080-94": "D.U. 080-94",
    "Asig. D.S.081": "Asignación D.S.081",
    "Asig.D.L. 25671": "Asignación D.L. 25671",
    "Sueldo Base": "Sueldo Base"
  };

  egresosLabels: { [key: string]: string } = {
    "DL19990 SNP": "Descuento SNP DL19990",
    "Dscto. Judicial": "Descuento Judicial",
    "Derr Magisteria": "Derrama Magisterial",
    "Coop Capac Yupa": "Coop. Capac Yupa",
    "IPSSVIDA": "Descuento IPSS Vida",
    "Tardanzas": "Descuento por Tardanzas",
    "D.L. 25897 AFP": "Descuento AFP D.L. 25897",
    "pagindnoaf": "Pago Ind. No Afiliado",
    "quintacat": "Quinta Categoría",
    "segrimac": "Seguro Rimac",
    "cmcusco": "Caja Municipal Cusco",
    "cmarequipa": "Caja Municipal Arequipa",
    "interbank": "Descuento Interbank",
    "cmhuancayo": "Caja Municipal Huancayo",
    "prderrmag": "Préstamo Derrama Magisterial",
    "idg": "IDG",
    "fentase": "FENTASE",
    "Inasistencias": "Descuento por Inasistencias",
    "AEHERME": "AEHERME",
    "BRIPLEY": "BRIPLEY",
    "CRACCENTRO": "CRACCENTRO",
    "Bco.Pichincha": "Banco Pichincha",
    "GPROEDUCAR": "GPROEDUCAR",
    "CONSTANTE": "Constante",
    "SUBCAFAE": "SUBCAFAE"
  };

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

  ngAfterViewInit(): void {
    window.addEventListener('beforeprint', this.beforePrintHandler);
    window.addEventListener('afterprint', this.afterPrintHandler);

    this.mql = window.matchMedia('print');
    const mqlRef = this.mql;
    if (mqlRef.addEventListener) {
      mqlRef.addEventListener('change', (e) => e.matches ? this.preparePrintScale() : this.resetPrintScale());
    } else if ((mqlRef as any).addListener) {
      (mqlRef as any).addListener((e: MediaQueryListEvent) => e.matches ? this.preparePrintScale() : this.resetPrintScale());
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeprint', this.beforePrintHandler);
    window.removeEventListener('afterprint', this.afterPrintHandler);
    // no-op for removing mql listener (not critical)
  }

  cargarDatos() {
    const url = `${environment.apiUrl}/usuarios/${this.id}`;
    this.isLoading = true;
    this.http.get<any>(url).subscribe(resp => {
      this.data = resp;
      this.isLoading = false;

      // INGRESOS JSON amigables
      this.ingresos = [];
      if (resp.ingresosJson) {
        try {
          const ingresosObj = JSON.parse(resp.ingresosJson);
          this.ingresos = Object.entries(ingresosObj)
            .filter(([concepto, monto]) => Number(monto) !== 0)
            .map(([concepto, monto]) => ({
              concepto: this.ingresosLabels[concepto] || concepto,
              monto: Number(monto)
            }));
        } catch (e) {
          console.error("Error parsing ingresosJson", e);
        }
      }

      // EGRESOS JSON amigables
      this.egresos = [];
      if (resp.egresosJson) {
        try {
          const egresosObj = JSON.parse(resp.egresosJson);
          this.egresos = Object.entries(egresosObj)
            .filter(([concepto, monto]) => Number(monto) !== 0)
            .map(([concepto, monto]) => ({
              concepto: this.egresosLabels[concepto] || concepto,
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
}