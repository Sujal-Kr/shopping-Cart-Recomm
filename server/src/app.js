const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./constants/config");
const connectDB = require("./config/mongo");
const handleApiError = require("./middleware/error");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const globalLimiter = require("./middleware/limit");
const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(globalLimiter);

app.use("/api/v1", routes);

app.use(handleApiError);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;