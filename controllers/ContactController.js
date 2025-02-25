const nodemailer = require('nodemailer')
const sendEmail = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: Please log in first." });
    }
    const { name, subject, message, recipientEmail } = req.body;
    const senderEmail =  req.session.user.email;

    if (!name || !message || !subject || !recipientEmail) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        replyTo: senderEmail,
        subject: `New Message from ${name}: ${subject}`,
        text: `From: ${name}\nEmail: ${senderEmail}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error: error.toString() });
    }
};

module.exports = { sendEmail };