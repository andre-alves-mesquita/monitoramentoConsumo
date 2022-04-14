const isAuth = require("../middlewares/auth");
const Extra = require("../models/extra");

module.exports = (app) => {
  app.get("/extra", isAuth, async (req, res) => {
    let funcionarios = await Extra.buscarTodosFuncionarios();
    let extras = await Extra.buscarTodosExtras();
    let listaNome = [];
    let listaDeExtras = [];

    extras.forEach((element) => {
      if (!listaDeExtras.includes(element.nome_usuario)) {
        listaDeExtras.push(element.nome_usuario);
      }
    });

    funcionarios.rows.forEach((element) => {
      if (!listaDeExtras.includes(element.name)) {
        listaNome.push(element.name);
      }
    });

    res.render("extra/index", {
      funcionarios: listaNome,
      extras: listaDeExtras,
    });
  });

  app.post("/extra", isAuth, async (req, res) => {
    let promocao = req.body.semExtra;
    let promocao = req.body.comExtra;

    let funcionarios = await Extra.cadastrarFuncionariosExtra();

    /*
    let extras = await Extra.buscarTodosExtras();
    let listaNome = [];
    let listaDeExtras = [];

    
    extras.forEach((element) => {
      if (!listaDeExtras.includes(element.nome_usuario)) {
        listaDeExtras.push(element.nome_usuario);
      }
    });

    funcionarios.rows.forEach((element) => {
      if (!listaDeExtras.includes(element.name)) {
        listaNome.push(element.name);
      }
    });
    */

    res.redirect("/extra");
  });
};
