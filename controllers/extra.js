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
    let queryPromocao = "";
    let promocaoRemover = req.body.comExtra;
    let queryPromocaoRemover = "";

    if (typeof promocao != "object" && typeof promocao != "undefined") {
      promocao = [promocao];
    } else if (typeof promocao == "undefined") {
      promocao = "";
    }

    if (
      typeof promocaoRemover != "object" &&
      typeof promocaoRemover != "undefined"
    ) {
      promocaoRemover = [promocaoRemover];
    } else if (typeof promocaoRemover == "undefined") {
      promocaoRemover = "";
    }

    if (promocao != "") {
      promocao.forEach((element, index) => {
        if (index + 1 == promocao.length) {
          queryPromocao += ` (au.name = '${element}' and au.username NOT LIKE '%del%' ) `;
        } else if (index + 1 == 1) {
          queryPromocao += ` AND (au.name = '${element}' and au.username NOT LIKE '%del%' ) OR `;
        } else {
          queryPromocao += ` (au.name = '${element}' and au.username NOT LIKE '%del%' ) OR `;
        }
      });
    } else {
      queryPromocao = "";
    }

    let funcionarios = await Extra.buscarFuncionarioNome(queryPromocao);

    funcionarios.rows.forEach((element) => {
      Extra.cadastrarFuncionariosExtra({
        id_usuario: element.id,
        nome_usuario: element.name,
        extra: "sim",
      });
    });

    promocaoRemover.forEach((element, index) => {
      if (index + 1 < promocaoRemover.length) {
        queryPromocaoRemover += ` ( nome_usuario = '${element}' ) OR `;
      } else {
        queryPromocaoRemover += ` ( nome_usuario = '${element}' ) `;
      }
    });

    let funcionariosAtualizados = await Extra.atualizarExtras(
      queryPromocaoRemover
    );

    //let funcionarios = await Extra.cadastrarFuncionariosExtra();

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
