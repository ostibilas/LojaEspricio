const { produtoModel } = require("../model/produtoModel");

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
    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.buscarTodos();
            res.status(200).json(produtos);

        } catch (error) {
            console.log('erro ao listar produtos', error);
            res.status(500).json({ error: 'Erro ao listar produtos' });

        }
    },
    /**
   * Controlador que cria um novo produto no banco de dados.
   * 
   * @async
   * @function criarProduto
   * @param {Object} req - Obejto de requisição (recebido por HTTP)
   * @param {Object} res - Obejto de RESPOSTA (recebido por HTTP)
   * @returns {Promise<void>} não retorna nada, apenas executa a inserção
   * @throws {400} Se algum campo obrigatorio não for adicionado
   * @throws {500} Se ocorrer qualquer erro interno no servidor.
   */
    criarProduto: async (req, res) => {
        try {

            let { nomeProduto, precoProduto } = req.body;

            if ( nomeProduto == undefined || precoProduto == undefined  || nomeProduto.trim() == "" || isNaN(precoProduto) ) {
                return res.status(400).json({ error: "Campos Obrigatorios não preencidos" });

            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            res.status(201).json({ message: "Produto cadastrado com sucesso!" });


        } catch (error) {
            console.log('erro ao listar produtos', error);
            res.status(500).json({ error: 'Erro ao Cadastrar produtos' });

        }
    }




}

module.exports = { produtoController };