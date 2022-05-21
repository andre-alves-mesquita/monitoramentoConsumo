const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class Viabilidade {
  InserirViabilidadeCliente(cliente) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO viabilidade SET ?`;

        conexaoMs.query(sql, cliente, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve(resultados);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Viabilidade();
