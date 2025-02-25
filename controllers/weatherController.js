const axios = require('axios');

const getWeatherData = async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        const data = response.data;

        const { lat, lon } = data.coord;
        const countryCode = data.sys.country;

        const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const airQualityResponse = await axios.get(airQualityUrl);
        const airQualityIndex = airQualityResponse.data.list[0].main.aqi;

        const countryFlagUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
        const countryFlagResponse = await axios.get(countryFlagUrl);
        const flagUrl = countryFlagResponse.data[0].flags.svg;

        const weatherInfo = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            coordinates: { lat, lon },
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            country: countryCode,
            flag: flagUrl,
            air_quality_index: airQualityIndex
        };

        res.json(weatherInfo);
    } catch (error) {
        console.error("Weather API error:", error.response?.data || error.message);
        res.status(500).json({ error: 'Could not fetch weather data. Please check the city name and try again.' });
    }
};

module.exports = { getWeatherData };
