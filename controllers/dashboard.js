const isAuth = require("../middlewares/auth");
const moment = require("moment"); // require
const Extra = require("../models/extra");
const Instalacoes = require("../models/instalacoes");

module.exports = (app) => {
  let meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  app.get("/dashboards", isAuth, async (req, res) => {
    res.render("teste");
  });

  app.get("/dashboard-funcionario", isAuth, async (req, res) => {
    moment.locale("pt");
    moment.updateLocale("pt", {
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
    });

    let mes = moment().format("MMMM");
    let ano = moment().format("YYYY");

    let funcionarios = await Instalacoes.pegarVendedores(); //buscar todos funcionarios sgp

    res.render("dashboard-funcionario/index", {
      funcionarios: funcionarios.rows,
      instalacoes: null,
      mes: mes,
      ano: ano,
      extra: null,
      meses: meses,
      funcionario: null,
      qtdExtra: null,
      vendedor: null,
      qtd: null,
      valor: null,
      exibirJanelas: null,
    });
  });

  app.post("/dashboard-funcionario", isAuth, async (req, res) => {
    let funcionario = req.body.funcionario;
    let ano = req.body.ano;
    let mes = req.body.mes;
    let remuneracaoTotal = 0;
    let qtdDeVendas = 0;
    let qtdExtra = 0;
    let valorExtra = 0;
    let valorTotalGanho = 0;
    let queryFuncionario = "";
    let dataInicioMes = moment([ano, mes])
      .startOf("month")
      .format("YYYY-MM-DD");

    let dataFimMes = moment([ano, mes]).endOf("month").format("YYYY-MM-DD");
    let queryDataInicio = ` and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataInicioMes}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;
    let queryDataFim = ` and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataFimMes}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;

    if (funcionario == "Edvania Santos Coutinho") {
      queryFuncionario = ` and av.nome = 'Edvania santos coutinho' `;
    } else {
      queryFuncionario = ` and av.nome = '${funcionario}' `;
    }

    let queryData = ` ${queryDataInicio} ${queryDataFim} `;
    let queryFinal = ` ${queryFuncionario} ${queryData} `;
    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

    instalacoes.rows.forEach((element) => {
      remuneracao = Number(element.Preço) / 2;

      if (element.extra == "1") {
        if (element.Vendedor == element.Técnico_responsável) {
          remuneracaoTotal = remuneracao + 50;
          element.remuneracaoTotal = remuneracao + 50;
          valorExtra += 50;
          qtdExtra += 1;
        } else {
          remuneracaoTotal = remuneracao;
          element.remuneracaoTotal = remuneracao;
        }
      } else {
        remuneracaoTotal = remuneracao;
        element.remuneracaoTotal = remuneracao;
      }

      qtdDeVendas += 1;
      valorTotalGanho += remuneracaoTotal;
    });

    let funcionarios = await Instalacoes.pegarVendedores(); //buscar todos funcionarios sgp

    res.render("dashboard-funcionario/index", {
      funcionarios: funcionarios.rows,
      funcionario: funcionario,
      instalacoes: instalacoes.rows,
      vendedor: funcionario,
      qtdExtra: qtdExtra,
      extra: valorExtra.toFixed(2),
      mes: meses[mes],
      ano: ano,
      meses: meses,
      qtd: qtdDeVendas,
      valor: valorTotalGanho.toFixed(2),
      exibirJanelas: true,
    });
  });

  app.get("/dashboard-valor-mes", isAuth, async (req, res) => {
    res.render("teste");
  });

  app.get("/dashboard-instalacoes", isAuth, async (req, res) => {
    res.render("teste");
  });
};
