const isAuth = require("../middlewares/auth");
require("dotenv").config(); //carregar configurações do dotenv
const Viabilidade = require("../models/viabilidade");
var axios = require("axios");

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
        posicaoCtos: null,
        latlon: "",
        tipo: null,
        endereco: null,
        distancia: 200,
        mostrar: null,
        finalResultados: null,
        apiGoogle: process.env.API_GOOGLE_MAPS,
        arrayPosicaoCTOS: [],
      });
    })
    .post(async function (req, res) {
      let tipo = req.body.tipo;
      let endereco = req.body.endereco;
      let distancia = req.body.distancia;
      let mostrar = req.body.mostrar;
      let resultadoGoogleApi = null;
      let loginGeosite = null;
      let senhaGeosite = null;
      let resultadoDigicade = null;
      let apiGoogle = null;
      let latlon = null;
      let resultadosCtos = null;
      let repostaFrontCtos = [];
      let latlonCortada = null;
      let distanciaInicial = null;
      loginGeosite = process.env.GEOSITE_LOGIN;
      senhaGeosite = process.env.GEOSITE_SENHA;
      apiGoogle = process.env.API_GOOGLE_MAPS;

      if (tipo == "endereco") {
        var config = {
          method: "post",
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            endereco
          )}&key=${encodeURIComponent(apiGoogle)}`,
          headers: {},
        };

        await axios(config)
          .then(function (response) {
            resultadoGoogleApi = response.data.results[0].geometry.location;
            // console.log(resultadoGoogleApi);
          })
          .catch(function (error) {
            console.log(error);
          });

        var config = {
          method: "post",
          url: `https://telecom.digicade.com.br/geosite-telecom-api/auth/token?username=${encodeURIComponent(
            loginGeosite
          )}&password=${encodeURIComponent(senhaGeosite)}`,
          headers: {},
        };

        await axios(config)
          .then(function (response) {
            resultadoDigicade = response.data;
            // console.log(resultadoDigicade.token);
          })
          .catch(function (error) {
            console.log(error);
          });

        var config = {
          method: "get",
          url: `https://telecom.digicade.com.br/geosite-telecom-api/viabilidade/caixas?raio=${encodeURIComponent(
            distancia
          )}&endereco=${encodeURIComponent(endereco)}`,
          headers: {
            contentType: "application/json",
            authorization: `Bearer ${resultadoDigicade.token}`,
          },
        };

        await axios(config)
          .then(function (response) {
            resultadosCtos = response.data;
            //console.log(resultadosCtos);
          })
          .catch(function (error) {
            console.log(error);
          });

        if (resultadosCtos.success == "false") {
          //retornar erro
        }

        if (resultadosCtos.caixas[0].distancia) {
          distanciaInicial = resultadosCtos.caixas[0].distancia;
        } else {
          distanciaInicial = "";
        }

        console.log(distanciaInicial);

        res.render("pesquisar-viabilidade/index", {
          distanciaInicial: distanciaInicial,
          endereco: endereco,
          distancia: distancia,
          apiGoogle: process.env.API_GOOGLE_MAPS,
          latlon: JSON.stringify(resultadoGoogleApi),
          mostrar: mostrar,
          tipo: tipo,
          arrayPosicaoCTOS: JSON.stringify(resultadosCtos),
          finalResultados: resultadosCtos.caixas,
        });
      } else {
      }
    });
};
