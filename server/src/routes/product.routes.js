const express = require("express");
const cartRouter = express.Router();

cartRouter.post("/add", (req, res) => {
    res.send("Add to cart");
});

module.exports = cartRouter;