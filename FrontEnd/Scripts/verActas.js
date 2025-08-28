    // Obtener nroDocumento desde la URL
    const params = new URLSearchParams(window.location.search);
    const nroDocumento = params.get("nroDocumento");

    if (nroDocumento) {
      fetch(`http://localhost:8080/usuarios/detalles?nroDocumento=${nroDocumento}`)
        .then(response => response.json())
        .then(data => {
          if (data.length === 0) {
            document.getElementById("resultado").innerHTML =
              `<div class="alert alert-warning">No se encontraron actas para el documento <b>${nroDocumento}</b>.</div>`;
            return;
          }

          let html = `
            <table class="table table-striped table-bordered shadow">
              <thead class="table-dark">
                <tr>
                  <th>Periodo de Pago</th>
                  <th>Código Modular</th>
                  <th>Total Remuneración</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
          `;

          data.forEach(item => {
            html += `
              <tr>
                <td>${item.periodoPago}</td>
                <td>${item.codigoModular}</td>
                <td>S/. ${item.totalRemuneracion.toFixed(2)}</td>
                <td>
                  <button class="btn btn-primary btn-sm"
                          onclick="window.location.href='detalles.html?id=${item.id}'">
                    Ver Detalle
                  </button>
                </td>
              </tr>
            `;
          });

          html += "</tbody></table>";
          document.getElementById("resultado").innerHTML = html;
        })
        .catch(error => {
          document.getElementById("resultado").innerHTML =
            `<div class="alert alert-danger">Error al obtener datos.</div>`;
          console.error(error);
        });
    } else {
      document.getElementById("resultado").innerHTML =
        `<div class="alert alert-info">No se proporcionó un <b>nroDocumento</b> en la URL.</div>`;
    }