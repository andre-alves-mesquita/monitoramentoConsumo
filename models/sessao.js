const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class Sessao {
  InserirUsuarioLogado(usuario) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO usuario_logado SET ?`;

        conexaoMs.query(sql, usuario, (erro, resultados) => {
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

  pegarUsuarioLogado(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM usuario_logado WHERE id_usuario=${id} LIMIT 1`;

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

  deletarUsuarioLogado(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `DELETE FROM usuario_logado WHERE id_usuario=${id}`;

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

module.exports = new Sessao();
