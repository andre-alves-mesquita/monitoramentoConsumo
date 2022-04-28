const isAuth = require("../middlewares/auth");

const Usuario = require("../models/usuarios");

module.exports = (app) => {
  app.get("/usuarios", isAuth, async (req, res) => {
    res.render("usuarios/index", {
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
        vazio: vazio,
        senhasDif: senhasDif,
        usuario: false,
      });
    } else {
      //inserir no banco dar resposta na tela
      res.render("usuarios/index", {
        vazio: vazio,
        senhasDif: senhasDif,
        usuario: true,
      });
    }
  });
};