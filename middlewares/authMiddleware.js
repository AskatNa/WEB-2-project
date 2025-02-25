const {renderLoginPage} = require("../controllers/loginController");
exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        //return res.status(401).json({ error: 'Unauthorized access' });
        return res.redirect("/login")
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admins only' });
    }
    next();
};
