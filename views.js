<script>
/* =========================
   VIEWS – INDIGO
========================= */

function showView(id) {
    document.querySelectorAll(".view").forEach(v =>
        v.classList.remove("active")
    );

    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active");
    }
}
</script>
