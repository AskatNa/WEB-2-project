const axios = require("axios");

exports.getLocation = async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const response = await axios.get(geoUrl);

        if (!response.data.length) {
            return res.status(404).json({ error: "City not found" });
        }

        const location = response.data[0];

        res.json({
            city: location.name,
            lat: location.lat,
            lon: location.lon
        });

    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
