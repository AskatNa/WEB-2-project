const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/contactController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { generateQR } = require('../controllers/qrController');

const path = require("path");

router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../view/contacts.html"));
});

router.post("/", isAuthenticated, sendEmail);

// router.get("/", isAuthenticated, (req,res) =>{
//     res.sendFile(path.join(__dirname, "../view/qr.html"))
// })
// router.get("/generate-qr", isAuthenticated, generateQR)
module.exports = router;
