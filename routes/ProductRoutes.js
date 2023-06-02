// On importe le fichier du controller
const productController = require("../controllers/ProductController");

// On initialise une function router qui doit être appelé "init"

// Le paramétre router vient de la page index.js ou est appelé cette function
function init(router) {
  // On définis nos routes
  router.route("/products").get(productController.getProducts);
  router.route("/products").post(productController.addProduct);
  router.route("/products").put(productController.editProduct);
  router.route("/products").delete(productController.deleteProduct);
  router.route("/product/:id").get(productController.getProductById);
}

// On export notre function
module.exports.init = init;
