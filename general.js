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
