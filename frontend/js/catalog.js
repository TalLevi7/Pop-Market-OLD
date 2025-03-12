document.addEventListener("DOMContentLoaded", () => {
    fetchCatalog();
});

function fetchCatalog() {
    fetch("http://localhost:5000/api/catalog")
        .then(response => response.json())
        .then(data => displayCatalog(data))
        .catch(error => console.error("Error fetching catalog:", error));
}

function displayCatalog(catalog) {
    const catalogContainer = document.getElementById("catalog-container");
    catalogContainer.innerHTML = ""; // Clear previous content

    catalog.forEach(pop => {
        const popCard = document.createElement("div");
        popCard.classList.add("pop-card");

        popCard.innerHTML = `
            <img src="${pop.picture}" alt="${pop.pop_name}">
            <h3>${pop.pop_name}</h3>
            <p><strong>Category:</strong> ${pop.category}</p>
            <p><strong>Sub-Category:</strong> ${pop.sub_category}</p>
        `;

        catalogContainer.appendChild(popCard);
    });
}
