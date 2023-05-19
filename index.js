const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");

app.get("/", (req, res) => {
  res.send("<h1 style='color:red'>Hello World!</h1>");
});

let products = {
  title: "colar",
  price: 400,
};
app.get("/hafid", (req, res) => {
  res.send(products);
});

app.listen(port, () =>
  console.log(`Products CRUD app listening on port ${port}!`)
);
