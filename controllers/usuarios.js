const isAuth = require("../middlewares/auth");
const Permission = require("../middlewares/permission");
const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

module.exports = (app) => {
  app.get("/usuarios", isAuth, Permission, async (req, res) => {
    let usuarios = await Usuario.buscarTodosUsuarios();

    res.render("usuarios/index", {
      usuarios: usuarios,
      vazio: null,
      senhasDif: null,
      usuario: null,
    });
  });

  app.post("/usuarios", isAuth, async (req, res) => {
    let login = req.body.login;
    let email = req.body.email;
    let senha = req.body.senha;
    let confSenha = req.body.confSenha;
    let arrayInfo = [login, email, senha, confSenha];
    let senhasDif = false;
    let vazio = false;
    let usuarios = await Usuario.buscarTodosUsuarios();

    arrayInfo.forEach((element) => {
      if (element == "" || element == null) {
        vazio = true;
      }
    });

    if (senha != confSenha) {
      senhasDif = true;
    }

    if (vazio == true || senhasDif == true) {
      res.render("usuarios/index", {
        usuarios: usuarios,
        vazio: vazio,
        senhasDif: senhasDif,
        usuario: false,
      });
    } else {
      let result = await Usuario.cadastrarUsuario({
        login: login,
        email: email,
        senha: senha,
      });

      let usuarios = await Usuario.buscarTodosUsuarios();

      res.render("usuarios/index", {
        usuarios: usuarios,
        vazio: vazio,
        senhasDif: senhasDif,
        usuario: true,
      });
    }
  });

  app.get("/usuarios-excluir/:id", isAuth, async (req, res) => {
    let idUsuario = req.params.id;

    if (req.session.id_usuario != idUsuario) {
      let usuarios = await Usuario.excluirUsuario(idUsuario);

      let resposta = await Permissoes.removerUsuarioPermissoes(idUsuario);
    } else {
      //enviar mensagem de erro
    }

    res.redirect("/usuarios");
  });
};
