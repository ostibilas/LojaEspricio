const {sql,getConnection} = require("../config/db");

const produtoModel = {
/**
 * Busca todos os produtos no banco de dados
 * @async
 * @function buscarTodos
 * @returns {Promise<Array>} Retorna uma lista com todos os produtos
 * @throws Mostra os erros no console e propaga ele caso a busca falhe
 */
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
        
    }

}