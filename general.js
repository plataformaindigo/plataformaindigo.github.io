let urlPendiente = null;
let medicoSeleccionado = null;

function toggleMobilePanel() {
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.overlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('active');
}

// Construir URL dinámica
const URL_BASE = "https://script.google.com/macros/s/.../exec";
function construirUrl(medico, tipo) {
  return `${URL_BASE}?page=${tipo}&medico=${medico}`;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {

  // Render menú desktop y mobile
  const menuDesktop = document.getElementById('menuDesktop');
  const menuMobile = document.getElementById('mobile-menu-content');

  CLIENTE.MENU.forEach(item => {
    const div = document.createElement('div');
    div.className = "menu-item";
    div.innerHTML = `<div class="menu-button">${item.nombre}</div>
      <div class="dropdown">
        ${item.links.map(l => `<a href="#" data-medico="${l.medico}">${l.text}</a>`).join('')}
      </div>`;
    menuDesktop.appendChild(div);
    menuMobile.appendChild(div.cloneNode(true));
  });

  // Mobile accordion
  menuMobile.addEventListener('click', e => {
    const btn = e.target.closest('.menu-button');
    if (btn) btn.parentElement.classList.toggle('open');
  });

  // Interceptar click en links
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-medico]");
    if (!a) return;
    e.preventDefault();
    medicoSeleccionado = a.dataset.medico;
    urlPendiente = construirUrl(medicoSeleccionado, "solicitud");
    document.getElementById("tipoModal").style.display = "flex";
  });

  document.getElementById("btnCerrarModal").onclick = () => {
    document.getElementById("tipoModal").style.display = "none";
    urlPendiente = null;
    medicoSeleccionado = null;
  };

  document.getElementById("btnPaciente").onclick = () => {
    window.location.href = construirUrl(medicoSeleccionado, "solicitud");
  };

  document.getElementById("btnProfesional").onclick = () => {
    window.location.href = construirUrl(medicoSeleccionado, "profesional");
  };

  // Cargar datos del cliente
  document.getElementById("logoCliente").src = CLIENTE.logo;
  document.getElementById("nombreCliente").textContent = CLIENTE.nombre;
  document.getElementById("especialidadesCliente").textContent = CLIENTE.especialidades;
  document.getElementById("descripcionCliente").innerHTML = CLIENTE.descripcion;

});
