const ProductModel = require("./model");

async function getProducts(req, res) {
  let result = await ProductModel.find();
  res.json(result);
}

async function getProductById(req, res) {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(500).json({
      success: false,
      error: "ID Must be a number",
    });
  } else {
    let allResults = await ProductModel.find();
    let result = await ProductModel.find({ id: id });
    if (id > allResults.length) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    } else {
      res.json({
        success: true,
        products: result,
      });
    }
  }
}

async function addProduct(req, res) {
  let product = req.body;

  let result = await ProductModel.create(product);

  res.json({
    success: true,
    msg: "Vous avez bien ajouté un produit",
    produitAjouté: result,
  });
}
const productController = {
  getProducts: getProducts,
  getProductById: getProductById,
  addProduct: addProduct,
};

module.exports = productController;
