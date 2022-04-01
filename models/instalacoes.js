const conexaoPg = require("../infraestrutura/postgresql/conexaoPg");

class Instalacoes {
  pegarInstalacoes() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
        Select CONCAT  (ac.id, ' - ', ap.nome) AS "Contrato_Nome",
        ap2.descricao as "Plano",ap2.preco as "Preço",
        TO_CHAR(ac.data_cadastro, 'DD/MM/YYYY HH:mm:ss') as "Data_de_Cadastro",
        TO_CHAR(ao2.data_finalizacao, 'DD/MM/YYYY HH:mm:ss') as "Data_finalização",
        av.nome as "Vendedor", ao.conteudo  as "Conteudo",
        au.name as "Usuário_R_Cadastro",
        au2.name as "Técnico_responsável",
        au3.name as "Usuario_Finaliza"
        ,(select COUNT(at2.tag) as "Extra" from admcore_clientecontrato CC
        inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
        inner join admcore_tag at2 on (at2.id = act.tag_id)
        where CC.id = 33082 and at2.tag = 'Extra') as Extra
        from admcore_clientecontrato ac      
        inner join admcore_cliente C on (C.id = ac.cliente_id)    --
        inner join admcore_pessoa ap on (ap.id = C.pessoa_id)  --
        inner join admcore_servicointernet S on ( S.clientecontrato_id =  ac.id) --
        inner join admcore_plano ap2 on (ap2.id = S.planointernet_id)
        inner join admcore_vendedor av on (av.id = ac.vendedor_id)
        inner join atendimento_os ao on (ao.conteudo like CONCAT('%','Ativação do Contrato ', ac.id, '%'))
        inner join auth_user au on (au.id = ao.usuario_id)
        inner join atendimento_ocorrencia ao2 on (ao2.id = ao.ocorrencia_id)
        inner join auth_user au2 on (au2.id = ao.responsavel_id)
        inner join auth_user au3 on (au3.id = ao2.usuario_finaliza_id)
        where av.ativo = true
        and ap2.descricao != 'Clientes Cancelados'  and ap2.descricao != 'RadNet-Colaborador'   
        and ao2.data_finalizacao <= now() 
        and ao2.data_finalizacao >= (now()- interval '31 day')
        and ac.id = 33092
                
        `;

        conexaoPg.query(sql, (erro, resultados) => {
          if (erro) {
            console.log(erro);
          }
          var instalacoes = JSON.parse(JSON.stringify(resultados));

          resolve(instalacoes);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new Instalacoes();

/*

select CONCAT  (ac.id, ' - ', ap.nome) AS "Contrato.Nome"  ,ap2.descricao as "Plano",ap2.preco as "Preço",TO_CHAR(ac.data_cadastro, 'DD/MM/YYYY HH:mm:ss') as "Data de Cadastro",TO_CHAR(ao2.data_finalizacao, 'DD/MM/YYYY HH:mm:ss') as "Data finalização",av.nome as "Vendedor", ao.conteudo  as "Conteudo", au.name as "Usuário R. Cadastro", au2.name as "Técnico responsável", au3.name as "Usuario Finaliza"  from admcore_clientecontrato ac      --
inner join admcore_cliente C on (C.id = ac.cliente_id)    --
inner join admcore_pessoa ap on (ap.id = C.pessoa_id)  --
inner join admcore_servicointernet S on ( S.clientecontrato_id =  ac.id) --
inner join admcore_plano ap2 on (ap2.id = S.planointernet_id)
inner join admcore_vendedor av on (av.id = ac.vendedor_id)
inner join atendimento_os ao on (ao.conteudo like CONCAT('%','Ativação do Contrato ', ac.id, '%'))
inner join auth_user au on (au.id = ao.usuario_id)
inner join atendimento_ocorrencia ao2 on (ao2.id = ao.ocorrencia_id)
inner join auth_user au2 on (au2.id = ao.responsavel_id)
inner join auth_user au3 on (au3.id = ao2.usuario_finaliza_id)

*/
