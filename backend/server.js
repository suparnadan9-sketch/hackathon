const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bhorosha backend is running!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Bhorosha API is working"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
