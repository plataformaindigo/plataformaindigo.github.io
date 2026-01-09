// Manejo panel especialidades
function toggleSpecialtyPanel() {
  const panel = document.getElementById('specialtyPanel');
  const overlay = document.getElementById('overlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('active');
}

// Construir menú dinámicamente
function construirMenu() {
  const sidebar = document.getElementById('sidebar-menu');
  sidebar.innerHTML = "";
  CLIENTE.menu.forEach(seccion => {
    const div = document.createElement('div');
    div.className = "menu-item";
    const btn = document.createElement('div');
    btn.className = "menu-button";
    btn.textContent = seccion.nombre;
    div.appendChild(btn);

    const dropdown = document.createElement('div');
    dropdown.className = "dropdown";

    seccion.links.forEach(link => {
      const a = document.createElement('a');
      a.href = `${CLIENTE.baseURL}?page=solicitud&medico=${link.id}`;
      a.textContent = link.text;
      dropdown.appendChild(a);
    });

    div.appendChild(dropdown);
    sidebar.appendChild(div);

    // Acordeón
    btn.addEventListener('click', () => div.classList.toggle('open'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  construirMenu();

  // Datos del cliente
  document.getElementById('logo').src = CLIENTE.logo;
  document.getElementById('nombreCliente').innerHTML = CLIENTE.nombre;
  document.getElementById('especialidadesCliente').innerHTML = CLIENTE.especialidades;
  document.getElementById('descripcionCliente').innerHTML = CLIENTE.descripcion;
});



let urlPendiente = null;

// Función para abrir modal con URL pendiente
function abrirModal(url) {
  urlPendiente = url;
  document.getElementById("tipoModal").style.display = "flex";
}

// Cerrar modal
document.getElementById("btnCerrarModal").onclick = () => {
  document.getElementById("tipoModal").style.display = "none";
  urlPendiente = null;
};

// Botones dentro del modal
document.getElementById("btnSolicitar").onclick = () => {
  if (!urlPendiente) return;
  const url = new URL(urlPendiente);
  url.searchParams.set("page", "solicitud");
  window.location.href = url.toString();
};

document.getElementById("btnEmitir").onclick = () => {
  if (!urlPendiente) return;
  const url = new URL(urlPendiente);
  url.searchParams.set("page", "profesional");
  window.location.href = url.toString();
};

document.getElementById("btnEnviarPaciente").onclick = () => {
  if (!urlPendiente) return;
  // Por ahora solo registramos la URL que se enviaría
  alert("Botón ENVIAR PACIENTE activado.\nURL pendiente: " + urlPendiente);
};

// Interceptar clicks en links de solicitud
document.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  if (a.href.includes("page=solicitud")) {
    e.preventDefault();
    abrirModal(a.href);
  }
});

// Abrir mini-modal al tocar "Enviar enlace a paciente"
document.getElementById("btnEnviarPaciente").onclick = () => {
  if (!urlPendiente) return;
  document.getElementById("tipoModal").style.display = "none"; // cerramos modal principal
  document.getElementById("modalEnviarPaciente").style.display = "flex";
  document.getElementById("inputWhatsapp").value = ""; // limpiar input
};

// Cerrar mini-modal
document.getElementById("btnCerrarEnviarPaciente").onclick = () => {
  document.getElementById("modalEnviarPaciente").style.display = "none";
};

// Botón enviar WhatsApp
document.getElementById("btnEnviarWA").onclick = () => {
  const numero = document.getElementById("inputWhatsapp").value.trim();
  if (!numero.match(/^\d+$/)) {
    alert("Ingrese un número válido (solo dígitos).");
    return;
  }
  const waURL = `https://wa.me/${numero}?text=Por%20favor,%20complete%20el%20formulario%20del%20informe%20médico:%20${encodeURIComponent(urlPendiente)}`;
  window.open(waURL, "_blank");
  document.getElementById("modalEnviarPaciente").style.display = "none";
};

// Setear logo en mobile
document.addEventListener('DOMContentLoaded', () => {
  const mobileLogo = document.getElementById("mobileLogo");
  if(mobileLogo) mobileLogo.src = CLIENTE.logo;
});

