const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/UserRoutes");

// Permet de recevoir un body d'une requête
app.use(bodyParser());

// Permet l'accés des autres applications vers cette api
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// On ajoute la méthode app.use afin d'initialiser les chemins à '/' : tout les chemins qu'on va ajouter débuteront par '/'
app.use("/", router);

// On initalise les routes
productRoutes.init(router);
userRoutes.init(router);

app.listen(port, () =>
  console.log(`Products CRUD app listening on port ${port}!`)
);
