const express = require("express");

const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const contractRouter = require("./routes/contractRouter");
const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);
app.use(getProfile);

app.use("/contracts", contractRouter);

module.exports = app;
