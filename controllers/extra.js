const isAuth = require("../middlewares/auth");
const Extra = require("../models/extra");

module.exports = (app) => {
  app.get("/extra", isAuth, async (req, res) => {
    let funcionarios = await Extra.buscarTodosFuncionarios(); //buscar todos funcionarios sgp
    let extras = await Extra.buscarTodosExtras(); // busca todos os extras da tabela de promocao
    let listaNome = [];
    let listaDeExtras = [];

    extras.forEach((element) => {
      if (
        !listaDeExtras.includes(element.nome_usuario) &&
        element.extra == "sim"
      ) {
        listaDeExtras.push(element.nome_usuario);
      }

      if (element.extra == "nao" && !listaNome.includes(element.nome_usuario)) {
        listaNome.push(element.nome_usuario);
      }
    });

    funcionarios.rows.forEach((element) => {
      if (
        !listaDeExtras.includes(element.name) &&
        !listaNome.includes(element.name)
      ) {
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
    let listaDeExtras = [];

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
        if (index + 1 == promocao.length && promocao.length > 1) {
          queryPromocao += `  au.name = '${element}' and au.username NOT LIKE '%del%'  `;
        } else if (index + 1 == 1) {
          if (index + 1 == promocao.length) {
            queryPromocao += ` AND  au.name = '${element}' and au.username NOT LIKE '%del%'`;
          } else {
            queryPromocao += ` AND  au.name = '${element}' and au.username NOT LIKE '%del%'  OR `;
          }
        } else {
          queryPromocao += `  au.name = '${element}' and au.username NOT LIKE '%del%'  OR `;
        }
      });
    } else {
      queryPromocao = "";
    }

    let funcionarios = await Extra.buscarFuncionarioNome(queryPromocao);

    let extras = await Extra.buscarTodosExtras();

    extras.forEach((element) => {
      listaDeExtras.push(element.nome_usuario);
    });

    if (!queryPromocao == "") {
      funcionarios.rows.forEach((element) => {
        if (listaDeExtras.includes(element.name)) {
          console.log("entrou aqui att");
          Extra.removerFuncionariosExtra({ extra: "sim" }, element.id);
        } else {
          console.log("entrou aqui inserir");
          Extra.cadastrarFuncionariosExtra({
            id_usuario: element.id,
            nome_usuario: element.name,
            extra: "sim",
          });
        }
      });
    }

    if (promocaoRemover != "") {
      promocaoRemover.forEach((element, index) => {
        if (index + 1 == promocaoRemover.length && promocaoRemover.length > 1) {
          queryPromocaoRemover += `   nome_usuario = '${element}'   `;
        } else if (index + 1 == 1) {
          if (index + 1 == promocaoRemover.length) {
            queryPromocaoRemover += `    nome_usuario = '${element}'  `;
          } else {
            queryPromocaoRemover += `   nome_usuario = '${element}'  OR `;
          }
        } else {
          queryPromocaoRemover += ` nome_usuario = '${element}'  OR `;
        }
      });
    } else {
      queryPromocaoRemover = "";
    }

    if (!queryPromocaoRemover == "") {
      let funcionariosAtualizados = await Extra.atualizarExtras(
        queryPromocaoRemover
      );
    }

    res.redirect("/extra");
  });
};
