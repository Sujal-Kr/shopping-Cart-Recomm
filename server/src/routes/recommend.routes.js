const express = require("express");
const recommendProducts = require("../controllers/recommend.controller");

const router = express.Router();

router.post("/", recommendProducts);

module.exports = router;
