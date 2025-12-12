const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
require('dotenv').config();


const {produtoRoutes} = require("./src/routes/produtoRoutes");
const {clienteRoutes} = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT;

app.use(express.json());// configurando o midleway para aceitar o json
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);
app.use(cookieParser())


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//teste