const getRecommendations = require("../services/recommendation.service");
const asyncHandler = require("../utils/asyncHandler");

const recommendProducts = asyncHandler(async (req, res) => {
    try {
        const user = req.body;

        const recommendations = await getRecommendations(user);

        res.json({
            success: true,
            count: recommendations.length,
            data: recommendations,
        });
    } catch (err) {
        next(err);
    }
})

module.exports = recommendProducts;
