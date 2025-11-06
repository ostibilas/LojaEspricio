const express = require("express");
const app = express();
const {produtoRoutes} = require("../src/routes/produtoRoutes");
const PORT = 8081;

app.use(express.json());// configurando o midway para aceitar o json
app.use('/', produtoRoutes);


app.listen(PORT, () => {
    console.log(`Serviddor rodando em http://localhost:${PORT}`);
});
//teste