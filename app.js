// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const utils = require("util");
const fs = require("fs");
const authRoute = require("./route/authRoute");
const wasteRoute = require("./route/wasteRoute");
const errorController = require("./controller/errorController");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", authRoute);
app.use("/waste", wasteRoute);
app.use(errorController);

const port = process.env.PORT || 8000;
console.log(process.env.PORT);
app.listen(port, () => console.log(`server running on port ${port}`));
