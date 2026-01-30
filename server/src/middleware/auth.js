const { SECRET_KEY } = require("../constants/config");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/error");
const asyncHandler = require("../utils/asyncHandler");

const protectRoute = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new ApiError("Unauthorized", 401);
        }
        const decodedToken = jwt.verify(token, SECRET_KEY)
        req.user = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = protectRoute;