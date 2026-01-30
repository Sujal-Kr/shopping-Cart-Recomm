const { options, SECRET_KEY } = require("../constants/config");

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.cookie("token", token, options);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

module.exports = sendToken;