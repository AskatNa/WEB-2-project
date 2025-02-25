const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', isAuthenticated, getWeatherData);

module.exports = router;
