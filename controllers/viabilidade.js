const isAuth = require("../middlewares/auth");
require("dotenv").config(); //carregar configurações do dotenv

module.exports = (app) => {
  app.get("/localizacao-cliente", async (req, res) => {
    res.render("localizacao-cliente/index", {
      apiGoogle:  process.env.API_GOOGLE_MAPS,
    });
  });

  app.get("/pesquisar-ctos", isAuth, async (req, res) => {
    res.render("");
  });
};
