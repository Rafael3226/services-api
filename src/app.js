const express = require("express");

const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getProfile } = require("./middleware/getProfile");
const routes = require("./routes");
const { errorHandle } = require("./middleware/errorHandle");
const app = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use(getProfile);

app.use("/contracts", routes.contractRouter);
app.use("/jobs", routes.jobRouter);
app.use("/balances", routes.balanceRouter);
app.use("/admin", routes.adminRouter);

app.use(errorHandle);

module.exports = app;
