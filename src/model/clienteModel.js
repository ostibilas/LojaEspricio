const { sql, getConnection } = require("../config/db");
const { pool } = require("mssql");

const clienteModel = {
    /**
     * Busca todos os Clientes no banco de dados
     * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os Clientes
     * @throws Mostra os erros no console e propaga ele caso a busca falhe
     */
    buscarUm: async (idCliente) => {

        try {

            const pool = await getConnection();
            const querySQL = `SELECT * FROM Clientes 
                             WHERE idCliente = @idCliente
                             `

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar Clientes:", error);
            throw error // reverberar o erro para funcao que 0 chamar.


        }

    },
    buscarEmailOrCPF: async (cpfCliente,emailCliente) => {

        try {

            const pool = await getConnection();
            
            const querySQL = 'SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente OR emailCliente = @emailCliente';
            const result = await pool
                .request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .query(querySQL);



            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar Clientes (Model)", error);
            throw error // reverberar o erro para funcao que 0 chamar.


        }
    },

    buscarTodos: async () => {

        try {

            const pool = await getConnection();
            const querySQL = 'SELECT * FROM Clientes';
            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar Clientes:", error);
            throw error // reverberar o erro para funcao que 0 chamar.


        }

    },

    /**
     * Insire um Cliente no banco de dados
     * @async
     * @function inserirCliente
     * @param {string} nomeCliente - nome do Cliente
     * @param {number} cpfCliente - cpf do Cliente
     * @returns {Promise<void>} não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro
     */
    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                INSERT INTO Clientes (nomeCliente, cpfCliente , emailCliente, senhaCliente)
                VALUES(@nomeCliente,@cpfCliente,@emailCliente, @senhaCliente)
            `
            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .input("senhaCliente", sql.VarChar(255), senhaCliente)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir Clientes:", error);
            throw error // reverberar o erro para funcao que 0 chamar.
        }
    },
    deletarCliente: async (idCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = ` 
            DELETE FROM Clientes
            WHERE idCliente = @idCliente         
            `;

            await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);


        } catch (error) {

            console.error("Erro ao DELETAR o cliente:", error);
            throw error // reverberar o erro para funcao que 0 chamar.

        }

    },
    atualizarCliente: async (idCliente, nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `UPDATE Clientes 
                              SET nomeCliente = @nomeCliente,
                              cpfCliente = @cpfCliente
                              WHERE idCliente = @idCliente
                            `
            await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);

        } catch (error) {

            console.error("Erro ao Atualizar Cliente MODEL:", error);
            throw error // reverberar o erro para funcao que 0 chamar.

        }

    },

    verficarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            SELECT * FROM Clientes 
            WHERE cpfCliente = @cpfCliente
            `
            const result = await pool.request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao Buscar CPF:", error);
            throw error // reverberar o erro para funcao que 0 chamar.
        }
    }

}

module.exports = { clienteModel };
