const express = require("express");
const router = express.Router();
const path = require('path')
const { calculateBMI } = require("../controllers/bmiController");
const {isAuthenticated} = require("../middlewares/authMiddleware");
router.get("/bmi", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../view/bmi.html"));
});
router.post("/bmi", isAuthenticated,calculateBMI);

module.exports = router;
