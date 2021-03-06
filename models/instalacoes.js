const conexaoPg = require("../infraestrutura/postgresql/conexaoPg");

class Instalacoes {
  pegarInstalacoes(queryFinal) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `

        Select 
      	distinct 
        C.id as "Cliente",
        ao.conteudo,
        CONCAT  (ac.id, ' - ', ap.nome) AS "Contrato_Nome",
        ap2.descricao as "Plano",
        (ap2.preco- ap2.desconto) as "Preço",
        TO_CHAR(ac.data_cadastro, 'DD/MM/YYYY HH:mm:ss') as "Data_de_Cadastro",
        TO_CHAR(ao2.data_finalizacao, 'DD/MM/YYYY HH:mm:ss') as "Data_finalização",
        av.nome as "Vendedor",
        au.name as "Usuário_R_Cadastro",
        au2.name as "Técnico_responsável",
        au3.name as "Usuario_Finaliza"
        ,(select COUNT(at2.tag) as "Extra" from admcore_clientecontrato CC
        inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
        inner join admcore_tag at2 on (at2.id = act.tag_id)
        where CC.id = ac.id and at2.tag = 'Extra') as Extra
        from admcore_clientecontrato ac  
        inner join admcore_cliente C on (C.id = ac.cliente_id)
        inner join admcore_pessoa ap on (ap.id = C.pessoa_id)  
       	left join admcore_servicointernet S on ( S.clientecontrato_id =  ac.id) --
        left join admcore_plano ap2 on (ap2.id = S.planointernet_id)
        left join admcore_vendedor av on (av.id = ac.vendedor_id)
        inner join atendimento_ocorrencia ao2 on (ao2.clientecontrato_id = ac.id)
        inner join atendimento_os ao on (ao2.id = ao.ocorrencia_id)
        inner join auth_user au on (au.id = ao.usuario_id)
        left join auth_user au2 on (au2.id = ao.responsavel_id)
        left join auth_user au3 on (au3.id = ao2.usuario_finaliza_id)  --left join
        inner join atendimento_tipo at3 on (at3.id = ao2.tipo_id)
        inner join admcore_clientecontratostatus ac3 on (ac.status_id = ac3.id) 
      
        where    ao.motivoos_id = 1
        and (select COUNT(at2.tag) as "Base WSE" from admcore_clientecontrato CC
      	inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
      	inner join admcore_tag at2 on (at2.id = act.tag_id)
      	where CC.id = ac.id  and at2.tag = 'Base WSE') = 0 
      	and (ao2.conteudo not like '%MIGRAÇÃO%' or ao2.conteudo not like '%MUDANÇA%' or ao2.conteudo not like '%INVIABILIDADE%' or ao2.conteudo not like '%SUSPENSO%')	
       	and (at3.id = 17 or at3.id = 31 or at3.id = 44 or at3.id = 36 or at3.id = 36) 
        and (select count(*) from atendimento_ocorrencia ao5 
        inner join admcore_clientecontrato ac4 on (ao5.clientecontrato_id = ac4.id)
        where ac.id = ac4.id
        and (ao5.conteudo like '%MIGRAÇÃO%' 
        or ao5.conteudo  like '%MUDANÇA DE PLANO%' 
        or ao5.conteudo  like '%INVIABILIDADE%' 
        or ao5.conteudo  like '%inviabilidade%' 
        or ao5.conteudo  like '%SUSPENSO%')) - (select count(*) from atendimento_ocorrencia ao5 
        inner join admcore_clientecontrato ac4 on (ao5.clientecontrato_id = ac4.id)
        where ac.id = ac4.id and ao5.conteudo like '%TIPO DE INSTALA%') <= 0
        and ac3.status = 1

        ${queryFinal}   
        `;

        console.log(queryFinal);

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

  pegarTecnicos() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
        select distinct name  from auth_user au 
        inner join auth_user_cargos auc on (auc.user_id = au.id)
        inner join cauth_cargo cc on (cc.id = auc.cargo_id)
        where is_active = true and cc.nome = 'Tecnico'   
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

  pegarFuncionarios() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
        select distinct name from auth_user au where au.is_active = true  and
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
        order by  au.name ASC 
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

  pegarVendedores() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `
        select distinct nome from admcore_vendedor av where av.ativo = true and av.nome != 'Migração' order by nome ASC 
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

    const sql = `
        Select distinct 
        C.id as "Cliente",
        CONCAT  (ac.id, ' - ', ap.nome) AS "Contrato_Nome",
        ap2.descricao as "Plano",
        (ap2.preco- ap2.desconto) as "Preço",
        TO_CHAR(ac.data_cadastro, 'DD/MM/YYYY HH:mm:ss') as "Data_de_Cadastro",
        TO_CHAR(ao2.data_finalizacao, 'DD/MM/YYYY HH:mm:ss') as "Data_finalização",
        av.nome as "Vendedor",
        au.name as "Usuário_R_Cadastro",
        au2.name as "Técnico_responsável",
        au3.name as "Usuario_Finaliza"
        ,(select COUNT(at2.tag) as "Extra" from admcore_clientecontrato CC
        inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
        inner join admcore_tag at2 on (at2.id = act.tag_id)
        where CC.id = ac.id and at2.tag = 'Extra') as Extra
        from admcore_clientecontrato ac      
        inner join admcore_cliente C on (C.id = ac.cliente_id)
        inner join admcore_pessoa ap on (ap.id = C.pessoa_id)  --
        inner join admcore_servicointernet S on ( S.clientecontrato_id =  ac.id) --
        inner join admcore_plano ap2 on (ap2.id = S.planointernet_id)
        inner join admcore_vendedor av on (av.id = ac.vendedor_id)
        inner join atendimento_ocorrencia ao2 on (ao2.clientecontrato_id = ac.id)
        inner join atendimento_os ao on (ao2.id = ao.ocorrencia_id)
        inner join auth_user au on (au.id = ao.usuario_id)
        inner join auth_user au2 on (au2.id = ao.responsavel_id)
        inner join auth_user au3 on (au3.id = ao2.usuario_finaliza_id)
        where av.ativo = true
        and ap2.descricao != 'Clientes Cancelados'  and ap2.descricao != 'RadNet-Colaborador'   
        and ao.motivoos_id = 1
        and (select COUNT(at2.tag) as "Base WSE" from admcore_clientecontrato CC
      	inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
      	inner join admcore_tag at2 on (at2.id = act.tag_id)
      	where CC.id = ac.id and at2.tag = 'Base WSE') = 0 
        ${queryFinal}   
        `;

*/
