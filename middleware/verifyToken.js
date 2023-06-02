const jwt = require("jsonwebtoken");

// MIDDLEWARE pour verifier si un utilisateur est connecté
const verifyToken = (req, res, next) => {
  // On récupére le token du body, ou bien de la query ou bien du headers
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // On check si le token existe
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // On check si le token est juste, et on le laisse sinon on lui demande de se connecter
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Veuillez vous connectez pour acceder à ce route",
    });
  }
  return next();
};

module.exports = verifyToken;
