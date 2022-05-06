const Instalacoes = require("../models/instalacoes");
const moment = require("moment"); // require
const isAuth = require("../middlewares/auth");
const Permission = require("../middlewares/permission");

module.exports = (app) => {
  app.get("/premiacao", isAuth, Permission, async (req, res) => {
    res.render("premiacao/index", {
      instalacoes: null,
      demonstrativoQuantitativoLabel: null,
      demonstrativoQuantitativoQtd: null,
      vendedoresValorVendas: null,
      vendedoresValorInstalacoes: null,
      exibirJanelas: null,
      remuneracaoTotal: null,
    });
  });

  app.post("/premiacao", isAuth, async (req, res) => {
    let dataInicio = req.body.dataInicioForm;
    let dataFim = req.body.dataFimForm;
    //let extra = req.body.extraForm;
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
    //let queryExtra = "";
    let queryFinal = "";
    let remuneracao = 0;
    let remuneracaoTotal = 0;
    let remuneracaoTecnico = 0;
    let vendedoresLabel = [];
    let vendedoresQtdVendas = [];
    let vendedoresValorVendas = [];
    let vendedoresValorInstalacoes = [];
    let valorVendasArredondado = [];
    let valorInstalacoesArredondado = [];
    let valorTotalPago = 0;

    if (dataInicio != "") {
      queryDataInicio += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataInicio}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    if (dataFim != "") {
      queryDataFim += `and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataFim}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;
    }

    /*
    if (extra == "sim") {
      queryExtra += `and (select COUNT(at2.tag) as "Extra" from admcore_clientecontrato CC
      inner join admcore_clientecontrato_tags act on (act.clientecontrato_id = CC.id)
      inner join admcore_tag at2 on (at2.id = act.tag_id)
      where CC.id = ac.id and at2.tag = 'Extra') > 0 `;
    }
    */

    if (vendedor) {
      queryVendedor += " and ( ";
      if (typeof vendedor == "string") {
        const vendedorArray = vendedor.split(",");
        vendedorArray.forEach((element, index) => {
          if (index == 0) {
            queryVendedor += ` av.nome = '${element}' `;
          } else {
            queryVendedor += ` or av.nome = '${element}' `;
          }
        });
      } else {
        vendedor.forEach((element, index) => {
          if (index == 0) {
            queryVendedor += ` av.nome = '${element}' `;
          } else {
            queryVendedor += ` or av.nome = '${element}' `;
          }
        });
      }
      queryVendedor += " ) ";
    } else {
      queryVendedor = "";
    }
    // =======================================================================

    /*
    if (usuario) {
      queryUsuario += " and ( ";
      if (typeof usuario == "string") {
        const usuarioArray = usuario.split(",");
        usuarioArray.forEach((element, index) => {
          if (index == 0) {
            queryUsuario += ` av.nome = '${element}' `;
          } else {
            queryUsuario += ` or av.nome = '${element}' `;
          }
        });
      } else {
        usuario.forEach((element, index) => {
          if (index == 0) {
            queryUsuario += ` av.nome = '${element}' `;
          } else {
            queryUsuario += ` or av.nome = '${element}' `;
          }
        });
      }
      queryUsuario += " ) ";
    } else {
      queryUsuario = "";
    }*/

    if (tecnico) {
      queryTecnico += " and ( ";
      if (typeof tecnico == "string") {
        const tecnicoArray = tecnico.split(",");
        tecnicoArray.forEach((element, index) => {
          if (index == 0) {
            queryTecnico += ` au2.name = '${element}' `;
          } else {
            queryTecnico += ` or au2.name = '${element}' `;
          }
        });
      } else {
        tecnico.forEach((element, index) => {
          if (index == 0) {
            queryTecnico += ` au2.name = '${element}' `;
          } else {
            queryTecnico += ` or au2.name = '${element}' `;
          }
        });
      }
      queryTecnico += " ) ";
    } else {
      queryTecnico = "";
    }

    if (responsavel) {
      queryResponsavel += " and ( ";
      if (typeof responsavel == "string") {
        const responsavelArray = responsavel.split(",");
        responsavelArray.forEach((element, index) => {
          if (index == 0) {
            queryResponsavel += ` au3.name = '${element}' `;
          } else {
            queryResponsavel += ` or au3.name = '${element}' `;
          }
        });
      } else {
        responsavel.forEach((element, index) => {
          if (index == 0) {
            queryResponsavel += ` au3.name = '${element}' `;
          } else {
            queryResponsavel += ` or au3.name = '${element}' `;
          }
        });
      }
      queryResponsavel += " ) ";
    } else {
      queryResponsavel = "";
    }

    queryFinal +=
      queryDataInicio +
      queryDataFim +
      queryResponsavel +
      queryTecnico +
      queryVendedor +
      queryUsuario;

    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

    instalacoes.rows.forEach((element) => {
      remuneracao = Number(element.Preço) / 2;

      if (element.extra == "1") {
        if (element.Vendedor == element.Técnico_responsável) {
          remuneracaoTotal = remuneracao + 50;
          remuneracaoTecnico = 0;
        } else {
          remuneracaoTotal = remuneracao;
          remuneracaoTecnico = 50;
        }
      } else {
        remuneracaoTotal = remuneracao;
        remuneracaoTecnico = 0;
      }

      element.remuneracaoTecnico = remuneracaoTecnico;
      element.remuneracaoTotal = remuneracaoTotal;
      valorTotalPago += remuneracaoTecnico + remuneracaoTotal;

      if (vendedoresLabel.length == 0) {
        vendedoresLabel.push(element.Vendedor);
        vendedoresQtdVendas.push(1);
        vendedoresValorVendas.push(remuneracaoTotal);
        vendedoresValorInstalacoes.push(remuneracaoTecnico);
      } else {
        if (vendedoresLabel.includes(element.Vendedor)) {
          for (let index = 0; index < vendedoresLabel.length; index++) {
            if (vendedoresLabel[index] == element.Vendedor) {
              vendedoresQtdVendas[index] += 1;
              vendedoresValorVendas[index] += remuneracaoTotal;
              vendedoresValorInstalacoes[index] += remuneracaoTecnico;
            }
          }
        } else {
          vendedoresLabel.push(element.Vendedor);
          vendedoresQtdVendas.push(1);
          vendedoresValorVendas.push(remuneracaoTotal);
          vendedoresValorInstalacoes.push(remuneracaoTecnico);
        }
      }
    });

    for (let index = 0; index < vendedoresValorVendas.length; index++) {
      valorVendasArredondado.push(vendedoresValorVendas[index].toFixed(2));
      valorInstalacoesArredondado.push(
        vendedoresValorInstalacoes[index].toFixed(2)
      );
    }

    console.log(instalacoes.rows);

    res.render("premiacao/index", {
      instalacoes: instalacoes.rows,
      demonstrativoQuantitativoLabel: vendedoresLabel,
      demonstrativoQuantitativoQtd: vendedoresQtdVendas,
      vendedoresValorVendas: valorVendasArredondado,
      vendedoresValorInstalacoes: valorInstalacoesArredondado,
      exibirJanelas: true,
      remuneracaoTotal: valorTotalPago.toFixed(2),
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
