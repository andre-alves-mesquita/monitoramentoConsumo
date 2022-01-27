const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");

class Consumo {
  guardarConsumo(consumo) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO consumo_internet SET ?`;

        conexaoMs.query(sql, consumo, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve("cadastro inserido com sucesso");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  limparTabela() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
       delete from consumo_internet        
        `;
        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }

          resolve("tabela limpa");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  pegarTodosOsRegistros() {
    const sql = `
       select * from consumo_internet        
        `;
    conexaoMs.query(sql, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      }
      var registros = JSON.parse(JSON.stringify(resultados));

      return registros;
    });
  }
}

module.exports = new Consumo();
