require("rootpath")();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const errorHandler = require("_middleware/error-handler");
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", require("./users/user.controller"));

// global error handler
app.use(errorHandler);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "dsimed",
});

module.exports = { app, port, db };
