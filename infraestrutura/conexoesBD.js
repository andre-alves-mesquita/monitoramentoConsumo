const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");
const conexaoPg = require("../infraestrutura/postgresql/conexaoPg");
const Tabelas = require("../infraestrutura/mysql/tabelasMysql");

class conexoesBD {
  conectarTodosBd() {
    conexaoMs.connect((erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Banco de dados Mysql2 conectado com sucesso");
        Tabelas.init(conexaoMs);
      }
    });

    conexaoPg.connect((erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Banco de dados PgAdmin conectado com sucesso");
      }
    });
  }
}

module.exports = new conexoesBD();
