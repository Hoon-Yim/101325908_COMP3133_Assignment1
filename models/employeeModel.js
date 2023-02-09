const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "A firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "A lastname is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "An email is required"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    salary: {
        type: Number,
        required: [true, "A Salary is required"]
    }
});

module.exports = mongoose.model("Employee", employeeSchema);