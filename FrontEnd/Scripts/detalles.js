function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const id = getIdFromUrl();

if (id) {
    fetch(`http://localhost:8080/usuarios/${id}`)
        .then(res => res.json())
        .then(u => {
            // Identificación
            document.getElementById('datosIdentificacion').innerHTML = `
                <h4>Identificación</h4>
                <div><strong>Apellido Paterno:</strong> ${u.apePaterno ?? ""}</div>
                <div><strong>Apellido Materno:</strong> ${u.apeMaterno ?? ""}</div>
                <div><strong>Nombres:</strong> ${u.nombres ?? ""}</div>
                <div><strong>Tipo Documento:</strong> ${u.tipoDocumento ?? ""}</div>
                <div><strong>Nro. Documento:</strong> ${u.nroDocumento ?? ""}</div>
                <div><strong>Sexo:</strong> ${u.sexo ?? ""}</div>
                <div><strong>Fecha Nacimiento:</strong> ${u.fechaNacimiento ?? ""}</div>
            `;
            // Laborales
            document.getElementById('datosLaborales').innerHTML = `
                <h4>Laborales</h4>
                <div><strong>Cargo:</strong> ${u.cargo ?? ""}</div>
                <div><strong>Situación:</strong> ${u.situacion ?? ""}</div>
                <div><strong>Fecha Ingreso:</strong> ${u.fechaIngreso ?? ""}</div>
                <div><strong>Fecha Término:</strong> ${u.fechaTermino ?? ""}</div>
                <div><strong>Días Trabajados:</strong> ${u.diasTrabajados ?? ""}</div>
                <div><strong>Jornada Laboral:</strong> ${u.jornadaLaboral ?? ""}</div>
                <div><strong>Grupo Remunerativo:</strong> ${u.grupoRemunerativo ?? ""}</div>
                <div><strong>Tiempo Servicio:</strong> ${u.tiempoServicio ?? ""}</div>
                <div><strong>Tipo Servidor:</strong> ${u.tipoServidor ?? ""}</div>
                <div><strong>Nivel Magisterial:</strong> ${u.nivelMagisterial ?? ""}</div>
                <div><strong>Tipo Planilla:</strong> ${u.tPlanilla ?? ""}</div>
                <div><strong>Días Licencia:</strong> ${u.diasLicencia ?? ""}</div>
                <div><strong>Fecha Inicio Licencia:</strong> ${u.fecinilic ?? ""}</div>
            `;
            // Previsionales
            document.getElementById('datosPrevisionales').innerHTML = `
                <h4>Previsionales</h4>
                <div><strong>AFP:</strong> ${u.afp ?? ""}</div>
                <div><strong>CUSPP:</strong> ${u.cuspp ?? ""}</div>
                <div><strong>IPSS:</strong> ${u.ipss ?? ""}</div>
                <div><strong>Reg. Pensionario:</strong> ${u.regPensionario ?? ""}</div>
                <div><strong>Fecha Afiliación:</strong> ${u.fechaAfiliacion ?? ""}</div>
                <div><strong>Fecha Devengue:</strong> ${u.fechaDevengue ?? ""}</div>
            `;
            // Ubicación y establecimiento
            document.getElementById('datosUbicacion').innerHTML = `
                <h4>Ubicación / Establecimiento</h4>
                <div><strong>Código Modular:</strong> ${u.codigoModular ?? ""}</div>
                <div><strong>UGEL:</strong> ${u.ugel ?? ""}</div>
                <div><strong>Establecimiento:</strong> ${u.establecimiento ?? ""}</div>
                <div><strong>Nivel:</strong> ${u.nivel ?? ""}</div>
                <div><strong>Caract. Establecimiento:</strong> ${u.caractEstablecimiento ?? ""}</div>
                <div><strong>Código Establecimiento:</strong> ${u.codEstablecimiento ?? ""}</div>
                <div><strong>Unidad Costeo:</strong> ${u.unidCosteo ?? ""}</div>
                <div><strong>Código Comuna:</strong> ${u.codcomuna ?? ""}</div>
                <div><strong>Código Nexus:</strong> ${u.codNexus ?? ""}</div>
                <div><strong>AIRHSP:</strong> ${u.airhsp ?? ""}</div>
            `;
            // Otros
            document.getElementById('datosOtros').innerHTML = `
                <h4>Otros</h4>
                <div><strong>Periodo Pago:</strong> ${u.periodoPago ?? ""}</div>
                <div><strong>Doc. Referencia:</strong> ${u.docReferencia ?? ""}</div>
                <div><strong>Cargo/Orig:</strong> ${u.cargoOrig ?? ""}</div>
                <div><strong>Leyenda Permanente:</strong> ${u.leyendaPermanente ?? ""}</div>
                <div><strong>Modo Pago:</strong> ${u.modoPago ?? ""}</div>
                <div><strong>Cta Cte:</strong> ${u.ctaCte ?? ""}</div>
                <div><strong>Décimas:</strong> ${u.decimas ?? ""}</div>
                <div><strong>Reg. Laboral:</strong> ${u.regLaboral ?? ""}</div>
                <div><strong>Cad. Presupuestal:</strong> ${u.cadPresupuestal ?? ""}</div>
                <div><strong>Timpopen:</strong> ${u.timpopen ?? ""}</div>
                <div><strong>Tributable:</strong> ${u.tributable ?? ""}</div>
                <div><strong>Imponible:</strong> ${u.imponible ?? ""}</div>
                <div><strong>Total Remuneración:</strong> ${u.totalRemuneracion ?? ""}</div>
                <div><strong>Total Líquido:</strong> ${u.totalLiquido ?? ""}</div>
            `;

            // Ingresos
            const ingresosCampos = [
                ["RMS.C.ESFA", "rmsCesfa"], ["rural_cont", "ruralCont"], ["RMS_EES", "rmsEes"], ["RIMS_EES", "rimsEes"],
                ["B_Ext_Tran_Vari", "bExtTranVari"], ["B_Ext_Tran_Fijo", "bExtTranFijo"], ["asg_vra_30512", "asgVra30512"],
                ["asg_rural_30512", "asgRural30512"], ["Mont_Uni_Cons", "montUniCons"], ["RMS_30512", "rms30512"],
                ["A.carg_esp_LRM", "aCargEspLrm"], ["Rem.Transi.ESFA", "remTransiEsfa"], ["RIMS", "rims"],
                ["A.carg_dir_Ges_", "aCargDirGes"], ["Palmas MagMaes", "palmasMagMaes"], ["Jor_Trab.Ad_lrm", "jorTrabAdLrm"],
                ["A.carg_dir_LRM", "aCargDirLrm"], ["RIM_Ley 29944", "rimLey29944"], ["Ley29702", "ley29702"],
                ["DS065-2003-EF", "ds0652003Ef"], ["D.U.011-99", "du01199"], ["Reint Man No Af", "reintManNoAf"],
                ["Reintg. Manual", "reintgManual"], ["D.U.073-97", "du07397"], ["D.L. 26504", "dl26504"],
                ["DS011-93-ED", "ds01193Ed"], ["Dif Pensionable", "difPensionable"], ["DS261-91-EF IGV", "ds26191EfIgv"],
                ["Reunificada", "reunificada"], ["Bon. Especial", "bonEspecial"], ["aguinaldo", "aguinaldo"],
                ["CVid.DS154-91EF", "cvidDs15491Ef"], ["DSE 021-92-PCM", "dse02192Pcm"], ["DS. 019-94-PCM", "ds01994Pcm"],
                ["Bon. D.U. 90-96", "bonDu9096"], ["Refrig. y Mov.", "refrigMov"], ["D.U. 080-94", "du08094"],
                ["Asig. D.S.081", "asigDs081"], ["Asig.D.L. 25671", "asigDl25671"], ["Sueldo Base", "sueldoBase"],
                ["tributable", "tributable"], ["imponible", "imponible"], ["TotalRemuneración", "totalRemuneracion"], ["TotalLiquido", "totalLiquido"]
            ];
            const importantes = ["tributable", "imponible", "totalRemuneracion", "totalLiquido"];
            let tbodyIngresos = document.querySelector("#tablaIngresos tbody");
            tbodyIngresos.innerHTML = "";
            ingresosCampos.forEach(([nombre, key]) => {
                if (u[key] && u[key] > 0) {
                    const isImportant = importantes.includes(key);
                    tbodyIngresos.innerHTML += `<tr${isImportant ? ' class="important"' : ''}>
                        <td>${nombre}</td>
                        <td>${parseFloat(u[key]).toLocaleString("es-PE", {minimumFractionDigits:2})}</td>
                    </tr>`;
                }
            });

            // Egresos
            const egresosCampos = [
                ["DL19990 SNP", "dl19990Snp"], ["Dscto. Judicial", "dsctoJudicial"], ["Derr Magisteria", "derrMagisteria"],
                ["Coop Capac Yupa", "coopCapacYupa"], ["IPSSVIDA", "ipssvida"], ["Tardanzas", "tardanzas"],
                ["D.L. 25897 AFP", "dl25897Afp"], ["pagindnoaf", "pagindnoaf"], ["quintacat", "quintacat"],
                ["segrimac", "segrimac"], ["cmcusco", "cmcusco"], ["cmarequipa", "cmarequipa"], ["interbank", "interbank"],
                ["cmhuancayo", "cmhuancayo"], ["prderrmag", "prderrmag"], ["idg", "idg"], ["fentase", "fentase"],
                ["Inasistencias", "inasistencias"], ["AEHERME", "aeherme"], ["BRIPLEY", "bripley"], ["CRACCENTRO", "craccentro"],
                ["Bco.Pichincha", "bcoPichincha"], ["GPROEDUCAR", "gproeducar"], ["CONSTANTE", "constante"], ["SUBCAFAE", "subcafae"]
            ];
            let tbodyEgresos = document.querySelector("#tablaEgresos tbody");
            tbodyEgresos.innerHTML = "";
            egresosCampos.forEach(([nombre, key]) => {
                if (u[key] && u[key] > 0) {
                    tbodyEgresos.innerHTML += `<tr>
                        <td>${nombre}</td>
                        <td>${parseFloat(u[key]).toLocaleString("es-PE", {minimumFractionDigits:2})}</td>
                    </tr>`;
                }
            });

            // BOTÓN REGRESAR
            if (u.nroDocumento) {
                document.getElementById('btnRegresar').onclick = function() {
                    window.location.href = 'ver_actas.html?nroDocumento=' + encodeURIComponent(u.nroDocumento);
                };
            }
        });
} else {
    document.getElementById('datosIdentificacion').innerText = 'No se especificó usuario.';
}