const Instalacoes = require("../models/instalacoes");

module.exports = (app) => {
  app.get("/premiacao", async (req, res) => {
    let instalacoes = await Instalacoes.pegarInstalacoes();

    console.log(instalacoes);

    res.render("premiacao/premiacao", { instalacoes: instalacoes.rows });
  });
};
