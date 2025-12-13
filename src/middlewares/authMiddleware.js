const jwt = require ("jsonwebtoken");

const verify = {
    cliente: async (req,res,next) => {
        
        try {
            console.log(req);
           const {token} = req.cookie;


          const decoded = jwt.verify(token,process.env.JWP_SECRET);
            
        if(decoded.tipoUsuario || decoded.tipoUsuario !=="cliente"){
             return res.status(403).json({error:"Acesso permitido somente para Clientes"});

           }

            next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({error:"Token invalido ou expirado"});

            
        }
    }

}

module.exports = {verify}