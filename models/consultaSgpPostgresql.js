const conexaoPg = require("../infraestrutura/postgresql/conexaoPg");

class Consumo {
  buscarConsumoCliente(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
        select r.username as login, sum((((r.acctoutputoctets -  r.acctinputoctets)/1000)/1000)/1000) as consumo, ap.nome as "nome" 
        from radacct r 
        inner join admcore_servicointernet as2 on r.username = as2.login
        inner join admcore_clientecontrato ac on ac.id = as2.clientecontrato_id 
        inner join admcore_cliente ac2 on ac2.id = ac.cliente_id 
        inner join admcore_pessoa ap on ap.id = ac2.pessoa_id 
        where  r.acctstarttime >= '${data}'
        group by r.username, ap.nome
        order by consumo desc limit 100
        
        
        `;

        conexaoPg.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var consumoCliente = JSON.parse(JSON.stringify(resultados));

          resolve(consumoCliente);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Consumo();
