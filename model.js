const mongoose = require("mongoose");
var db = require("./db");

const Schema = db.Schema;

var productSchema = Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);
