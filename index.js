const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const bodyParser = require("body-parser");

const productController = require("./controller");

app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("<h1 style='color:red'>Hello World!</h1>");
});

app.get("/products", (req, res) => productController.getProducts(req, res));

app.post("/products", (req, res) => productController.addProduct(req, res));

app.get("/products/:id", (req, res) =>
  productController.getProductById(req, res)
);

app.listen(port, () =>
  console.log(`Products CRUD app listening on port ${port}!`)
);
