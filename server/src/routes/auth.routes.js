const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
    res.send("Register");
});

module.exports = authRouter;