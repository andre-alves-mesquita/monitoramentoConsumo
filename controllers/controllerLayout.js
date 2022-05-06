const Consumo = require("../models/consumoInternetClienteMysql");
const Usuario = require("../models/usuarios");
const Sessao = require("../models/sessao");
const isAuth = require("../middlewares/auth");
const moment = require("moment"); // require
require("dotenv").config(); //carregar configurações do dotenv

module.exports = (app) => {
  app.get("/", async (req, res) => {
    res.render("login/login");
  });

  app.post("/", async (req, res) => {
    let login = req.body.login;
    let senha = req.body.senha;

    let usuarioLogado = await Usuario.pegarUsuario(login, senha);

    if (login.length && senha.length) {
      if (!usuarioLogado.length) {
        res.redirect("/?erro=" + "nao foi possivel altenticar");
      } else {
        req.session.isAuth = true;

        let usuarioLogando = usuarioLogado[0];

        console.log(usuarioLogando);

        req.session.id_usuario = usuarioLogando.id;
        req.session.nome = usuarioLogando.login;
        req.session.usuario = usuarioLogando.usuario;

        Sessao.deletarUsuarioLogado(usuarioLogando.id);

        Sessao.InserirUsuarioLogado({
          id_usuario: usuarioLogando.id,
          nome_usuario: usuarioLogando.login,
          data_login: moment().format("YYYY-MM-DD"),
        });

        res.redirect("/home");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });

  app.get("/logout", async (req, res) => {
    Sessao.deletarUsuarioLogado(req.session.id_usuario);
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

  app.get("/primeiro-usuario", async (req, res) => {
    let usuarioCadastrado = [];
    usuarioCadastrado = await Usuario.verificarExisteUsuario();

    let login = {
      login: req.query.login,
      email: req.query.email,
      senha: req.query.senha,
    };

    if (!usuarioCadastrado.length) {
      await Usuario.cadastrarUsuario(login);
      res.send("Usuário cadastrado com sucesso");
    } else {
      res.send("Já existe um usuário cadastrado");
    }
  });

  app.get("/terms", isAuth, async (req, res) => {
    res.render("terms");
  });

  app.get("/pegar-usuario", async (req, res) => {
    let nome = await Sessao.pegarUsuarioLogado(req.session.id_usuario);

    res.status(200).json(nome);
  });

  app.get("/home", isAuth, async (req, res) => {
    res.render("home/index");
  });
};
