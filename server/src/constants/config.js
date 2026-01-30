const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const options = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24
}

module.exports = { PORT, MONGO_URI, SECRET_KEY, OPEN_AI_KEY, options };