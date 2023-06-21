const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "dsimed",
});

module.exports = { app, port, db };
