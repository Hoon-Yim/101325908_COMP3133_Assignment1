const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app`);
const mongoose = require("mongoose");

// DB Connection
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose.set('strictQuery', true); // for suppressing the deprecation warning
mongoose.connect(DB).then(() => {
    console.log("DB has been successfully connected");
});

// Request listening
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}..`);
});