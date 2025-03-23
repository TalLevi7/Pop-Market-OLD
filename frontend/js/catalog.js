document.addEventListener("DOMContentLoaded", () => {
    fetchCatalog();
    setupFilters();
});

let catalogData = []; // Store fetched catalog data

function fetchCatalog() {
    fetch("http://localhost:5000/api/catalog")
        .then(response => response.json())
        .then(data => {
            catalogData = data;
            populateFilters(data);
            displayCatalog(data);
        })
        .catch(error => console.error("Error fetching catalog:", error));
}

function displayCatalog(filteredCatalog) {
    const catalogContainer = document.getElementById("catalog-container");
    catalogContainer.innerHTML = "";

    filteredCatalog.forEach(pop => {
        const popCard = document.createElement("div");
        popCard.classList.add("pop-card");
        // edit buttons to collect / sell
        popCard.innerHTML = `
            <img src="${pop.picture}" alt="${pop.pop_name}">
            <h3>${pop.pop_name}</h3>
            <h4>${pop.serial_number}</h3>
            <p><strong>Category:</strong> ${pop.category}</p>
            <p><strong>Sub-Category:</strong> ${pop.sub_category}</p>
            <a href="collection.html">Add to collection</a> <a href="market.html">Sell on market</a> 

        `;

        catalogContainer.appendChild(popCard);
    });
}

function setupFilters() {
    document.getElementById("searchInput").addEventListener("input", applyFilters);
    document.getElementById("categoryFilter").addEventListener("change", applyFilters);
    document.getElementById("subCategoryFilter").addEventListener("change", applyFilters);
}

function populateFilters(data) {
    const categories = new Set();
    const subCategories = new Set();

    data.forEach(pop => {
        categories.add(pop.category);
        subCategories.add(pop.sub_category);
    });

    populateDropdown("categoryFilter", categories);
    populateDropdown("subCategoryFilter", subCategories);
}

function populateDropdown(id, values) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = `<option value="">All</option>`;
    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });
}

function applyFilters() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;
    const selectedSubCategory = document.getElementById("subCategoryFilter").value;

    const filteredCatalog = catalogData.filter(pop => {
        return (
            pop.pop_name.toLowerCase().includes(searchText) &&
            (selectedCategory === "" || pop.category === selectedCategory) &&
            (selectedSubCategory === "" || pop.sub_category === selectedSubCategory)
        );
    });

    displayCatalog(filteredCatalog);
}
