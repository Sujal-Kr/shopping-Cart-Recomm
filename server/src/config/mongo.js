const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants/config");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;