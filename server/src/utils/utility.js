const { options, SECRET_KEY } = require("../constants/config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.cookie("token", token, options);

    const userData = user.toObject();
    _.unset(userData, "password");
    return res.status(statusCode).json({
        success: true,
        token,
        user: userData,
        message: `Welcome ${user.name}`,
    });
};

module.exports = sendToken;