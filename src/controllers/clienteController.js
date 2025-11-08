const { clienteModel } = require("../model/clienteModel");

const clienteController = {
    /**
     * controlador que lista todos os Clientes do banco de dados
     * @async
     * @function listarClientes
     * @param {object} req Objeto da quisicao (recebido por http)
     * @param {object} res Objeto da resposta (recebido por http)
     * @returns {Promise<void>} retorna com a lista de clientes
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os clientes
     *
     */
    listarClientes: async (req, res) => {
        try {
            const {idCliente} = req.query;
            if(idCliente){
                if(idCliente.length != 36){
                    return res.status(400).json({erro: "Id do Cliente invalido"});
                }
                const cliente = await clienteModel.buscarUm(idCliente);
                return res.status(200).json(idCliente);
            }
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);

        } catch (error) {
            console.log('erro ao listar clientes', error);
            res.status(500).json({error: 'Erro ao listar clientes'});

        }
    },
    /**
   * Controlador que cria um novo cliente no banco de dados.
   * 
   * @async
   * @function criarCliente
   * @param {Object} req - Obejto de requisição (recebido por HTTP)
   * @param {Object} res - Obejto de RESPOSTA (recebido por HTTP)
   * @returns {Promise<void>} não retorna nada, apenas executa a inserção
   * @throws {400} Se algum campo obrigatorio não for adicionado
   * @throws {500} Se ocorrer qualquer erro interno no servidor.
   */
    criarCliente: async (req, res) => {
        try {

            let { nomeCliente, cpfCliente } = req.body;

            if ( nomeCliente == undefined || cpfCliente == undefined || cpfCliente.length != 11 ) {
                return res.status(400).json({ error: "Campos Obrigatorios não preencidos" });

            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });


        } catch (error) {
            console.log('erro ao listar Clientes', error);
            res.status(500).json({ error: 'Erro ao Cadastrar Clientes' });

        }
    }




}



module.exports = { clienteController };
