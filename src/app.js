const express = require("express");

const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const routes = require("./routes");
const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);
app.use(getProfile);

app.use("/contracts", routes.contractRouter);
app.use("/jobs", routes.jobRouter);

module.exports = app;
