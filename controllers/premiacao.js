const Instalacoes = require("../models/instalacoes");
const moment = require("moment"); // require

module.exports = (app) => {
  app.get("/premiacao", async (req, res) => {
    res.render("premiacao/premiacao", {
      instalacoes: null,
      demonstrativoQuantitativo: null,
      demonstrativoGeral: null,
    });
  });

  app.post("/premiacao", async (req, res) => {
    let dataInicio = req.body.dataInicioForm;
    let dataFim = req.body.dataFimForm;
    let extra = req.body.extraForm;
    let vendedor = req.body.selectVendedorForm;
    let usuario = req.body.selectUsuarioForm;
    let tecnico = req.body.selectTecnicoForm;
    let responsavel = req.body.selectResponsavelForm;
    let queryDataInicio = "";
    let queryDataFim = "";
    let queryVendedor = "";
    let queryUsuario = "";
    let queryTecnico = "";
    let queryResponsavel = "";
    let queryExtra = "";
    let queryFinal = "";
    let remuneracao = 0;
    let remuneracaoTotal = 0;
    let remuneracaoTecnico = 0;
    let vendedoresNome = [];
    let vendedores = [];
    let vendedoresVendas = [];

    if (dataInicio != "") {
      queryDataInicio += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataInicio}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (dataFim != "") {
      queryDataFim += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataFim}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (extra == "sim") {
      queryExtra += `and (select COUNT(at2.tag) as "Extra" from admcore_clientecontrato CC
      inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
      inner join admcore_tag at2 on (at2.id = act.tag_id)
      where CC.id = ac.id and at2.tag = 'Extra') > 0 `;
    }

    if (vendedor) {
      const vendedorArray = vendedor.split(",");
      vendedorArray.forEach((element) => {
        queryVendedor += ` and av.nome = '${element}' `;
      });
    } else {
      queryVendedor = "";
    }

    if (usuario) {
      const usuarioArray = usuario.split(",");
      usuarioArray.forEach((element) => {
        queryUsuario += ` and au.name = '${element}' `;
      });
    } else {
      queryUsuario = "";
    }

    if (responsavel) {
      const responsavelArray = responsavel.split(",");
      responsavelArray.forEach((element) => {
        queryResponsavel += ` and au.name = '${element}' `;
      });
    } else {
      queryResponsavel = "";
    }

    if (tecnico) {
      const tecnicoArray = tecnico.split(",");
      tecnicoArray.forEach((element) => {
        queryTecnico += ` and au.name = '${element}' `;
      });
    } else {
      queryTecnico = "";
    }

    queryFinal +=
      queryDataInicio +
      queryDataFim +
      queryExtra +
      queryResponsavel +
      queryTecnico +
      queryVendedor +
      queryUsuario;

    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

    instalacoes.rows.forEach((element) => {
      remuneracao = Number(element.Preço) / 2;

      if (element.extra == "1") {
        if (element.Vendedor == element.Técnico_responsável) {
          remuneracaoTotal = remuneracaoTecnico + remuneracao;
          remuneracaoTecnico = 0;
        } else {
          remuneracaoTecnico = 50;
          remuneracaoTotal = remuneracao;
        }
      } else {
        remuneracaoTotal = remuneracao;
        remuneracaoTecnico = 0;
      }

      element.remuneracaoTecnico = remuneracaoTecnico;
      element.remuneracaoTotal = remuneracaoTotal;

      console.log(vendedoresNome.length);

      if (vendedoresNome.length == 0) {
        vendedoresNome.push(element.Vendedor);

        vendedores.push({
          vendedor: element.Vendedor,
          valorVenda: remuneracaoTotal,
          valorInstalacao: remuneracaoTecnico,
        });

        vendedoresVendas.push({
          vendedor: element.Vendedor,
          vendas: 1,
        });
      } else {
        if (!vendedoresNome.includes(element.Vendedor)) {
          vendedoresNome.push(element.Vendedor);
          vendedores.push({
            vendedor: element.Vendedor,
            valorVenda: remuneracaoTotal,
            valorInstalacao: remuneracaoTecnico,
          });

          vendedoresVendas.push({
            vendedor: element.Vendedor,
            vendas: 1,
          });
        } else {
          vendedores.valorVenda += remuneracaoTotal;
          vendedores.valorInstalacao += remuneracaoTecnico;
          vendedoresVendas.vendas += 1;
        }
      }
    });

    res.render("premiacao/premiacao", {
      instalacoes: instalacoes.rows,
      demonstrativoQuantitativo: vendedores,
      demonstrativoGeral: vendedoresVendas,
    });
  });

  app.get("/buscar-usuarios-premiacao", async (req, res) => {
    let usuarios = await Instalacoes.pegarFuncionarios();
    res.status(200).json(usuarios.rows);
  });

  app.get("/buscar-tecnicos-premiacao", async (req, res) => {
    let tecnicos = await Instalacoes.pegarTecnicos();
    res.status(200).json(tecnicos.rows);
  });

  app.get("/buscar-vendedores-premiacao", async (req, res) => {
    let vendedores = await Instalacoes.pegarVendedores();
    res.status(200).json(vendedores.rows);
  });

  app.get("/buscar-responsaveis-premiacao", async (req, res) => {
    let instalacoes = await Instalacoes.pegarInstalacoes();
    res.status(200).json(instalacoes);
  });
};
