const express = require("express");
const cartRouter = express.Router();
const validator = require("../middleware/validator");
const { cartSchema,updateCartSchema,removeFromCartSchema } = require("../schema/cart");
const { addToCart, getCart, updateCart, removeFromCart, clearCart } = require("../controllers/cart.controller");
const protectRoute = require("../middleware/auth");

cartRouter.use(protectRoute);
cartRouter.post("/", validator(cartSchema), addToCart);
cartRouter.get("/", getCart);
cartRouter.patch("/", validator(updateCartSchema), updateCart);
cartRouter.delete("/", validator(removeFromCartSchema), removeFromCart);
cartRouter.delete("/clear", clearCart);

module.exports = cartRouter;