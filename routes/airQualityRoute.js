const express = require("express");
const { getAirQuality } = require("../controllers/airQualityController");
const {isAuthenticated} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/air_quality", isAuthenticated, getAirQuality);

module.exports = router;
