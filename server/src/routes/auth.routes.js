const express = require("express");
const authRouter = express.Router();
const { login, signup, logout, profile } = require("../controllers/auth.controller");
const protectRoute = require("../middleware/auth");

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/logout", logout);

authRouter.use(protectRoute);
authRouter.get("/me", profile);

module.exports = authRouter;