const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

router.get("/clientes", clienteController.listarClientes);
router.post("/clientes", clienteController.criarCliente);
router.put("/clientes/:idClientes", clienteController.atualizarCliente);
router.delete("/clientes/:idClientes", clienteController.deletarCliente);


module.exports = {clienteRoutes: router};


