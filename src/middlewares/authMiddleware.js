const jwt = require("jsonwebtoken");

const verify = {
    cliente: async (req, res, next) => {

        try {

            const { token } = req.cookies;


            const decoded = jwt.verify(token, process.env.JWP_SECRET);
            console.log(decoded);

            if (decoded.tipoUsuario || decoded.tipoUsuario !== "cliente") {
                return res.status(403).json({ error: "Acesso permitido somente para Clientes" });

            }

            next();

        } catch (error) {
            return res.status(401).json({ error: "Token invalido ou expirado" });


        }
    }

}

module.exports = { verify }