const express = require("express");
const {  getLocation} = require("../controllers/locationController");
const {isAuthenticated} = require("../middlewares/authMiddleware");
const path = require("path");

const router = express.Router();
router.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,'../public/map.html'));
});

router.get("/", getLocation);

module.exports = router;
