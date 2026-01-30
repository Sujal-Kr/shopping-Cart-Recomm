const productModel = require("../models/product.model");
const cosineSimilarity = require("../utils/cosineSimilarity");
const { getUserEmbedding } = require("../services/embedding.service");

const getRecommendations = async (user) => {
    const userEmbedding = await getUserEmbedding(user);

    const products = await productModel.find({ inStock: true });

    const scoredProducts = products.map((product) => {
        const score = cosineSimilarity(
            userEmbedding,
            product.embedding
        );

        return {
            product,
            score,
        };
    });

    return scoredProducts
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((item) => item.product);
}

module.exports = getRecommendations;
