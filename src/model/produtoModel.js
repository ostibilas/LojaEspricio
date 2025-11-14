const {sql,getConnection} = require("../config/db");

const produtoModel = {
/**
 * Busca todos os produtos no banco de dados
 * @async
 * @function buscarTodos
 * @returns {Promise<Array>} Retorna uma lista com todos os produtos
 * @throws Mostra os erros no console e propaga ele caso a busca falhe
 */
    buscarUm: async (idProduto) => { 

        try {

            const pool = await getConnection();
            const querySQL = `SELECT * FROM PRODUTOS 
                             WHERE idProduto = @idProduto`;

           const result = await pool.request()
            .input("idProduto", sql.UniqueIdentifier, idProduto)
            .query(querySQL);

            return result.recordset;
            
        } catch (error) {

            console.error("Erro ao buscar produtos:",error);
            throw error // reverberar o erro para funcao que 0 chamar.

            
        }
        
    },
    buscarTodos: async () => {

        try {

            const pool = await getConnection();
            const querySQL = 'SELECT * FROM PRODUTOS';
            const result = await pool.request().query(querySQL);

            return result.recordset;
            
        } catch (error) {

            console.error("Erro ao buscar produtos:",error);
            throw error // reverberar o erro para funcao que 0 chamar.

            
        }
        
    },

    /**
     * Insire um produto no banco de dados
     * @async
     * @function inserirProduto
     * @param {string} nomeProduto - nome do produto
     * @param {number} precoProduto - preço do produto
     * @returns {Promise<void>} não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro
     */
    inserirProduto: async (nomeProduto, precoProduto) =>{
        try {
            const pool = await getConnection();
            const querySQL = `
                INSERT INTO Produtos (nomeProduto, precoProduto)
                VALUES(@nomeProduto,@precoProduto)
            `
            await pool.request()
            .input("nomeProduto", sql.VarChar(100), nomeProduto)
            .input("precoProduto", sql.Decimal(10,2), precoProduto)
                .query(querySQL);

        } catch (error) {
                   console.error("Erro ao inserir produtos:",error);
            throw error // reverberar o erro para funcao que 0 chamar.
        }
    },
    /**
     * Atualiza um produto no banco de dados
     * @async
     * @param {string} idProduto id universal de produto
     * @param {string} nomeProduto nome do produto a ser atualizado
     * @param {number} precoProduto preço do produto a ser atualizado
     * @returns {Promise<void>} sem retorno, apenas executa atualização
     * @throws Mostra no console o erro caso a atualização falhe
     */
    atualizarProduto: async (idProduto,nomeProduto,precoProduto) =>{
        try {
            const pool = await getConnection();
            const querySQL = `UPDATE Produtos 
                              SET nomeProduto = @nomeProduto ,
                              precoProduto = @precoProduto
                              WHERE idProduto = @idProduto
                            `
            await pool.request()
            .input("idProduto", sql.UniqueIdentifier, idProduto)
            .input("nomeProduto", sql.VarChar(100), nomeProduto)
            .input("precoProduto", sql.Decimal(10,2), precoProduto)
            .query(querySQL);
            
        } catch (error) {
            
            console.error("Erro ao Atualizar produto:",error);
            throw error // reverberar o erro para funcao que 0 chamar.
            
        }

    }


}

module.exports = {produtoModel};