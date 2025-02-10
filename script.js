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

    
    function renderGitHubActivityChart() {
        const username = "JacobBersheba89"; 
        const canvasId = "githubActivityChart";
        
        // Zkontrolujeme, jestli existuje prvek pro graf
        if (!document.getElementById(canvasId)) {
            console.warn("Canvas pro graf nenalezen.");
            return;
        }

        const ctx = document.getElementById(canvasId).getContext("2d");

        fetch(`https://api.github.com/users/${username}/events`)
            .then(response => response.json())
            .then(data => {
                const commitsPerDay = {};

                data.forEach(event => {
                    if (event.type === "PushEvent") {
                        const date = event.created_at.split("T")[0]; // Jen datum (bez času)
                        commitsPerDay[date] = (commitsPerDay[date] || 0) + event.payload.commits.length;
                    }
                });

                const labels = Object.keys(commitsPerDay).sort();
                const values = labels.map(date => commitsPerDay[date]);

                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Commits per Day",
                            data: values,
                            backgroundColor: "#e2b85c",
                            borderColor: "#d4d2ca",
                            borderWidth: 1
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
