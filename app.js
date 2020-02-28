const express = require("express");
const app = express();
const api = require("./api/v1/index");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const connection = mongoose.connection;

app.set("port", process.env.port || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use("/api/v1", api); //localhost:3000/api/v1

app.use((req, res) => {
  const err = { msg: "Bad request" };
  err.status = 404;
  res.json({ err });
});

mongoose.connect("mongodb://localhost:27017/caddy", { useNewUrlParser: true });

connection.on("error", err => {
  console.error(`Connection to mongodb failed ${err.message}`);
});

connection.once("open", () => {
  console.log("Connected to mongodb");
});

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
