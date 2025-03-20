import React from "react";

const Home = () => {
    const [weather, setWeather] = useState(null); // State for weather data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/weather") // Ensure the API URL is correct
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                return res.json();
            })
            .then((data) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching weather:", err);
                setError("Failed to load weather data.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Welcome to My Portfolio</h1>
            <p>Hi, I'm Ariya Moez Dhukka, a Computer Science student passionate about technology and problem-solving.</p>

            {/* Show loading spinner or error message */}
            {loading && <p>Loading weather data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Display Weather Data with Robust Checks */}
            {weather && (
                <div className="weather-card p-3 border rounded mt-3">
                    <h2>
                        Weather in {weather.city || "Unknown City"}, {weather.country || "Unknown Country"}
                    </h2>
                    <p><strong>Temperature:</strong> {weather.temperature?.current ?? "N/A"}°C</p>
                    <p><strong>Feels Like:</strong> {weather.temperature?.feels_like ?? "N/A"}°C</p>
                    <p><strong>Min:</strong> {weather.temperature?.min ?? "N/A"}°C | <strong>Max:</strong> {weather.temperature?.max ?? "N/A"}°C</p>
                    <p><strong>Humidity:</strong> {weather.humidity ?? "N/A"}%</p>
                    <p><strong>Wind Direction:</strong> {weather.wind?.direction ?? "N/A"}°</p>
                </div>
            )}
        </div>
    );
};

export default Home;
