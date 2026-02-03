const express = require("express");
const protectRoute = require("../middleware/auth");

const { createProduct, createBulkProducts, getAllProducts, getProductById } = require("../controllers/product.controller");
const { objectIdSchema } = require("../schema/_id");
const validator = require("../middleware/validator");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", validator(objectIdSchema, "params"), getProductById);
productRouter.use(protectRoute)
productRouter.post("/", createProduct);
productRouter.post("/bulk", createBulkProducts); //one time use

module.exports = productRouter;