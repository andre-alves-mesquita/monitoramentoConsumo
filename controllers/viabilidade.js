const isAuth = require("../middlewares/auth");
const Viabilidade = require("../models/viabilidade");
const moment = require("moment"); // require
const LinkValidacao = require("../models/linkValidacao");
var axios = require("axios");
require("dotenv").config(); //carregar configurações do dotenv

module.exports = (app) => {
  app
    .route("/localizacao-cliente")
    .get(async function (req, res) {
      res.render("localizacao-cliente/index", {
        apiGoogle: process.env.API_GOOGLE_MAPS,
      });
    })
    .post(async function (req, res) {
      let fone = req.body.fone;
      let foneCortado = fone.replaceAll("-", "");
      let lat = req.body.latitude;
      let lng = req.body.longitude;
      let horaAtual = moment().format("YYYY-MM-DD HH:mm:ss");
      let linkFone = await LinkValidacao.buscarLinkValidacoesTelefone(
        foneCortado
      );
      let erro = [];

      if (linkFone[0]) {
        linkFone.forEach((element) => {
          element.data_envio = moment(element.data_envio).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          element.data_validade = moment(element.data_validade).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
      } else {
        erro.push("Nenhum link de viabilidade cadastrado para esse número.");
      }

      let dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");

      if (lat === "" || lng === "") {
        erro.push("Localização está desativada.");
      }

      linkFone.forEach((element) => {
        if (element.data_validade < dataAtual) {
          erro.push("link Expirou.");
        }
      });

      let viabilidade = {
        numero_cliente: foneCortado,
        lat: req.body.latitude,
        lng: req.body.longitude,
        data_envio: linkFone[0].data_envio,
        responsavel: linkFone[0].responsavel,
      };

      // erros
      // 2 - ja possui cadastro no nosso banco de dados

      if (erro[0]) {
        res.render("localizacao-cliente/index", {
          apiGoogle: process.env.API_GOOGLE_MAPS,
          erro: erro,
        });
      }

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
        erro: null,
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
    .post(isAuth, async function (req, res) {
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
      let erro = [];
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
            erro.push("Endereço Inválido: " + error.message + " ");
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
            erro.push("Token Inválido: " + error.message + " ");
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
            erro.push("Distância/Token Inválido: " + error.message + " ");
          });

        if (resultadosCtos) {
          var caixas = resultadosCtos.caixas;
        } else {
          var caixas = null;
        }

        if (caixas != null) {
          distanciaInicial = resultadosCtos.caixas[0].distancia;
        } else {
          distanciaInicial = "";
        }

        res.render("pesquisar-viabilidade/index", {
          erro: erro,
          distanciaInicial: distanciaInicial,
          endereco: endereco,
          distancia: distancia,
          apiGoogle: process.env.API_GOOGLE_MAPS,
          latlon: JSON.stringify(resultadoGoogleApi),
          mostrar: mostrar,
          tipo: tipo,
          arrayPosicaoCTOS: JSON.stringify(resultadosCtos),
          finalResultados: caixas,
        });
      } else {
        let latlonArray = endereco.split(",");
        let lat = latlonArray[0];
        let lon = latlonArray[1];

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
            erro.push("Token Inválido: " + error.message + " ");
          });

        var config = {
          method: "get",
          url: `https://telecom.digicade.com.br/geosite-telecom-api/viabilidade/caixas?raio=${encodeURIComponent(
            distancia
          )}&latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(
            lon
          )}`,
          headers: {
            contentType: "application/json",
            authorization: `Bearer ${resultadoDigicade.token}`,
          },
        };

        await axios(config)
          .then(function (response) {
            resultadosCtos = response.data;
            console.log(resultadosCtos);
          })
          .catch(function (error) {
            erro.push("Token/coordenadas Inválidas: " + error.message + " ");
          });

        if (resultadosCtos) {
          var caixas = resultadosCtos.caixas;
        } else {
          var caixas = null;
        }

        if (caixas != null) {
          distanciaInicial = resultadosCtos.caixas[0].distancia;
        } else {
          distanciaInicial = "";
        }

        res.render("pesquisar-viabilidade/index", {
          erro: erro,
          distanciaInicial: distanciaInicial,
          endereco: endereco,
          distancia: distancia,
          apiGoogle: process.env.API_GOOGLE_MAPS,
          latlon: JSON.stringify(endereco),
          mostrar: mostrar,
          tipo: tipo,
          arrayPosicaoCTOS: JSON.stringify(resultadosCtos),
          finalResultados: caixas,
        });
      }
    });

  app
    .route("/enderecos-para-viabilidade")
    .get(isAuth, async function (req, res) {
      let links = await LinkValidacao.buscarTodosLinkValidacoes();

      links.forEach((element) => {
        element.data_envio = moment(element.data_envio).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        element.data_validade = moment(element.data_validade).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        element.numero_telefone = `(${element.numero_telefone.slice(
          0,
          2
        )}) ${element.numero_telefone.slice(
          2,
          7
        )} - ${element.numero_telefone.slice(7, 12)} `;
      });
      let viabilidades = await Viabilidade.pegarTodasViabilidades();

      viabilidades.forEach((element) => {
        element.numero_cliente = `(${element.numero_cliente.slice(
          0,
          2
        )}) ${element.numero_cliente.slice(
          2,
          7
        )} - ${element.numero_cliente.slice(7, 12)} `;
        element.data_envio = moment(element.data_envio).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      });

      res.render("enderecos-para-viabilidade/index", {
        links: links,
        viabilidades: viabilidades,
      });
    })
    .post(isAuth, async function (req, res) {
      let usuario = req.session.nome;
      let dataAtual = moment().format("YYYY-MM-DD HH:mm:ss");
      let dataValidacao = moment()
        .add(req.body.quantidade, req.body.periodoValidade)
        .format("YYYY-MM-DD HH:mm:ss");
      let fone = req.body.fone;
      let foneCortado = fone.replaceAll("-", "");
      let links = await LinkValidacao.buscarTodosLinkValidacoes();
      let linkAcessado = false;

      links.forEach((element) => {
        if (element.numero_telefone == foneCortado) {
          linkAcessado = true;
        }
      });

      let link = {
        responsavel: usuario,
        data_envio: dataAtual,
        data_validade: dataValidacao,
        numero_telefone: foneCortado,
        acessado: false,
      };

      let resposta = await LinkValidacao.inserirLinkValidacao(link);
      let viabilidades = await Viabilidade.pegarTodasViabilidades();

      viabilidades.forEach((element) => {
        element.numero_cliente = `(${element.numero_cliente.slice(
          0,
          2
        )}) ${element.numero_cliente.slice(
          2,
          7
        )} - ${element.numero_cliente.slice(7, 12)} `;
        element.data_envio = moment(element.data_envio).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });

      res.render("enderecos-para-viabilidade/index", {
        links: links,
        viabilidades: viabilidades,
      });
    });

  app
    .route("/localidades-viaveis")
    .get(isAuth, async function (req, res) {
      res.render("localidades-viaveis/index", {});
    })
    .post(isAuth, async function (req, res) {
      res.render("localidades-viaveis/index", {});
    });

  app
    .route("/localidades-inviaveis")
    .get(isAuth, async function (req, res) {
      res.render("localidades-inviaveis/index", {});
    })
    .post(isAuth, async function (req, res) {
      res.render("localidades-inviaveis/index", {});
    });
};
