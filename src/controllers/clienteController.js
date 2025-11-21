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
            const { idCliente } = req.query;
            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: "Id do Cliente invalido" });
                }
                const cliente = await clienteModel.buscarUm(idCliente);
                return res.status(200).json(cliente);
            }
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);

        } catch (error) {
            console.log('erro ao listar clientes', error);
            res.status(500).json({ error: 'Erro ao listar clientes' });

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

            if (nomeCliente == undefined || cpfCliente == undefined || cpfCliente.length != 11) {
                return res.status(400).json({ error: "Campos Obrigatorios não preencidos" });

            }

            const cliente = await clienteModel.verficarCpf(cpfCliente);

            if (cliente.length > 0) {
                return res.status(409).json({ error: "Cliente com CPF já cadastrado" });

            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);


            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });


        } catch (error) {
            console.log('erro ao listar Clientes', error);
            res.status(500).json({ error: 'Erro ao Cadastrar Clientes' });
            res.status(500).json
            

        }
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    atualizarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;
            const { nomeCliente, cpfCliente } = req.body;

            if (idCliente.length !== 36) { 
                return res.status(400).json({ error: 'id do Cliente invalido' });
            }

            const cliente = await clienteModel.buscarUm(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ error: "Cliente não encontrado" })
            }

            const clienteAtual = cliente[0];
            const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;
            const cpfAtualizado = cpfCliente ?? clienteAtual.cpfCliente;

            await clienteModel.atualizarCliente(idCliente, nomeAtualizado, cpfAtualizado);

            res.status(200).json({ mensagem: "Cliente Atualizado com sucesso!" });

        } catch (error) {

            console.log('erro ao listar Clientes', error);
            res.status(500).json({ error: 'Erro ao Atualizar controller Clientes' });

        }

    },
    deletarCliente: async (req, res) => {


        try {
            const { idCliente } = req.params;

            if (idCliente.length != 36) {
                return res.status(400).json({ error: 'id do Cliente invalido' });
            }

            const cliente = await clienteModel.buscarUm(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ error: "cliente não encontrado" })
            }

            clienteModel.deletarCliente(idCliente);

            res.status(200).json({ mensagem: "Cliente Deletado com sucesso!" });


        } catch (error) {
            console.log('erro ao DELETAR Cliente', error);
            res.status(500).json({ error: 'Erro ao DELETAR Cliente' });
        }
    }





}



module.exports = { clienteController };
