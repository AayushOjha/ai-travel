require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

const { DatabaseConnectionString, Port } = require("./src/helpers/constants");
const authRouter = require("./src/routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT"],
  })
);

// Routes
app.use("/auth", authRouter);

mongoose
  .connect(DatabaseConnectionString)
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server listening on ${Port}`);
    });
  })
  .catch((err) => console.error(err));
