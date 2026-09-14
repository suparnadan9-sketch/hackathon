const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const PORT = process.env.PORT || 3000;

// Supabase connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Bhorosha Backend is Running!");
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Bhorosha API is working"
    });
});

// Get all disaster reports
app.get("/api/reports", async (req, res) => {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
});

// Add a disaster report
app.post("/api/reports", async (req, res) => {

    const {
        type,
        description,
        latitude,
        longitude,
        severity
    } = req.body;

    const { data, error } = await supabase
        .from("reports")
        .insert([
            {
                type,
                description,
                latitude,
                longitude,
                severity,
                status: "ACTIVE"
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json({
        message: "Disaster report submitted successfully",
        report: data[0]
    });
});
app.post("/api/sos", async (req, res) => {

    const {
        latitude,
        longitude
    } = req.body;

    const { data, error } = await supabase
        .from("sos_alerts")
        .insert([
            {
                latitude,
                longitude,
                status: "ACTIVE"
            }
        ])
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.status(201).json({
        message: "SOS alert activated successfully",
        sos: data[0]
    });
});

app.listen(PORT, () => {
    console.log(`Bhorosha server running on port ${PORT}`);
});
