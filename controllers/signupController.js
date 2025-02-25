
const User = require('../models/userModel');
const express = require('express')
const bcrypt = require('bcrypt');
const path = require('path');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const renderSignupPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/signup.html'));
};

const handleSignup = async (req, res) => {
    try {
        console.log("Signup request:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).send("All fields are required.");
        if (password.length < 8) return res.status(400).send("Password must be at least 8 characters long.");

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.redirect('/signup?error=User already exists.');

        const newUser = await User.create({
            username: name,
            email,
            password: password.trim(),
            role: "customer"});

        console.log("User registered:", newUser._id);
        return res.redirect('/login');
    } catch (error) {
        alert("Error has occured")
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

const handleLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
module.exports = { renderSignupPage, handleSignup, handleLogout };
