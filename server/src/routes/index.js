const express = require("express");
const router = express.Router();

const authRouter = require("./auth.routes");
const productRouter = require("./product.routes");
const cartRouter = require("./cart.routes");
const recommendRouter = require("./recommend.routes");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/recommend", recommendRouter);

module.exports = router;