const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class Usuarios {
  pegarUsuario(login, senha) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM usuarios WHERE (login='${login}' OR email='${login}') AND senha='${senha}' LIMIT 1`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var usuarioLogado = JSON.parse(JSON.stringify(resultados));
          resolve(usuarioLogado);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Usuarios();
