const consumoCliente = require("../models/consultaSgpPostgresql");
const Consumo = require("../models/consumoInternetClienteMysql");
const moment = require("moment"); // require
const isAuth = require("../middlewares/auth");
const Permission = require("../middlewares/permission");

module.exports = (app) => {
  app.get("/consumo-internet", isAuth, Permission, async (req, res) => {
    let consumo = await consumoCliente.buscarConsumoCliente(
      moment().format("YYYY-MM") + "-01" //primeiro dia do mês
    );
    let media = 0;
    let maior = 0;
    let pessoaMaiorConsumo = null;
    let total = consumo.rows.length;

    Consumo.limparTabela();
    //implementar ferramenta de monitorar os meses

    consumo.rows.forEach((element) => {
      if (Number(element.consumo) >= maior) {
        maior = Number(element.consumo);
        pessoaMaiorConsumo = element.nome;
      }
      media += Number(element.consumo);
      Consumo.guardarConsumo(element);
    });

    res.render("consumo-internet/index", {
      consumoClientes: consumo.rows,
      media: media / consumo.rows.length,
      maior: maior,
      pessoa: pessoaMaiorConsumo.substr(0, 18),
      total: total,
    });
  });
};
