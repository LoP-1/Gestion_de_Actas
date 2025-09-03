import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-detalle-simple',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, RouterModule, MatCardModule,
    MatButtonModule, MatTableModule, MatIconModule
  ],
  templateUrl: './detalle-simple.html',
  styleUrl: './detalle-simple.css'
})
export class DetalleSimpleComponent {
  data: any = null;
  isLoading: boolean = true;

  ingresosDisplayedColumns = ['concepto', 'monto'];
  egresosDisplayedColumns = ['concepto', 'monto'];
  ingresos: Array<{ concepto: string, monto: number }> = [];
  egresos: Array<{ concepto: string, monto: number }> = [];
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ingresosLabels: { [key: string]: string } = {
    "RMS.C.ESFA": "Remuneración Mensual por Servicio en ESFA",
    "rural_cont": "Rural Continúa",
    "RMS_EES": "Remuneración Mensual por Servicio en EES",
    "RIMS_EES": "Remuneración por Incentivos en EES",
    "B_Ext_Tran_Vari": "Bonificación Extraordinaria de Transferencia Variable",
    "B_Ext_Tran_Fijo": "Bonificación Extraordinaria de Transferencia Fija",
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
    "Coop Capac Yupa": "Cooperativa Capac Yupa",
    "IPSSVIDA": "Descuento IPSS Vida",
    "Tardanzas": "Descuento por Tardanzas",
    "D.L. 25897 AFP": "Descuento AFP D.L. 25897",
    "pagindnoaf": "Pago Individual No Afiliado",
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private http: HttpClient
  ) {
    if (dialogData?.id) {
      localStorage.setItem('ultimoBoletaId', String(dialogData.id));

      this.http.get<any>(`${environment.apiUrl}/usuarios/${dialogData.id}`)
        .subscribe(resp => {
          this.data = resp;
          this.isLoading = false;

          // Parsear ingresos JSON
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

          // Parsear egresos JSON
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
        }, err => {
          this.isLoading = false;
          console.error('Error cargando detalle boleta:', err);
        });
    }
  }

  agregarADetalles() {
    if (!this.data) return;

    const boleta = {
      id: this.data.id,
      nombre: `${this.data.nombres} ${this.data.apePaterno} ${this.data.apeMaterno}`,
      periodo: this.data.periodoPago
    };

    let carrito: any[] = JSON.parse(localStorage.getItem('carritoBoletas') || '[]');
    if (!carrito.find(item => item.id === boleta.id)) {
      carrito.push(boleta);
      localStorage.setItem('carritoBoletas', JSON.stringify(carrito));
      window.dispatchEvent(new Event('carritoActualizado'));
    }
  }
}