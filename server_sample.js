const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const coursesData = [
    {
        id: 1,
        title: "The complete node.js developer course",
        author: "andrew mead, rob percival",
        description: "learn node.js by building real-world applications",
        topic: "node.js",
        url: "https:// codingthesmartway.com/courses/nodejs/"
    }, 
    {
        id: 2,
        title: "node.js, express & mongodb dev to deployment",
        author: "brad traversy",
        description: "learn by example building & deploying real-world",
        topic: "node.js",
        url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
    },
    {
        id: 3,
        title: "javascript: understanding the weird parts",
        author: "anthony alicea",
        description: "an advanced javascript course for everyone!",
        topic: "javascript",
        url: "https://codingthesmartway.com/courses/understand-javascript/"
    }
]

const rootValue = {
    hello: () => "Hello World",
    course: args => {
        const courseId = args.id;
        return coursesData.filter(course => {
            return course.id == courseId;
        })[0]
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(8000, () => {
  console.log('Now listening on port 8000...');
});