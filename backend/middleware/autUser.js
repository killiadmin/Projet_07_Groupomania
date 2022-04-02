const jsonWebToken = require("jsonwebtoken");

/**
 * Cette fonction va nous permettre d'authentifier l'utilisateur avec 'jsonwebtoken', une fois l'utilisateur vérifier,
 * il pourra se crée un compte, se connecter et accéder au contenu du réseau.
 */

async function AuthUser(req, res, next) {
    try {
    const headersToken = req.header("Authorization");
    const token = headersToken.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.PASSWORD_TOKEN);
    const userId = decodedToken.userId;
    
    if (headersToken == null) {
        return res.status(403).send({ message: "Le token n'est pas valide!" });
    };

    if (token == null) {
        return res.status(403).send({ message: "Le token n'est pas valide!"});
    };

    if (userId) {
        res.locals.decodedToken = decodedToken
        next();
    } else {
        throw "La vérification de l'id de l'utilisateur pose un problème!";
    };
}
catch (err) {
    console.error(err);
    return res.status(401).send({ message: "L'authentification du token pose un probleme"});

};
};

module.exports = { AuthUser };
