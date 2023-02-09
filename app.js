const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const userController = require("./controllers/userController");

const rootValue = {
    signup: userController.signup
}

/*
const rootValue = {
    hello: () => "Hello World",
    course: args => {
        const courseId = args.id;
        return coursesData.filter(course => {
            return course.id == courseId;
        })[0]
    }
};
*/ 
const schema = buildSchema(`
    type Mutation {
        signup(username: String!, email: String!, password: String!): User
    }
    type User {
        _id: Int
        username: String
        email: String
        password: String
    }
    type Employee {
        _id: Int
        firstname: String
        lastname: String
        email String
        gender: String
        salary: Number
    }
`);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Exception Handler for uncaught errors
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server..`, 404));
});
// Global Exception Handler
app.use(globalErrorHandler);

module.exports = app;