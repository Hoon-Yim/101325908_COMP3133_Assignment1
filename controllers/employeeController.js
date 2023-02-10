const AppError = require("../utils/AppError");
const Employee = require("../models/employeeModel");

exports.getAllEmployees = async () => {
    const employees = await Employee.find();

    return {
        message: "Successfully retreived all employees!",
        employees
    };
}

exports.createEmployee = async args => {
    let message = "";
    const newEmployee = await Employee.create({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        gender: args.gender,
        salary: args.salary
    }).catch(err => {
        if (err.code === 11000) { // duplicate field error
            const duplicateValue = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
            message = `Duplicate field value: ${duplicateValue}. Please use another value!`;
        } else if (err.name === "ValidationError") { 
            const errors = Object.values(err.errors).map(el => el.message);
            message = `Invalid input data. ${errors.join(". ")}`;
        }
    });

    // adding a message
    if (message !== "") {
        return new AppError(message);
    }

    return {
        message: "Successfully created!",
        employee: newEmployee
    }
}

exports.searchEmployeeById = async args => {
    
}