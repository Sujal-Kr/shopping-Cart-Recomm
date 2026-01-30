const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Slow down! Too many requests 🚦"
        });
    }
});

module.exports = globalLimiter;

