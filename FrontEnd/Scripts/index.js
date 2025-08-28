        let resumenUsuarios = [];
        let currentFiltro = "";
        let currentPage = 1;
        const pageSize = 50;

        // Fetch resumen usuarios
        fetch('http://localhost:8080/usuarios/resumen')
            .then(res => res.json())
            .then(data => {
                resumenUsuarios = data;
                renderTablaResumen();
            });

        // Renderizar tabla
        function renderTablaResumen(filtro = "") {
            currentFiltro = filtro;
            const tbody = document.querySelector("#tablaResumen tbody");
            tbody.innerHTML = "";

            let filtrados = resumenUsuarios.filter(u =>
                (u.codigoModular ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.apePaterno ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.apeMaterno ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.nombres ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.tipoDocumento ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.nroDocumento ?? "").toLowerCase().includes(filtro.toLowerCase()) ||
                (u.cargoOrig ?? "").toLowerCase().includes(filtro.toLowerCase())
            );

            // Paginación
            const totalPages = Math.ceil(filtrados.length / pageSize);
            if (currentPage > totalPages) currentPage = 1;
            const startIdx = (currentPage - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const pagina = filtrados.slice(startIdx, endIdx);

            pagina.forEach(u => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${u.codigoModular ?? ""}</td>
                    <td>${u.apePaterno ?? ""}</td>
                    <td>${u.apeMaterno ?? ""}</td>
                    <td>${u.nombres ?? ""}</td>
                    <td>${u.tipoDocumento ?? ""}</td>
                    <td>${u.nroDocumento ?? ""}</td>
                    <td>${u.cargoOrig ?? ""}</td>
                    <td>${u.cantidad ?? ""}</td>
                    <td>
                        <button onclick="verActasUsuario('${encodeURIComponent(u.nroDocumento ?? "")}')">Ver Actas</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            renderPaginador(totalPages);
        }

        // Función para ver actas del usuario por nroDocumento
        function verActasUsuario(nroDocumento) {
            window.location.href = `ver_actas.html?nroDocumento=${nroDocumento}`;
        }

        // Renderiza los botones de paginación
        function renderPaginador(totalPages) {
            const paginador = document.getElementById("paginador");
            paginador.innerHTML = "";

            if (totalPages <= 1) return;

            // Botón anterior
            paginador.innerHTML += `<button ${currentPage === 1 ? "disabled" : ""} onclick="cambiarPagina(currentPage-1)">«</button>`;

            // Números de página (máx 7 visibles, centrados en la actual)
            let start = Math.max(1, currentPage - 3);
            let end = Math.min(totalPages, currentPage + 3);

            if (currentPage <= 4) { start = 1; end = Math.min(totalPages, 7); }
            if (currentPage > totalPages - 4) { start = Math.max(1, totalPages - 6); end = totalPages; }

            for (let i = start; i <= end; i++) {
                paginador.innerHTML += `<button ${i === currentPage ? "class='active'" : ""} onclick="cambiarPagina(${i})">${i}</button>`;
            }

            // Botón siguiente
            paginador.innerHTML += `<button ${currentPage === totalPages ? "disabled" : ""} onclick="cambiarPagina(currentPage+1)">»</button>`;
        }

        // Cambia la página y re-renderiza
        function cambiarPagina(page) {
            currentPage = page;
            renderTablaResumen(currentFiltro);
        }

        // Filtro por buscador
        document.getElementById("buscador").addEventListener("input", function () {
            currentPage = 1;
            renderTablaResumen(this.value);
        });

        // Hace global la función para los botones
        window.cambiarPagina = cambiarPagina;