import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-boleta',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './detalle-boleta.html',
  styleUrl: './detalle-boleta.css'
})
export class BoletaDetalleComponent {
  data: any = null;
  isLoading: boolean = true;

  ingresosDisplayedColumns = ['concepto', 'monto'];
  egresosDisplayedColumns = ['concepto', 'monto'];
  ingresos: any[] = [];
  egresos: any[] = [];

  // Diccionario de campos a mostrar (nombre clave: etiqueta legible)
  ingresosMap: { [key: string]: string } = {
    rmsCesfa: 'RMS.C.ESFA',
    ruralCont: 'Rural Cont.',
    rmsEes: 'RMS_EES',
    rimsEes: 'RIMS_EES',
    bExtTranVari: 'B.Ext.Tran.Vari',
    bExtTranFijo: 'B.Ext.Tran.Fijo',
    asgVra30512: 'Asg. VRA 30512',
    asgRural30512: 'Asg. Rural 30512',
    montUniCons: 'Mont. Uni. Cons',
    rms30512: 'RMS 30512',
    aCargEspLrm: 'A.carg Esp LRM',
    remTransiEsfa: 'Rem. Transi ESFA',
    rims: 'RIMS',
    aCargDirGes: 'A.carg Dir Ges',
    palmasMagMaes: 'Palmas Mag Maes',
    jorTrabAdLrm: 'Jor Trab Ad LRM',
    aCargDirLrm: 'A.carg Dir LRM',
    rimLey29944: 'RIM Ley 29944',
    ley29702: 'Ley 29702',
    ds0652003Ef: 'DS065-2003-EF',
    du01199: 'D.U.011-99',
    reintManNoAf: 'Reint Man No Af',
    reintgManual: 'Reintg. Manual',
    du07397: 'D.U.073-97',
    dl26504: 'D.L.26504',
    ds01193Ed: 'DS011-93-ED',
    difPensionable: 'Dif Pensionable',
    ds26191EfIgv: 'DS261-91-EF IGV',
    reunificada: 'Reunificada',
    bonEspecial: 'Bon. Especial',
    aguinaldo: 'Aguinaldo',
    cvidDs15491Ef: 'CVid.DS154-91EF',
    dse02192Pcm: 'DSE 021-92-PCM',
    ds01994Pcm: 'DS.019-94-PCM',
    bonDu9096: 'Bon. D.U.90-96',
    refrigMov: 'Refrig. y Mov.',
    du08094: 'D.U.080-94',
    asigDs081: 'Asig. D.S.081',
    asigDl25671: 'Asig.D.L.25671',
    sueldoBase: 'Sueldo Base'
  };

  egresosMap: { [key: string]: string } = {
    dl19990Snp: 'DL19990 SNP',
    dsctoJudicial: 'Dscto. Judicial',
    derrMagisteria: 'Derr Magisteria',
    coopCapacYupa: 'Coop Capac Yupa',
    ipssvida: 'IPSSVIDA',
    tardanzas: 'Tardanzas',
    dl25897Afp: 'D.L.25897 AFP',
    pagindnoaf: 'Pagindnoaf',
    quintacat: 'Quintacat',
    segrimac: 'Segrimac',
    cmcusco: 'CMCusco',
    cmarequipa: 'CMArequipa',
    interbank: 'Interbank',
    cmhuancayo: 'CMHuancayo',
    prderrmag: 'Prderrmag',
    idg: 'IDG',
    fentase: 'Fentase',
    inasistencias: 'Inasistencias',
    aeherme: 'AEHERME',
    bripley: 'BRIPLEY',
    craccentro: 'CRACCENTRO',
    bcoPichincha: 'Bco. Pichincha',
    gproeducar: 'GPROEDUCAR',
    constante: 'Constante',
    subcafae: 'SUBCAFAE'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpClient
  ) {
    if (dialogData?.id) {
      this.http.get<any>(`http://localhost:8080/usuarios/${dialogData.id}`)
        .subscribe(resp => {
          this.data = resp;
          this.isLoading = false;
          // Genera los ingresos/egresos dinámicamente SOLO si son distintos de cero
          this.ingresos = Object.entries(this.ingresosMap)
            .filter(([key]) => resp[key] && Number(resp[key]) !== 0)
            .map(([key, label]) => ({
              concepto: label,
              monto: resp[key]
            }));
          this.egresos = Object.entries(this.egresosMap)
            .filter(([key]) => resp[key] && Number(resp[key]) !== 0)
            .map(([key, label]) => ({
              concepto: label,
              monto: resp[key]
            }));
        }, err => {
          this.isLoading = false;
          console.error('Error cargando detalle boleta:', err);
        });
    }
  }
}