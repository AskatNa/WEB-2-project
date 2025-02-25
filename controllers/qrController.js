const qr = require('qr-image');

const generateQR = (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ message: "Text is required to generate a QR code." });
    }

    try {
        const qrCodeImage = qr.image(text, { type: 'png' });
        res.setHeader('Content-Type', 'image/png');
        qrCodeImage.pipe(res);
    } catch (error) {
        console.error("QR Code Generation Error:", error);
        res.status(500).json({ message: "Failed to generate QR code" });
    }
};

module.exports = { generateQR };
