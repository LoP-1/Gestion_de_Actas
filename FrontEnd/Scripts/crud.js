const API_URL = "http://localhost:8080/crud";

function cargarTabla() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#tablaActas tbody');
            tbody.innerHTML = '';
            data.forEach(acta => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${acta.id ?? ''}</td>
                    <td>${acta.nombres ?? ''}</td>
                    <td>${acta.apePaterno ?? ''}</td>
                    <td>${acta.apeMaterno ?? ''}</td>
                    <td>${acta.nroDocumento ?? ''}</td>
                    <td>${acta.cargo ?? ''}</td>
                    <td>${acta.periodoPago ?? ''}</td>
                    <td class="actions">
                        <button onclick="editarRegistro(${acta.id})">Editar</button>
                        <button onclick="eliminarRegistro(${acta.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

document.getElementById('nuevoBtn').addEventListener('click', function() {
    abrirModal('Nuevo registro');
});

function abrirModal(titulo, data = null) {
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalCrud').style.display = 'flex';
    const form = document.getElementById('formActasPersonal');
    form.reset();
    document.getElementById('mensaje').innerHTML = '';
    form.id.value = '';
    if (data) {
        Object.keys(data).forEach(k => {
            if (form[k]) {
                form[k].value = data[k] ?? '';
            }
        });
    }
}

function cerrarModal() {
    document.getElementById('modalCrud').style.display = 'none';
}

window.cerrarModal = cerrarModal; // Para el botón de cancelar

function editarRegistro(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(acta => {
            abrirModal('Editar registro', acta);
        });
}

document.getElementById('formActasPersonal').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const datos = {
        periodoPago: form.periodoPago.value,
        fechaIngreso: form.fechaIngreso.value || null,
        fechaTermino: form.fechaTermino.value || null,
        docReferencia: form.docReferencia.value,
        codigoModular: form.codigoModular.value,
        airhsp: form.airhsp.value,
        cargo: form.cargo.value,
        apePaterno: form.apePaterno.value,
        apeMaterno: form.apeMaterno.value,
        nombres: form.nombres.value,
        situacion: form.situacion.value,
        diasLicencia: form.diasLicencia.value ? parseInt(form.diasLicencia.value) : null,
        fecinilic: form.fecinilic.value || null,
        tPlanilla: form.tPlanilla.value,
        fechaNacimiento: form.fechaNacimiento.value || null,
        sexo: form.sexo.value,
        tipoDocumento: form.tipoDocumento.value,
        nroDocumento: form.nroDocumento.value,
        ipss: form.ipss.value,
        regPensionario: form.regPensionario.value,
        codNexus: form.codNexus.value,
        afp: form.afp.value,
        cuspp: form.cuspp.value,
        fechaAfiliacion: form.fechaAfiliacion.value || null,
        fechaDevengue: form.fechaDevengue.value || null,
        ugel: form.ugel.value,
        codEstablecimiento: form.codEstablecimiento.value,
        establecimiento: form.establecimiento.value,
        nivel: form.nivel.value,
        caractEstablecimiento: form.caractEstablecimiento.value ? parseInt(form.caractEstablecimiento.value) : null,
        unidCosteo: form.unidCosteo.value,
        cargoOrig: form.cargoOrig.value,
        leyendaPermanente: form.leyendaPermanente.value,
        modoPago: form.modoPago.value,
        ctaCte: form.ctaCte.value,
        diasTrabajados: form.diasTrabajados.value ? parseInt(form.diasTrabajados.value) : null,
        decimas: form.decimas.value ? parseInt(form.decimas.value) : null,
        regLaboral: form.regLaboral.value,
        tipoServidor: form.tipoServidor.value,
        nivelMagisterial: form.nivelMagisterial.value,
        codcomuna: form.codcomuna.value,
        grupoRemunerativo: form.grupoRemunerativo.value,
        jornadaLaboral: form.jornadaLaboral.value,
        tiempoServicio: form.tiempoServicio.value,
        cadPresupuestal: form.cadPresupuestal.value,
        timpopen: form.timpopen.value
    };

    const id = form.id.value;
    let metodo = "POST";
    let url = API_URL;
    if (id) {
        metodo = "PUT";
        url = `${API_URL}/${id}`;
    }

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (res.ok) {
            document.getElementById('mensaje').innerHTML = '<span class="success">¡Registro guardado correctamente!</span>';
            cargarTabla();
            setTimeout(cerrarModal, 1200);
        } else {
            res.text().then(txt => {
                document.getElementById('mensaje').innerHTML = `<span class="error">Error: ${txt}</span>`;
            });
        }
    })
    .catch(err => {
        document.getElementById('mensaje').innerHTML = `<span class="error">Error: ${err}</span>`;
    });
});

function eliminarRegistro(id) {
    if (confirm('¿Seguro que deseas eliminar este registro?')) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => cargarTabla());
    }
}

// Inicial
cargarTabla();

let registros = [];

function cargarTabla() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            registros = data;
            renderizarTabla();
        });
}

function renderizarTabla(filtro = "") {
    const tbody = document.querySelector('#tablaActas tbody');
    tbody.innerHTML = '';
    let datosFiltrados = registros;
    if (filtro) {
        const f = filtro.trim().toLowerCase();
        datosFiltrados = registros.filter(acta =>
            (acta.nombres ?? '').toLowerCase().includes(f) ||
            (acta.apePaterno ?? '').toLowerCase().includes(f) ||
            (acta.apeMaterno ?? '').toLowerCase().includes(f) ||
            (acta.nroDocumento ?? '').toLowerCase().includes(f)
        );
    }
    datosFiltrados.forEach(acta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${acta.id ?? ''}</td>
            <td>${acta.nombres ?? ''}</td>
            <td>${acta.apePaterno ?? ''}</td>
            <td>${acta.apeMaterno ?? ''}</td>
            <td>${acta.nroDocumento ?? ''}</td>
            <td>${acta.cargo ?? ''}</td>
            <td>${acta.periodoPago ?? ''}</td>
            <td class="actions">
                <button onclick="editarRegistro(${acta.id})">Editar</button>
                <button onclick="eliminarRegistro(${acta.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('buscador').addEventListener('input', function() {
    renderizarTabla(this.value);
});