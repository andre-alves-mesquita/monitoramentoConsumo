const Consumo = require("../models/consumoInternetClienteMysql");
const Usuario = require("../models/usuarios");

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
        //funcoes.inserirUsuarioLogado(login);

        /*
        let usuarioLogado = await Logados.pesquisarLogadoNome(login[0].nome);

        if (!usuarioLogado.length) {
          
          Logados.inserirUsuarioLogado({
            atendente: usuarioLogando.nome,
            status: "logado",
            id_atendente: usuarioLogando.id,
          });
          
        } else {
          // Logados.mudarStatus({ status: "logado" }, usuarioLogado[0].atendente);
        }
        */

        res.redirect("/home");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });

  app.get("/home", async (req, res) => {
    res.render("index");
  });

  app.get("/logout", async (req, res) => {
    res.redirect("/");
  });
};
