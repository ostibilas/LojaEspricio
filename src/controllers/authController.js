const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {clienteModel} = require("../model/clienteModel");
const authController ={
    clienteLogin: async (req,res) => {
        try {
            const {emailCliente, cpfCliente, senhaCliente} = req.body;
            
            if ((emailCliente == undefined && cpfCliente==undefined) || senhaCliente ==undefined) {
                return res.status(400).json ({error: "Email ou Cpf e senha são Obrigatorios"});
            }
            
        } catch (error) {
            
        }


    }


};


module.exports = { authController};