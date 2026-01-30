const { Configuration, OpenAIApi } = require("openai");
const { OPEN_AI_KEY } = require("../constants/config");

const configuration = new Configuration({
    apiKey: OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;