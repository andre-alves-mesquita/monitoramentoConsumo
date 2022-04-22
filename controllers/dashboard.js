const isAuth = require("../middlewares/auth");
const moment = require("moment"); // require
const Extra = require("../models/extra");
const Instalacoes = require("../models/instalacoes");

module.exports = (app) => {
  app.get("/dashboard", isAuth, async (req, res) => {
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

    let mes = moment().format("MMMM");
    let ano = moment().format("YYYY");

    let funcionarios = await Extra.buscarTodosFuncionarios(); //buscar todos funcionarios sgp

    res.render("dashboard-funcionario/index", {
      funcionarios: funcionarios.rows,
      mes: mes,
      ano: ano,
      meses: meses,
    });
  });

  app.post("/dashboard-funcionario", isAuth, async (req, res) => {
    let funcionario = req.body.funcionario;
    let ano = req.body.ano;
    let mes = req.body.mes;

    let dataInicioMes = moment([ano, mes])
      .startOf("month")
      .format("YYYY-MM-DD");

    let dataFimMes = moment([ano, mes]).endOf("month").format("YYYY-MM-DD");

    let queryDataInicio = ` and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') >= TO_DATE(to_char(date('${dataInicioMes}'),'YYYY-MM-DD'),'YYYY-MM-DD') `;

    let queryDataFim = ` and TO_DATE(to_char(ao2.data_finalizacao,'YYYY-MM-DD'),'YYYY-MM-DD') <= TO_DATE(to_char(date('${dataFimMes}') ,'YYYY-MM-DD'),'YYYY-MM-DD') `;

    let queryFuncionario = ` and av.nome = '${funcionario}' `;
    let queryData = ` ${queryDataInicio} ${queryDataFim} `;

    let queryFinal = ` ${queryFuncionario} ${queryData} `;

    console.log(queryFinal);

    let instalacoes = await Instalacoes.pegarInstalacoes(queryFinal);

    res.status(200).json(instalacoes.rows);
  });

  app.get("/dashboard-valor-mes", isAuth, async (req, res) => {
    res.render("teste");
  });

  app.get("/dashboard-instalacoes", isAuth, async (req, res) => {
    res.render("teste");
  });
};
