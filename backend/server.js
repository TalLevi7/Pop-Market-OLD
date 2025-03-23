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

// Fetch 3 latest in market for index.html
app.get("/api/latest_market", (req, res) => {
    const sql = `
        SELECT m.*, p.pop_name, p.picture 
        FROM market m 
        JOIN pop_catalog p ON m.pop_id = p.pop_id 
        WHERE m.status = 'active' 
        ORDER BY m.market_id DESC 
        LIMIT 3
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database query error:", err);
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

