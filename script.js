// Funkce pro změnu barvy pozadí
function changeColor(color) {
    document.body.style.backgroundColor = color;
}

// Funkce pro zobrazení/skrývání odpovědí v FAQ
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    if (answer.style.display === "none") {
        answer.style.display = "block";
    } else {
        answer.style.display = "none";
    }
}
