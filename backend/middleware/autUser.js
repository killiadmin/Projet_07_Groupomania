const jsonWebToken = require("jsonwebtoken")

async function AuthUser(req, res, next) {
    try {
    const headersToken = req.header("Authorization");
    const tokenJwt = headersToken.split(" ")[1];
    const decodedToken = jsonWebToken.verify(tokenJwt, process.env.PASSWORD_TOKEN);
    const userId = decodedToken.userId
    
    if (headersToken == null) {
        return res.status(403).send({ message: "Le token n'est pas valide" });
    }

    if (tokenJwt == null) {
        return res.status(403).send({ message: "Le token n'est pas valide"});
    }

    if (userId) {
        res.locals.decodedToken = decodedToken
        next();
    } else {
        throw "User Id n'est pas pas valable!";
    }
}
catch (err) {
    console.error(err);
    return res.status(403).send({ message: "L'authentification du token pose un probleme"});

}
};

module.exports = { AuthUser };
