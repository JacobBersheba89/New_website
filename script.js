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

    // Funkce pro načtení a zobrazení GitHub grafu
    function renderGitHubActivityChart() {
        const username = "JacobBersheba89"; 
        const canvasId = "githubActivityChart";
        
        // Zkontrolujeme, jestli existuje prvek pro graf
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) {
            console.warn("Canvas pro graf nenalezen.");
            return;
        }

        const ctx = canvasElement.getContext("2d");

        fetch(`https://api.github.com/users/${username}/events`)
            .then(response => response.json())
            .then(data => {
                console.log("GitHub data:", data); // Logujeme data pro kontrolu

                const commitsPerDay = {};

                // Zpracování commitů
                data.forEach(event => {
                    if (event.type === "PushEvent") {
                        const date = event.created_at.split("T")[0]; // Jen datum (bez času)
                        commitsPerDay[date] = (commitsPerDay[date] || 0) + event.payload.commits.length;
                    }
                });

                console.log("Commits per day:", commitsPerDay); // Logujeme data pro jednotlivé dny

                // Seřazení dat podle data
                const labels = Object.keys(commitsPerDay).sort();
                const values = labels.map(date => commitsPerDay[date]);

                console.log("Labels (seřazené):", labels); // Logujeme labels
                console.log("Values:", values); // Logujeme values

                // Získání posledních 30 dní
                const last30Labels = labels.slice(-30); // Posledních 30 dní
                const last30Values = last30Labels.map(date => commitsPerDay[date]);

                console.log("Last 30 Labels:", last30Labels); // Logujeme posledních 30 dní
                console.log("Last 30 Values:", last30Values); // Logujeme hodnoty pro posledních 30 dní

                // Vytvoření grafu pomocí Chart.js
                new Chart(ctx, {
                    type: "bar", // Graf typu "bar" pro sloupce
                    data: {
                        labels: last30Labels,
                        datasets: [{
                            label: "Commits per Day",
                            data: last30Values,
                            backgroundColor: "#e2b85c", // Světle žlutá
                            borderColor: "#d4d2ca",     // Šedá barva pro okraje
                            borderWidth: 2,             // Tlustší okraje pro lepší viditelnost
                            hoverBackgroundColor: "#f2c94c", // Světlejší žlutá při najetí myší
                            hoverBorderColor: "#b5a36d",    // Tmavší okraje při najetí
                            hoverBorderWidth: 2         // Tlustší okraje při najetí
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            })
            .catch(error => console.error("Chyba při načítání dat:", error));
    }

    // Spustíme graf při prvním načtení stránky (pokud je relevantní sekce)
    renderGitHubActivityChart();
});
