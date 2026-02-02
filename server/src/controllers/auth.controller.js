const userModel = require("../models/user.model");
const _ = require("lodash");
const sendToken = require("../utils/utility");
const asyncHandler = require("../utils/asyncHandler");
const { options } = require("../constants/config");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/error");

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (_.isEmpty(email) || _.isEmpty(password)) {
            throw new ApiError("Please provide email and password", 400);
        }
        const user = await userModel.findOne({ email }).select("+password");
        if (_.isEmpty(user)) {
            throw new ApiError("User not found", 404);
        }

        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            throw new ApiError("Invalid credentials", 401);
        }

        await sendToken(user,200, res);
    } catch (err) {
        next(err);
    }
})


const signup = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password)) {
            throw new ApiError("Please provide name,email and password", 400);
        }
        const user = await userModel.findOne({ email });
        if (!_.isEmpty(user)) {
            throw new ApiError("User already exists", 400);
        }

        const newUser = await userModel.create({ name, email, password });

        sendToken(newUser,201, res);
    } catch (err) {
        next(err);
    }
})

const logout = asyncHandler(async (req, res, next) => {
    try {
        res.cookie("token", "", { ...options, maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "Logout successful",
        })
    } catch (err) {
        next(err);
    }
})

const profile = asyncHandler(async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user);
        res.status(200).json({
            success: true,
            message:"Profile fetched successfully",
            user,
        })
    } catch (err) {
        next(err);
    }
})


module.exports = { login, signup, logout, profile }