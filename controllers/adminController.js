const User = require('../models/userModel');
const path = require('path')
exports.renderAdminLogin = (req, res) => {
    res.sendFile(path.join(__dirname, "../view/adminLogin.html"));
};

exports.handleAdminLogin = (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        return res.redirect("/admin/dashboard");
    } else {
        return res.redirect("/admin/login?error=Invalid credentials");
    }
};

exports.renderAdminPanel = (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }
    res.sendFile(path.join(__dirname, "../view/adminPanel.html"));
};

exports.handleAdminLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
exports.getAllUsers = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied");
    }
    const users = await User.find({}, "name email role");
    res.json(users);
};
exports.updateUserRole = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied");
    }

    const { userId, role } = req.body;
    if (role !== "customer" && role !== "admin") {
        return res.status(400).send("Invalid role");
    }
    await User.findByIdAndUpdate(userId, { role });
    res.send("User role updated successfully");
};
exports.deleteUser = async (req, res) => {
    if (!req.session.admin) {
        return res.status(403).send("Access denied. Only the admin can delete users.");
    }

    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.status(200).send(`User ${User.name} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user.");
    }
};

