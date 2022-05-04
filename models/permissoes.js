const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class Permissoes {
  InserirPermissao(permissao) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO permissoes SET ?`;

        conexaoMs.query(sql, permissao, (erro, resultados) => {
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

  buscarTodasPermissoes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM permissoes`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var permissoes = JSON.parse(JSON.stringify(resultados));
          resolve(permissoes);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  inserirPermissaoFuncionario(permissao) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO usuario_permissoes SET ? `;

        conexaoMs.query(sql, permissao, (erro, resultados) => {
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

  buscarTodasPermissoesUsuarios() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM usuario_permissoes `;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var permissoes = JSON.parse(JSON.stringify(resultados));
          resolve(permissoes);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Permissoes();
