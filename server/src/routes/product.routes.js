const express = require("express");
const protectRoute = require("../middleware/auth");

const { createProduct, createBulkProducts } = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter.use(protectRoute)
productRouter.post("/", createProduct);
productRouter.post("/bulk", createBulkProducts); //one time use

module.exports = productRouter;