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

  pegarTodasViabilidades() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM viabilidade`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var viabilidade = JSON.parse(JSON.stringify(resultados));
          resolve(viabilidade);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  inserirRegistroViabilidade(viabilidade) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO registro_viabilidade SET ?`;

        conexaoMs.query(sql, viabilidade, (erro, resultados) => {
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

  pegarRegistroViabilidade() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM registro_viabilidade`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var viabilidade = JSON.parse(JSON.stringify(resultados));
          resolve(viabilidade);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  inserirRegistroInviabilidade(inviabilidade) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM viabilidade`;

        conexaoMs.query(sql, inviabilidade, (erro, resultados) => {
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

  inserirRegistroInviabilidade() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM registro_inviabilidade`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var inviabilidade = JSON.parse(JSON.stringify(resultados));
          resolve(inviabilidade);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Viabilidade();
