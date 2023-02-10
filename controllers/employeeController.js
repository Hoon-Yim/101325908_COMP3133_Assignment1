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

    message = "Successfully created!";
    return {
        message,
        employee: newEmployee
    }
}

exports.searchEmployeeById = async args => {
    let message = "";
    const employee = await Employee.findById(args.id).catch(err => {
        if (err.name === "CastError") {
            message = `Invalid ${err.path}: ${err.value}.`;
        }
    });

    if (message !== "") {
        return new AppError(message);
    }
    if (!employee) {
        return new AppError(`The employee with ID: ${args.id} was not found..`);
    }

    return {
        message: "Successfully found an employee!",
        employee
    }
}

exports.updateEmployeeById = async args => {
    let message = "";
    const employee =
        await Employee.findByIdAndUpdate(args.id, args, { new: true, runValidators: true })
            .catch(err => {
                if (err.name === "CastError") {
                    message = `Invalid ${err.path}: ${err.value}.`;
                } else if (err.code === 11000) { // duplicate field error
                    const duplicateValue = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
                    message = `Duplicate field value: ${duplicateValue}. Please use another value!`;
                } else if (err.name === "ValidationError") {
                    const errors = Object.values(err.errors).map(el => el.message);
                    message = `Invalid input data. ${errors.join(". ")}`;
                }
            });

    if (message !== "") {
        return new AppError(message);
    }
    if (!employee) {
        return new AppError(`The employee with ID: ${args.id} was not found..`);
    }
    
    return {
        message: "Successfully updated an employee",
        employee
    }
}

exports.deleteEmployeeById = async args => {
    let message = "";
    await Employee.findByIdAndRemove(args.id)
        .catch(err => {
            if (err.name === "CastError") {
                message = `Invalid ${err.path}: ${err.value}.`;
            }
        });

    if (message === "") {
        message = "Successfully Deleted!"
    }

    return message;
}