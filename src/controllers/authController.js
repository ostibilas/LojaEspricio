const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {clienteModel} = require("../model/clienteModel");
//const { default: Message } = require("tedious/lib/message");
const authController ={
    clienteLogin: async (req,res) => {
        try {
            const {emailCliente, cpfCliente, senhaCliente} = req.body;
            
            if ((emailCliente == undefined && cpfCliente==undefined) || senhaCliente ==undefined) {
                return res.status(400).json ({error: "Email ou Cpf e senha são Obrigatorios"});
            }
            const result = await clienteModel.buscarEmailOrCPF(cpfCliente,emailCliente);

            if(result.length == 0){
                return res.status(401).json ({error: "Email ou CPF não encontrados!"})
            }
            const cliente = result[0];
            const senhaValida = await bcrypt.compare(senhaCliente,cliente.senhaCliente);

            if(!senhaValida){//se for falsa
                 return res.status(401).json ({error: "Senha Invalida"});
            }

            const payload = {
                IdCliente: cliente.IdCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "cliente"
            }

            const token = jwt.sign(payload,process.env.JWP_SECRET,{expiresIn:process.env.JWP_EXPIRES_IN});

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: Number(process.env.JWP_TIME_EXPIRES)

        });

        res.status(200).json({Message:"Login realizado com sucesso!",token});
        

        } catch (error) {
            console.error("Erro no login do cliente",error);
            return res.status(500).json({erro:"Erro Interno no servidor ao realizar o login do Cliente"});
        }


    }


};


module.exports = { authController};