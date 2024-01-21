const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = "mongodb://localhost:27017/crud-app";
const app = express();

mongoose.connect(url);

const con = mongoose.connection;

// when connection is opened
con.on("open", () => {
  console.log("connected...");
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const studentRouter = require("./routes/students");
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(9000, () => {
  console.log("Server started");
});
