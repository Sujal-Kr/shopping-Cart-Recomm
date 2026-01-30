const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const cartRouter = require("./cart.routes");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

module.exports = router;