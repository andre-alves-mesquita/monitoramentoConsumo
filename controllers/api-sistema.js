const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

module.exports = (app) => {
  app.post("/atualizar-perfil", async (req, res) => {
    let usuario = {
      id: req.body.id,
      login: req.body.login,
      email: req.body.email,
      senha: req.body.senha,
    };
    //let usuarioId = await Usuario.buscarUsuarioLogin(req.body.login);

    let resposta = await Usuario.atualizarUsuario(usuario, req.body.id);

    res.status(200).json(resposta);
  });

  app.post("/buscar-permissoes", async (req, res) => {
    let id = req.body.id;
    let permissoesUsuario = [];

    let permissoesId = await Permissoes.buscarTodasPermissoesUsuariosId(id);
    let permissoes = await Permissoes.buscarTodasPermissoes();

    permissoesId.forEach((perId) => {
      permissoes.forEach((element) => {
        if (perId.id_permissao == element.id) {
          permissoesUsuario.push({
            id: perId.id_permissao,
            permissao: element.permissao,
          });
        }
      });
    });

    res.status(200).json(permissoesUsuario);
  });

  app.post("/pegar-usuario-id", async (req, res) => {
    let idUsuario = req.body.id;
    let usuario = await Usuario.buscarUsuario(idUsuario);
    res.status(200).json(usuario);
  });

  app.get("/404", async (req, res) => {
    res.render("404/index");
  });
};
