const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "A username is required"]
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Given email is in wrong format"],
        required: [true, "An email is required"]
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "A password is required"]
    }
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    // Encrypting password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.isPasswordCorrect = async function(givenPassword, userPassword) {
    return await bcrypt.compare(givenPassword, userPassword);
}

module.exports = mongoose.model("User", userSchema);