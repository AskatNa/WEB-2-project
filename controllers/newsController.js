const axios = require("axios");


exports.getNews = async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWSAPI_API_KEY}`
        );

        res.json({ articles: response.data.articles });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news data" });
    }
};
