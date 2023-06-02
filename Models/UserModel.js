const mongoose = require("mongoose");
var db = require("../db");

const Schema = db.Schema;

var userSchema = Schema({
  full_name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
