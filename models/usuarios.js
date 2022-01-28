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

  verificarExisteUsuario() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM usuarios LIMIT 1`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var usuario = JSON.parse(JSON.stringify(resultados));
          resolve(usuario);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  cadastrarUsuario(login) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO usuarios SET ?`;

        conexaoMs.query(sql, login, (erro, resultados) => {
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

module.exports = new Usuarios();
