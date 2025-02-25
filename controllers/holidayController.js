const axios = require('axios');
require('dotenv').config();

exports.getHolidays = async (req, res) => {
    const { country, year, month, day } = req.query;

    if (!country || !year || !month || !day) {
        return res.status(400).json({ error: "Missing required query parameters." });
    }

    const API_KEY = process.env.HOLIDAY_API_KEY;
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    const url = `https://holidays.abstractapi.com/v1/?api_key=${API_KEY}&country=${country}&year=${year}&month=${formattedMonth}&day=${formattedDay}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || "Server error" });
    }
};
