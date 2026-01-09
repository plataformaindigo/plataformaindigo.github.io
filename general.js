let urlPendiente = null;

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('overlay');
  const btnToggle = document.getElementById('btnToggleSidebar');

  btnToggle.onclick = () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  };

  overlay.onclick = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  };

  // Modal usuario
  const tipoModal = document.getElementById('tipoModal');
  const btnCerrarModal = document.getElementById('btnCerrarModal');
  const btnPaciente = document.getElementById('btnPaciente');
  const btnProfesional = document.getElementById('btnProfesional');

  btnCerrarModal.onclick = () => {
    tipoModal.style.display = "none";
    urlPendiente = null;
  };

  btnPaciente.onclick = () => {
    if(urlPendiente) window.location.href = urlPendiente + "&page=solicitud";
  };

  btnProfesional.onclick = () => {
    if(urlPendiente){
      const url = new URL(urlPendiente);
      url.searchParams.set("page", "profesional");
      window.location.href = url.toString();
    }
  };

  // Interceptar links de solicitud
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if(!a) return;
    if(a.href.includes("page=solicitud") || a.href.includes("page=profesional")){
      e.preventDefault();
      urlPendiente = a.href;
      tipoModal.style.display = "flex";
    }
  });
});
