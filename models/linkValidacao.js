const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class linkValidacao {
  buscarTodosLinkValidacoes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM link_validacao`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var linksValidos = JSON.parse(JSON.stringify(resultados));
          resolve(linksValidos);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarLinkValidacoesTelefone(fone) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM link_validacao WHERE numero_telefone='${fone}' LIMIT 1`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var linksValidos = JSON.parse(JSON.stringify(resultados));
          resolve(linksValidos);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  inserirLinkValidacao(link) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO link_validacao SET ?`;

        conexaoMs.query(sql, link, (erro, resultados) => {
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

module.exports = new linkValidacao();
