// const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.signup = async args => {
    const newUser = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
    });

    return newUser;
};