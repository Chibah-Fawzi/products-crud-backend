// On importe le fichier du controller
const verifyToken = require("../middleware/verifyToken");
const userController = require("../controllers/UserController");

// On initialise une function router qui doit être appelé "init"

// Le paramétre router vient de la page index.js ou est appelé cette function
function init(router) {
  // On définis nos routes

  // On ajoute le middleware afin d'empêcher les users non connecté d'accéder à ce route
  router.route("/users").get(verifyToken, userController.getUsers);
  router.route("/register").post(userController.addUser);
  router.route("/login").post(userController.Login);
}

// On export notre function
module.exports.init = init;
