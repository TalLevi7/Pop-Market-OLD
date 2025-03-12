console.log("Starting server.js...");
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Import database connection
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Root Route (for testing)
app.get("/", (req, res) => {
    res.send("Pop Market API is running!");
});

// **📌 API Route to Fetch Catalog Data**
app.get("/api/catalog", (req, res) => {
    const sql = "SELECT * FROM pop_catalog";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching catalog:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
