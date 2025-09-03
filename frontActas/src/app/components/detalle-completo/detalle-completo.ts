import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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

  ingresosMap: { [key: string]: string } = {
    rmsCesfa: 'RMS.C.ESFA', ruralCont: 'Rural Cont.', rmsEes: 'RMS_EES', rimsEes: 'RIMS_EES',
    bExtTranVari: 'B.Ext.Tran.Vari', bExtTranFijo: 'B.Ext.Tran.Fijo', asgVra30512: 'Asg. VRA 30512',
    asgRural30512: 'Asg. Rural 30512', montUniCons: 'Mont. Uni. Cons', rms30512: 'RMS 30512',
    aCargEspLrm: 'A.carg Esp LRM', remTransiEsfa: 'Rem. Transi ESFA', rims: 'RIMS',
    aCargDirGes: 'A.carg Dir Ges', palmasMagMaes: 'Palmas Mag Maes', jorTrabAdLrm: 'Jor Trab Ad LRM',
    aCargDirLrm: 'A.carg Dir LRM', rimLey29944: 'RIM Ley 29944', ley29702: 'Ley 29702',
    ds0652003Ef: 'DS065-2003-EF', du01199: 'D.U.011-99', reintManNoAf: 'Reint Man No Af',
    reintgManual: 'Reintg. Manual', du07397: 'D.U.073-97', dl26504: 'D.L.26504',
    ds01193Ed: 'DS011-93-ED', difPensionable: 'Dif Pensionable', ds26191EfIgv: 'DS261-91-EF IGV',
    reunificada: 'Reunificada', bonEspecial: 'Bon. Especial', aguinaldo: 'Aguinaldo',
    cvidDs15491Ef: 'CVid.DS154-91EF', dse02192Pcm: 'DSE 021-92-PCM', ds01994Pcm: 'DS.019-94-PCM',
    bonDu9096: 'Bon. D.U.90-96', refrigMov: 'Refrig. y Mov.', du08094: 'D.U.080-94',
    asigDs081: 'Asig. D.S.081', asigDl25671: 'Asig.D.L.25671', sueldoBase: 'Sueldo Base'
  };

  egresosMap: { [key: string]: string } = {
    dl19990Snp: 'DL19990 SNP', dsctoJudicial: 'Dscto. Judicial', derrMagisteria: 'Derr Magisteria',
    coopCapacYupa: 'Coop Capac Yupa', ipssvida: 'IPSSVIDA', tardanzas: 'Tardanzas',
    dl25897Afp: 'D.L.25897 AFP', pagindnoaf: 'Pagindnoaf', quintacat: 'Quintacat',
    segrimac: 'Segrimac', cmcusco: 'CMCusco', cmarequipa: 'CMArequipa', interbank: 'Interbank',
    cmhuancayo: 'CMHuancayo', prderrmag: 'Prderrmag', idg: 'IDG', fentase: 'Fentase',
    inasistencias: 'Inasistencias', aeherme: 'AEHERME', bripley: 'BRIPLEY', craccentro: 'CRACCENTRO',
    bcoPichincha: 'Bco. Pichincha', gproeducar: 'GPROEDUCAR', constante: 'Constante', subcafae: 'SUBCAFAE'
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
    this.isLoading = true;
    this.http.get<any>(`http://localhost:8080/usuarios/${this.id}`).subscribe(resp => {
      this.data = resp;
      this.isLoading = false;

      this.ingresos = Object.entries(this.ingresosMap)
        .filter(([key]) => resp[key] && Number(resp[key]) > 0)
        .map(([key, label]) => ({ concepto: label, monto: Number(resp[key]) }));

      this.egresos = Object.entries(this.egresosMap)
        .filter(([key]) => resp[key] && Number(resp[key]) > 0)
        .map(([key, label]) => ({ concepto: label, monto: Number(resp[key]) }));

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
    // Espera a que el DOM pinte y aplica escala
    requestAnimationFrame(() => {
      this.preparePrintScale();
      setTimeout(() => window.print(), 60);
    });
  }

  // Por si quieres probar impresión aislada en popup
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