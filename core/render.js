/* =========================
   RENDER
========================= */

function renderFicha() {

    document.getElementById("nombreProfesional").innerText  = fichaProfesional.nombreProfesional;
    document.getElementById("nombreProfesional2").innerText = fichaProfesional.nombreProfesional;
    document.getElementById("nombreProfesional3").innerText = fichaProfesional.nombreProfesional;

    if (document.getElementById("nombreProfesional4")) {
        document.getElementById("nombreProfesional4").innerText = fichaProfesional.nombreProfesional;
    }

    document.getElementById("especialidad").innerText = fichaProfesional.especialidad;
    document.getElementById("descripcion").innerText  = fichaProfesional.descripcion;
    document.getElementById("matricula").innerText    = fichaProfesional.matricula;
    document.getElementById("ciudad").innerText       = fichaProfesional.ciudad;

    if (document.getElementById("fotoPerfil")) {
        document.getElementById("fotoPerfil").src = fichaProfesional.fotoPerfil;
    }

    /* LOGIN – PRESTACIONES */
    const loginPrestaciones = document.getElementById("loginPrestaciones");
    if (loginPrestaciones && fichaProfesional.prestaciones) {
        loginPrestaciones.innerHTML =
            '<option value="" selected disabled>PRÁCTICAS</option>';
        fichaProfesional.prestaciones.forEach(p => {
            const option = document.createElement("option");
            option.value =
                `${fichaProfesional.masterPrivateURL}?page=profesional&medico=${p.medico}`;
            option.textContent = p.nombre;
            loginPrestaciones.appendChild(option);
        });
    }

    /* LOGIN – TRÁMITES */
    const loginTramites = document.getElementById("loginTramites");
    if (loginTramites && fichaProfesional.tramites) {
        loginTramites.innerHTML =
            '<option value="" selected disabled>TRÁMITES</option>';
        fichaProfesional.tramites.forEach(t => {
            const option = document.createElement("option");
            option.value =
                `${fichaProfesional.masterPrivateURL}?page=profesional&medico=${t.medico}`;
            option.textContent = t.nombre;
            loginTramites.appendChild(option);
        });
    }

    /* CONSULTORIOS */
    const contenedorConsultorios = document.getElementById("listaConsultorios");
    if (contenedorConsultorios && fichaProfesional.consultorios) {
        contenedorConsultorios.innerHTML = "";
        fichaProfesional.consultorios.forEach((c, index) => {
            const icono = index === 0
                ? '<i class="fas fa-door-open"></i>'
                : '<i class="fas fa-hospital"></i>';
            const div = document.createElement("div");
            div.className = "grid-item";
            div.innerHTML = `
                <div class="clinic-info">
                    ${icono}
                    <span>${c.nombre}</span>
                </div>
                <a class="btn-wa" href="${c.telefono}">
                    <i class="fab fa-whatsapp"></i> Solicitar Turno
                </a>`;
            contenedorConsultorios.appendChild(div);
        });
    }

    /* SOLICITUDES – PRESTACIONES */
    const contenedorPrestaciones = document.getElementById("listaPrestaciones");
    if (contenedorPrestaciones && fichaProfesional.prestaciones) {
        contenedorPrestaciones.innerHTML = "";
        fichaProfesional.prestaciones.forEach(p => {
            const div = document.createElement("div");
            div.className = "grid-item";
            div.innerHTML = `
                <div class="clinic-info">
                    <i class="fas fa-file-medical"></i>
                    <span>${p.nombre}</span>
                </div>
                <a class="btn-inf"
                   href="${fichaProfesional.masterPublicURL}?page=solicitud&medico=${p.medico}">
                    <i class="fas fa-arrow-right"></i> Continuar
                </a>`;
            contenedorPrestaciones.appendChild(div);
        });
    }

    /* SOLICITUDES – TRÁMITES */
    const contenedorTramites = document.getElementById("listaTramites");
    if (contenedorTramites && fichaProfesional.tramites) {
        contenedorTramites.innerHTML = "";
        fichaProfesional.tramites.forEach(t => {
            const div = document.createElement("div");
            div.className = "grid-item";
            div.innerHTML = `
                <div class="clinic-info">
                    <i class="fas fa-file-medical"></i>
                    <span>${t.nombre}</span>
                </div>
                <a class="btn-inf btn-tramite"
                   href="${fichaProfesional.masterPublicURL}?page=solicitud&medico=${t.medico}">
                    <i class="fas fa-file-alt"></i> Continuar
                </a>`;
            contenedorTramites.appendChild(div);
        });
    }
}

document.addEventListener("DOMContentLoaded", renderFicha);
