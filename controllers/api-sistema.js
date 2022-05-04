const Usuario = require("../models/usuarios");

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
};
