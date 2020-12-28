const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const knexConfig = require('./config/db');
const controllers = require('./controllers');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Loaders and configs
Model.knex(knexConfig);
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}));
app.use(controllers); // Routers
app.use(express.static("public")); // Serve Static files

// 404 Handler
app.get("*", (_req,res) => {
    res.status(404).send("Page Not Found");
})

const server = app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`)
});

// export for mocha test
module.exports = server;