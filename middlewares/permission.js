const Usuario = require("../models/usuarios");
const Permissoes = require("../models/permissoes");

const Permission = async (req, res, next) => {
  let usuarioLogado = req.session.id_usuario;
  let rota = req.route.path;
  let usuario = await Usuario.buscarUsuario(usuarioLogado);

  let permissoesUsuario = await Permissoes.buscarTodasPermissoesUsuariosId(
    usuario[0].id
  );

  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/404");
  }
};

module.exports = Permission;
