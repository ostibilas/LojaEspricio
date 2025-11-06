const {produtoModel} = require("../model/produtoModel");

const produtoController = {
    /**
     * controlador que lista todos os produtos do banco de dados
     * @async
     * @function listarProdutos
     * @param {object} req Objeto da quisicao (recebido por http)
     * @param {object} res Objeto da resposta (recebido por http)
     * @returns {Promise<void>} retorna com a lista de produtos
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os produtos
     *
     */
    listarProdutos: async(req,res) =>{
        try {
           const produtos = await produtoModel.buscarTodos();
           res.status(200).json(produtos);
            
        } catch (error) {
            console.log('erro ao listar produtos',error);
            res.status(500).json({error: 'Erro ao listar produtos'});

        }
    }


}

module.exports = {produtoController};