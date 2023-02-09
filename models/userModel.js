const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "A username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "An email is required"]
    },
    password: {
        type: String,
        required: [true, "A password is required"]
    }
});

userSchema.methods.isPasswordCorrect = async function(givenPassword, userPassword) {
    return givenPassword === userPassword;
}

module.exports = mongoose.model("User", userSchema);