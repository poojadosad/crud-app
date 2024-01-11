const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/crud-app";
const app = express();

mongoose.connect(url);

const con = mongoose.connection;

// when connection is opened
con.on("open", () => {
  console.log("connected...");
});
