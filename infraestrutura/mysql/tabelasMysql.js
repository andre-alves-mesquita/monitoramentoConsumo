class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTabelaConsumoInternet();
    this.criarTabelaUsuarios();
  }

  criarTabelaConsumoInternet() {
    const sql = `
      CREATE TABLE IF NOT EXISTS consumo_internet(
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(255),  
        login varchar(255),  
        consumo varchar(255), 
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela consumo_internet criada com sucesso");
      }
    });
  }

  criarTabelaDataConsulta() {
    const sql = `
      CREATE TABLE IF NOT EXISTS data_consulta_cliente_onsumo(
        id int NOT NULL AUTO_INCREMENT,
        data_pesquisa date,  
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela data_consulta_cliente_onsumo criada com sucesso");
      }
    });
  }

  criarTabelaUsuarios() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuarios(
        id int NOT NULL AUTO_INCREMENT,
        login varchar(255),  
        email varchar(255),
        senha varchar(255),
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela usuarios criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
