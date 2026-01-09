function toggleMobilePanel(){
  const panel = document.querySelector('.mobile-panel');
  const overlay = document.querySelector('.overlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('active');
}

document.getElementById("btnCerrarModal").onclick = () => {
  document.getElementById("tipoModal").style.display = "none";
  urlPendiente = null;
}

let urlPendiente = null;

document.addEventListener('DOMContentLoaded', () => {

  // Clonar menú sidebar a mobile
  const sidebarMenu = document.getElementById('sidebar-menu');
  const mobileMenu = document.getElementById('mobile-menu-content');
  if(sidebarMenu && mobileMenu) mobileMenu.innerHTML = sidebarMenu.innerHTML;

  // Accordion mobile
  mobileMenu.addEventListener('click', e => {
    const btn = e.target.closest('.menu-button');
    if(btn) btn.parentElement.classList.toggle('open');
  });

  // Interceptar links
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if(!a) return;
    if(a.href.includes("page=solicitud")){
      e.preventDefault();
      urlPendiente = a.href;
      document.getElementById("tipoModal").style.display = "flex";
    }
  });

  document.getElementById("btnPaciente").onclick = () => {
    if(urlPendiente) window.location.href = urlPendiente;
  };
  document.getElementById("btnProfesional").onclick = () => {
    if(urlPendiente){
      const url = new URL(urlPendiente);
      url.searchParams.set("page","profesional");
      window.location.href = url.toString();
    }
  };

});
