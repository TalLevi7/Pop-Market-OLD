document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/latest_market")
        .then(response => response.json()) 
        .then(data => {
            console.log("Fetched data:", data);
            const marketContainer = document.getElementById("latest-market-container");

            if (!marketContainer) {
                console.error("Element with ID 'latest-market-container' not found!");
                return;
            }

            // Clear previous content
            marketContainer.innerHTML = "";

            // Loop through market items and display them
            data.forEach(item => {
                const div = document.createElement("div");
                div.className = "market-item";
                div.innerHTML = `
                    <img src="${item.picture}" alt="${item.pop_name}" class="pop-image">
                    <h3>${item.pop_name}</h3>
                    <p>Price: $${item.price}</p>
                `;
                marketContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Error fetching latest market items:", error));
});
