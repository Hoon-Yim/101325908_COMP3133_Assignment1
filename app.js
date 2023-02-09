const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const userController = require("./controllers/userController");

const rootValue = {
    signup: userController.signup,
    login: userController.login
}

const schema = buildSchema(`
    type Query {
        login(username: String!, password: String!): User
    },
    type Mutation {
        signup(username: String!, email: String!, password: String!): User
    },
    type User {
        message: String
        username: String
        email: String
        password: String
    },
    type Employee {
        message: String
        firstname: String
        lastname: String
        email: String
        gender: String
        salary: Float
    }
`);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");

// // Exception Handler for uncaught errors
// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server..`, 404));
// });
// // Global Exception Handler
// app.use(globalErrorHandler);

module.exports = app;