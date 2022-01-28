const Consumo = require("../models/consumoInternetClienteMysql");
const Usuario = require("../models/usuarios");
const isAuth = require("../middlewares/auth");
require("dotenv").config(); //carregar configurações do dotenv

module.exports = (app) => {
  app.get("/", async (req, res) => {
    res.render("login");
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
        res.redirect("/home");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });

  app.get("/home", isAuth, async (req, res) => {
    res.render("index");
  });

  app.get("/logout", async (req, res) => {
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
};
