// const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.signup = async args => {
    const newUser = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
    });

    console.log(newUser);

    return newUser;
};

exports.login = async args => {
    const user = await User.findOne({ username: args.username });
    if (!(user && await user.isPasswordCorrect(args.password, user.password))) {
        return new AppError("Username or Password is incorrect..");
    }

    // adding a message
    Object.assign(user, { message: "Successfully logged in!" })

    return user;
}