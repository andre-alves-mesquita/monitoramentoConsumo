class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTabelaConsumoInternet();
    this.criarTabelaUsuarios();
    this.criarTabelaUsuarioLogado();
    this.criarTabelaPromocaoExtra();
    this.criarTabelaPermissoes();
    this.criarTabelaUsuarioPermissoes();
    this.criarTabelaViabilidade();
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

  criarTabelaUsuarioLogado() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuario_logado(
        id int NOT NULL AUTO_INCREMENT,
        id_usuario int,  
        nome_usuario varchar(255),
        data_login date,
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela usuario_logado criada com sucesso");
      }
    });
  }

  criarTabelaPromocaoExtra() {
    const sql = `
      CREATE TABLE IF NOT EXISTS extra(
        id int NOT NULL AUTO_INCREMENT,
        id_usuario int,  
        nome_usuario varchar(255),
        extra varchar(50),
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela extra criada com sucesso");
      }
    });
  }

  criarTabelaUsuarioPermissoes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuario_permissoes(
        id int NOT NULL AUTO_INCREMENT,
        id_usuario int,        
        id_permissao int,
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela usuario_permissoes criada com sucesso");
      }
    });
  }

  criarTabelaPermissoes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS permissoes(
        id int NOT NULL AUTO_INCREMENT,
        permissao varchar(50),      
        rota varchar(100),    
        PRIMARY KEY(id) 
      )
      `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela permissoes criada com sucesso");
      }
    });
  }
  criarTabelaViabilidade() {
    const sql = `
    CREATE TABLE IF NOT EXISTS viabilidade(
      id int NOT NULL AUTO_INCREMENT,
      numero_cliente varchar(50),      
      lat varchar(100),    
      lng varchar(100),    
      PRIMARY KEY(id) 
    )
    `;
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela viabilidade criada com sucesso");
      }
    });
  }
}

module.exports = new Tabelas();
