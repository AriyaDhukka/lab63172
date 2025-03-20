const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const projects = require("./projects.json"); // Import projects data

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Route to Fetch All Projects
app.get("/api/projects", (req, res) => {
    try {
        res.status(200).json(projects);
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ msg: "Internal Server Error." });
    }
});

// ✅ Weather API Route
app.get("/api/weather", async (req, res) => {
    try {
        const city = "Halifax,CA"; // Change if needed
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;

        // Fetch data from OpenWeatherMap
        let response = await fetch(weatherAPI);
        response = await response.json();

        if (response.cod !== 200) {
            return res.status(response.cod).json({ msg: response.message });
        }

        // Extract required fields
        const weatherData = {
            city: response.name,
            country: response.sys.country,
            temperature: {
                current: response.main.temp,
                feels_like: response.main.feels_like,
                min: response.main.temp_min,
                max: response.main.temp_max,
            },
            humidity: response.main.humidity
        };

        res.status(200).json(weatherData);
    } catch (err) {
        console.error("Weather API Error:", err);
        res.status(500).json({ msg: "Internal Server Error." });
    }
});

// ✅ 404 Handler
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found." });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
