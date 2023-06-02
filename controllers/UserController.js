const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUsers(req, res) {
  let result = await UserModel.find();
  res.json(result);
}
async function addUser(req, res) {
  // On récupére les informations du user
  let user = req.body;

  // On check si l'email du user existe déja dans la bdd
  let findEmail = await UserModel.findOne({
    email: user.email,
  });

  // Si l'email existe retourne une erreur
  if (findEmail) {
    res.status(500).json({
      success: false,
      msg: `Cet email existe déja!`,
    });
  } else {
    // On hash le mot de passe de l'utilisateur
    bcrypt.hash(user.password, 10, async function (err, hash) {
      // Si il y'as une erreur dans le hash l'afficher
      if (err) console.log(err);

      // Si i y'as pas d'errreur, remplace moi le mdp du user par le nouveau mdp hashé
      user.password = hash;

      // Crée moi un user avec les nouvelles infos
      let result = await UserModel.create(user);
      res.json({
        success: true,
        msg: "Vous avez bien ajouté votre compte",
        utilisateurAjouté: result,
      });
    });
  }
}

async function Login(req, res) {
  let user = req.body;

  // On trouve l'user qui posséde l'email entré pas l'utilisateur
  let foundUser = await UserModel.findOne({
    email: user.email,
  });

  // On check si on a trouvé l'user ou bien on décrypte le mot de passe dans la bdd et on le compare avec celui entré par l'user
  if (!foundUser || !bcrypt.compareSync(user.password, foundUser.password)) {
    res.status(404).json({
      success: false,
      msg: `Erreur dans les identifients!`,
    });
  } else {
    // Une information sur le user
    const payload = {
      email: user.email,
    };

    // On génére un token à l'aide du payload et de la clé secréte
    var token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      // On définie une durée de vie du token
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      success: true,

      // On retourne le token en réponse pour qu'il soit ajouté dans les cookies au front end
      token: token,
      msg: `Bienvenue ${foundUser.full_name}, Vous êtes connecté!`,
    });
  }
}

const userController = {
  getUsers: getUsers,
  addUser: addUser,
  Login: Login,
};

module.exports = userController;
