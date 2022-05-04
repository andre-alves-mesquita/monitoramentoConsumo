const isAuth = require("../middlewares/auth");
const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

module.exports = (app) => {
  app.get("/permicoes", isAuth, async (req, res) => {
    let usuarios = await Usuario.buscarTodosUsuarios();
    let permissoes = await Permissoes.buscarTodasPermissoes();
    let usuario_permissoes = await Permissoes.buscarTodasPermissoesUsuarios();

    usuarios.forEach((usuario) => {
      usuario.permissoes = [];
      usuario_permissoes.forEach((permissao) => {
        if (permissao.id_usuario == usuario.id) {
          permissoes.forEach((element) => {
            if (permissao.id_permissao == element.id) {
              usuario.permissoes.push(element.permissao);
            }
          });
        }
      });
    });

    res.render("permicoes/index", {
      usuarios: usuarios,
      permissoes: permissoes,
    });
  });

  app.post("/permicoes-cadastrar", isAuth, async (req, res) => {
    let permissao = req.body.permissao;
    let resposta = await Permissoes.InserirPermissao({ permissao: permissao });
    let usuarios = await Usuario.buscarTodosUsuarios();
    let permissoes = await Permissoes.buscarTodasPermissoes();

    res.redirect("/permicoes");
  });

  app.post("/permicoes-adicionar-permissao", isAuth, async (req, res) => {
    let usuarios = await Usuario.buscarTodosUsuarios();
    let permissoes = await Permissoes.buscarTodasPermissoes();
    let id_usuario = req.body.funcionario;
    let id_permissao = req.body.permissao;

    let resposta = await Permissoes.inserirPermissaoFuncionario({
      id_usuario: id_usuario,
      id_permissao: id_permissao,
    });

    res.redirect("/permicoes");
  });
};
