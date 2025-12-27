document.addEventListener('DOMContentLoaded', () => {
    /* =========================
       DARK MODE
    ========================= */
    const toggle = document.getElementById('toggleDarkMode');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    /* =========================
       SCROLL REVEAL
    ========================= */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 120; // kdy se má objevit
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // spustí se i hned po načtení

    /* =========================
       WhatsApp bar animace
    ========================= */
    const whatsappBar = document.querySelector('.whatsapp-bar');
    if(whatsappBar){
        setTimeout(() => {
            whatsappBar.classList.add('show');
        }, 500); // po 0,5s se vysune
    }
});
