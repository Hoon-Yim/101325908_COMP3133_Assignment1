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

employeeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

employeeSchema.set('toObject', { virtuals: true });
employeeSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Employee", employeeSchema);