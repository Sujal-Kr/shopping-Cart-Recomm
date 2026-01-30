const openai = require("../config/openAi");

const generateEmbedding = async (text) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return response.data[0].embedding;
};


const getUserEmbedding = async (user) => {
    const text = `
    Interests: ${user.interests.join(", ")}
    Budget: ${user.budget}
    Viewed products: ${user.viewedProducts.join(", ")}
    `;

    return await generateEmbedding(text);
}

module.exports = { generateEmbedding, getUserEmbedding };