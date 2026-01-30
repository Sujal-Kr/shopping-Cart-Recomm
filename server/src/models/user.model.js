const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: [3, "Name must be at least 3 characters long"],
        max: [15, "Name must be at most 15 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,   
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: [6, "Password must be at least 6 characters long"],
        max: [12, "Password must be at most 12 characters long"],
    },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);