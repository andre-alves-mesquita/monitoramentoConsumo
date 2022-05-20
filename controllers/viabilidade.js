const isAuth = require("../middlewares/auth");

module.exports = (app) => {
  app.get("/localizacao-cliente", async (req, res) => {
    res.render("localizacao-cliente/index", {
      apiGoogle: "AIzaSyBzsQMN3v-9sFoq_eVhfPIGhn9ENR35iCg",
    });
  });

  app.get("/pesquisar-ctos", isAuth, async (req, res) => {
    res.render("");
  });
};
