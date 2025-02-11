const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
canvas.style.background = 'rgba(10, 10, 10, 0)';

document.body.style.overflow = 'hidden';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const maxPoints = 200;
let x = 0;
let y = canvas.height / 2;

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        if (i === 0) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(p.x, p.y);
        }
    }
    ctx.stroke();

    // Přidání kuličky na špičku
    if (points.length > 0) {
        let lastPoint = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#e2b85c';
        ctx.fill();
    }
}

function updateGraph() {
    x += 5;
    y += (Math.random() - 0.5) * 20;
    if (y < 0) y = 0;
    if (y > canvas.height) y = canvas.height;
    
    points.push({ x, y });
    if (points.length > maxPoints) {
        points.shift();
    }
    
    for (let i = 0; i < points.length; i++) {
        points[i].x -= 5;
    }
    drawGraph();
}

setInterval(updateGraph, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function () {
    // Dynamické načítání obsahu stránek
    const links = document.querySelectorAll("nav ul li a");
    const content = document.getElementById("dynamic-content");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const section = this.getAttribute("href").replace("#", "");

            console.log(`Kliknuto na: ${section}`);

            const url = `${section}.html`;
            console.log(`Zkouším načíst: ${url}`);

            fetch(url)
                .then(response => {
                    console.log(`Odpověď serveru: ${response.status}`);
                    if (!response.ok) {
                        throw new Error(`Chyba: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(`Úspěšně načteno: ${url}`);
                    content.innerHTML = data;
                    if (section === "aboutme") {
                        renderGitHubActivityChart();
                    }
                })
                .catch(error => console.error("Chyba při načítání obsahu:", error));
        });
    });

    // Spustíme graf při prvním načtení stránky (pokud je relevantní sekce)
    renderGitHubActivityChart();
});
