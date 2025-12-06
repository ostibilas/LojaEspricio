const sql = require("mssql");

const config = {

    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_DB,
    database: process.env.NAME_DB,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }

};

/** 
 * cria e retorna uma conexao com o  banco de dados SQL SERVER
 * @async
 * @function getConnection
 * @returns {Promise<object>} Retorna o objeto de conexao (pool) com o banco de dados
 * @throws Mostra no console se ocoorer erro na conexao.
*/
async function getConnection() {

    try {
        const pool = await sql.connect(config);


        return pool;

    }

    catch (error) {

        console.error(`erro na conexao SQL SERVER`, error);

    }
};

(async () => {
    const pool = await getConnection();

    if (pool) {
        console.log("Conexão com o DB estabelicida com sucesso!");
    }
})();

module.exports = { sql, getConnection }






