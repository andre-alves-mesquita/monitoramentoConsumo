const conexaoMs = require("../infraestrutura/mysql/conexaoMysql2");
const conexaoPg = require("../infraestrutura/postgresql/conexaoPg");

class Extra {
  cadastrarFuncionariosExtra(extra) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO extra SET ?`;

        conexaoMs.query(sql, extra, (erro, resultados) => {
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

  removerFuncionariosExtra(extra, id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE extra SET ? WHERE id_usuario=${id}`;

        conexaoMs.query(sql, extra, (erro, resultados) => {
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

  buscarTodosFuncionarios() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM auth_user au 
        WHERE 
        au.is_active = true and
        au.name != 'Suporte Local' and
        au.name != 'Protestar' and
        au.name != 'Retirar' and
        au.name != 'Eqp removido pra cancelamento' and
        au.name != 'S.Financeiro' and
        au.name != 'Instalar' and
        au.name != 'Setor Comercial' and
        au.name != 'Atendimentos de Prevenção' and
        au.name != 'Aguardando Splintagem/Poste/Expansão' and
        au.name != 'Suporte Remoto' and
        au.name != 'Contratos Pendentes' and
        au.name != 'Jeniffer Gabriele' and
        au.name != ''
        `;

        conexaoPg.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var funcionarios = JSON.parse(JSON.stringify(resultados));

          resolve(funcionarios);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarFuncionarioNome(queryFunc) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM auth_user au 
        WHERE au.is_active = true 
        ${queryFunc} 

        `;

        conexaoPg.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var funcionarios = JSON.parse(JSON.stringify(resultados));

          resolve(funcionarios);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  buscarTodosExtras() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT nome_usuario FROM extra`;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var funcionarios = JSON.parse(JSON.stringify(resultados));

          resolve(funcionarios);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  atualizarExtras(usuarios) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE extra SET extra = 'nao' WHERE ${usuarios} `;

        conexaoMs.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var funcionarios = JSON.parse(JSON.stringify(resultados));

          resolve(funcionarios);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
module.exports = new Extra();
