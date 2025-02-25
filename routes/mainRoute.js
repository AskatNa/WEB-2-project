const path = require('path');
const express = require('express')
const {isAuthenticated} = require("../middlewares/authMiddleware");
const router = express.Router()

const publicPath = path.join(__dirname, '../public');
router.use(express.static(publicPath));

router.get('/', isAuthenticated,(req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));

});
router.get('/session-info', (req, res) => {
    res.json({ user: req.session.user || null });
});

module.exports = router;
