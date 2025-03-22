document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("http://localhost:8000/signup_process.php", { /* TESTING fetch on a local server*/
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let messageDiv = document.getElementById("signup-message");
        messageDiv.textContent = data.message;
        messageDiv.style.color = data.status === "success" ? "green" : "red";
        
        if (data.status === "success") {
            setTimeout(() => window.location.href = "login.html", 2000);
        }
    })
    .catch(error => console.error("Error:", error));
});
