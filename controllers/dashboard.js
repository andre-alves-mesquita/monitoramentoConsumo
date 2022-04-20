const isAuth = require("../middlewares/auth");
const moment = require("moment"); // require
const Extra = require("../models/extra");

module.exports = (app) => {
  app.get("/dashboard", isAuth, async (req, res) => {
    res.render("teste");
  });

  app.get("/dashboard-funcionario", isAuth, async (req, res) => {
    let funcionarios = await Extra.buscarTodosFuncionarios(); //buscar todos funcionarios sgp

    res.render("dashboard-funcionario/index", {
      funcionarios: funcionarios.rows,
    });
  });

  app.post("/dashboard-funcionario", isAuth, async (req, res) => {
    let funcionarios = await Extra.buscarTodosFuncionarios(); //buscar todos funcionarios sgp

    res.render("dashboard-funcionario/index", {
      funcionarios: funcionarios.rows,
    });
  });

  app.get("/dashboard-valor-mes", isAuth, async (req, res) => {
    res.render("teste");
  });

  app.get("/dashboard-instalacoes", isAuth, async (req, res) => {
    res.render("teste");
  });
};
