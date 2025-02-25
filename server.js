require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRoute = require('./routes/authRoute');
const weatherRoute = require('./routes/weatherRoute');
const mainRoute = require('./routes/mainRoute')
const adminRoute = require('./routes/adminRoute')
const connectDB = require('./configs/dbConnection')
const airQualityRoute = require("./routes/airQualityRoute");
const newsRoute = require("./routes/newsRoute");
const bmiRoute = require("./routes/bmiRoute");
const contactRoute = require('./routes/contactRoute')
const blogRoute = require("./routes/blogRoute");
const app = express();
const holidayRoute = require('./routes/holidayRoute');
const locationRoutes = require("./routes/locationRoute");



app.use(express.json());
app.use(express.static('public'))
app.use(express.static('view'))
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

connectDB()
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/", mainRoute);
app.use("/", authRoute);
app.use("/admin", adminRoute);
app.use("/weather", weatherRoute)
app.use(airQualityRoute);
app.use(newsRoute);
app.use("/", bmiRoute);
app.use("/contact",contactRoute)
app.use("/blogs", blogRoute);
app.use("/holiday", holidayRoute);
app.use("/location", locationRoutes);
app.use("/qr", require("./routes/qrRoute"))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
