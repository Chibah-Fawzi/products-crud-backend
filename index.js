const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const productController = require("./controller");

// Permet de recevoir un body d'une requête
app.use(bodyParser());

// Permet l'accés des autres applications vers cette api
app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.get("/products", (req, res) => productController.getProducts(req, res));

app.post("/products", (req, res) => productController.addProduct(req, res));

app.put("/products", (req, res) => {
  productController.editProduct(req, res);
});
app.delete("/products", (req, res) => {
  productController.deleteProduct(req, res);
});

app.get("/product/:id", (req, res) =>
  productController.getProductById(req, res)
);

app.listen(port, () =>
  console.log(`Products CRUD app listening on port ${port}!`)
);
