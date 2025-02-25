const express = require('express');
const router = express.Router();
const path = require('path')
const { getHolidays } = require('../controllers/holidayController');
const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'../view/holiday.html'));
});

router.get('/holidays', isAuthenticated, getHolidays);

module.exports = router;