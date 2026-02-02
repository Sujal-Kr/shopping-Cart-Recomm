const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const options = {
    maxAge: 1000 * 24 * 60 * 60 * 2,
    secure: true,
    httpOnly: true,
    // sameSite:"none"
}

const corsOptions={
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}

module.exports = { PORT, MONGO_URI, SECRET_KEY, OPEN_AI_KEY, options,corsOptions };