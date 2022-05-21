const isAuth = require("../middlewares/auth");
require("dotenv").config(); //carregar configurações do dotenv
const Viabilidade = require("../models/viabilidade");

module.exports = (app) => {
  app
    .route("/localizacao-cliente")
    .get(async function (req, res) {
      res.render("localizacao-cliente/index", {
        apiGoogle: process.env.API_GOOGLE_MAPS,
      });
    })
    .post(async function (req, res) {
      let viabilidade = {
        numero_cliente: req.body.fone,
        lat: req.body.latitude,
        lng: req.body.longitude,
      };
      let resposta = await Viabilidade.InserirViabilidadeCliente(viabilidade);
      res.redirect("/localizacao-cliente-redirecionamento");
    });

  app.get("/localizacao-cliente-redirecionamento", async (req, res) => {
    res.render("redirecionamento-viabilidade/index");
  });

  app
    .route("/pesquisar-viabilidade")
    .get(isAuth, async (req, res) => {
      res.render("pesquisar-viabilidade/index", {
        endereco: null,
        distancia: 200,
        apiGoogle: process.env.API_GOOGLE_MAPS,
      });
    })
    .post(async function (req, res) {});
};
