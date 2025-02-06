document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");
    const content = document.getElementById("dynamic-content");
    
    links.forEach(link => {
        link.addEventListener("click", function(event) {
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
                })
                .catch(error => console.error("Chyba při načítání obsahu:", error));
        });
    });
});
