const axios = require("axios");

exports.getAirQuality = async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "Latitude and longitude are required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.AIR_POLLUTION_API_KEY}`
        );

        console.log("Air Quality Response:", response.data); // Debugging line
        res.json({ data: response.data });
    } catch (error) {
        console.error("Air Quality API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch air quality data" });
    }
};
