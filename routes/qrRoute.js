const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { generateQR } = require("../controllers/qrController");
const path = require("path");

router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../view/qr.html"));
});

router.get("/generate-qr", isAuthenticated, generateQR);

module.exports = router;
